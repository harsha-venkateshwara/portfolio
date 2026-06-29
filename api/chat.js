import { SYSTEM_PROMPT } from "../lib/portfolio.js";

export const config = { runtime: "edge" };

const RATE_LIMIT = 15;
const WINDOW_MS = 60_000;
const MAX_HISTORY = 12;
const MAX_MESSAGE_CHARS = 1500;

const ipBucket = new Map();

function checkRate(ip) {
  const now = Date.now();
  const arr = (ipBucket.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= RATE_LIMIT) return false;
  arr.push(now);
  ipBucket.set(ip, arr);
  return true;
}

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json", ...extraHeaders },
  });
}

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRate(ip)) {
    return jsonResponse({ error: "Too many requests. Please slow down." }, 429, {
      "retry-after": "60",
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const raw = Array.isArray(body?.messages) ? body.messages : null;
  if (!raw || raw.length === 0) {
    return jsonResponse({ error: "Missing messages" }, 400);
  }

  const truncated = raw.slice(-MAX_HISTORY);
  const messages = truncated
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return jsonResponse({ error: "Last message must be from the user" }, 400);
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return jsonResponse(
      { error: "Server is not configured. Please reach out at harsha.venkateswara@gmail.com." },
      500
    );
  }

  const callGroq = async () =>
    fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        max_tokens: 600,
        temperature: 0.4,
      }),
    });

  let groqRes;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      groqRes = await callGroq();
      if (groqRes.ok && groqRes.body) break;
      // Retry on transient upstream errors (5xx). Don't retry on 4xx (bad request, auth).
      if (groqRes.status >= 500 && attempt === 0) {
        await new Promise((r) => setTimeout(r, 400));
        continue;
      }
      break;
    } catch {
      if (attempt === 0) {
        await new Promise((r) => setTimeout(r, 400));
        continue;
      }
    }
  }

  if (!groqRes) {
    return jsonResponse(
      { error: "Couldn't reach the model. Try again in a moment." },
      502
    );
  }

  if (!groqRes.ok || !groqRes.body) {
    let detail = "";
    try {
      detail = (await groqRes.text()).slice(0, 240);
    } catch {
      // Upstream body unreadable; report the status code only.
    }

    // Pass through rate-limit as 429 so the client shows the right message.
    if (groqRes.status === 429) {
      return jsonResponse(
        {
          error:
            "The model is rate-limited right now (Groq free tier). Try again in a few seconds.",
        },
        429,
        { "retry-after": groqRes.headers.get("retry-after") || "10" }
      );
    }

    return jsonResponse(
      {
        error: `Upstream returned ${groqRes.status}. Try again in a moment.`,
        detail,
      },
      502
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqRes.body.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              continue;
            }
            try {
              const parsed = JSON.parse(payload);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`)
                );
              }
            } catch {
              // ignore malformed chunks
            }
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
      "access-control-allow-origin": "*",
    },
  });
}
