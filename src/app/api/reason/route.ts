import { NextResponse } from "next/server";
import { fallbackUniverse, type AiUniverse } from "@/lib/reasoning/ai";

const system = `Return ONLY valid JSON: {"decision":"string","paths":[{"id":"path-1","title":"string","label":"string","outcome":"string","detail":"string","confidence":number,"reasoning":"string","assumptions":["string","string"],"evidence":"string","tradeoff":"string","imagePrompt":"string"}]}. Generate exactly 6 distinct, concise, balanced decision paths. Confidence must be 1-99. imagePrompt describes a beautiful miniature future-world scene with no text.`;
export async function POST(request: Request) {
  const body = await request.json().catch(() => null); const decision = typeof body?.decision === "string" ? body.decision.trim().slice(0, 1200) : "";
  if (!decision) return NextResponse.json({ error: "A decision is required." }, { status: 400 });
  const fallback = fallbackUniverse(decision); const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return NextResponse.json(fallback);
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini", temperature: 0.65, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: decision }] }) });
    if (!response.ok) throw new Error("OpenRouter request failed");
    const result = JSON.parse((await response.json())?.choices?.[0]?.message?.content) as AiUniverse;
    if (!Array.isArray(result.paths) || result.paths.length !== 6) throw new Error("Invalid graph");
    return NextResponse.json({ decision, paths: result.paths.map((path, index) => ({ ...fallback.paths[index], ...path, id: `path-${index + 1}`, confidence: Math.min(99, Math.max(1, Number(path.confidence) || 50)) })) });
  } catch { return NextResponse.json(fallback); }
}
