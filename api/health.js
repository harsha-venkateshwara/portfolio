export const config = { runtime: "edge" };

export default function handler() {
  const key = process.env.GROQ_API_KEY;
  // Intentionally minimal: report only whether the chatbot is configured.
  // Never expose key material, key length, or the environment variable list.
  return new Response(
    JSON.stringify({ ok: true, configured: typeof key === "string" && key.length > 0 }),
    { headers: { "content-type": "application/json" } }
  );
}
