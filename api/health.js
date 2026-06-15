export const config = { runtime: "edge" };

export default function handler() {
  const key = process.env.GROQ_API_KEY;
  return new Response(
    JSON.stringify(
      {
        hasKey: typeof key === "string" && key.length > 0,
        keyLength: key?.length || 0,
        keyPrefix: key ? key.slice(0, 4) : null,
        envKeysSeen: Object.keys(process.env).filter((k) => !k.startsWith("VERCEL_")).sort(),
      },
      null,
      2
    ),
    { headers: { "content-type": "application/json" } }
  );
}
