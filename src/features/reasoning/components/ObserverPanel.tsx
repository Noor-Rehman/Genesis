import { BrainCircuit, ChevronRight } from "lucide-react";

import { GRAPH_NODES, THOUGHT_PLAYBACK, UNIVERSE_COPY } from "../constants/graph";
import { TimelinePanel } from "./TimelinePanel";
import { useReasoningStore, type ScenarioBias } from "@/store/reasoning-store";

export function ObserverPanel() {
  const observerState = useReasoningStore((state) => state.observerState);
  const observerNarration = useReasoningStore((state) => state.observerNarration);
  const playbackStep = useReasoningStore((state) => state.playbackStep);
  const selectedNodeId = useReasoningStore((state) => state.selectedNode);
  const nodes = useReasoningStore((state) => state.nodes);
  const challengePrompt = useReasoningStore((state) => state.challengePrompt);
  const blindSpots = useReasoningStore((state) => state.blindSpots);
  const setChallengePrompt = useReasoningStore((state) => state.setChallengePrompt);
  const setScenarioBias = useReasoningStore((state) => state.setScenarioBias);
  const setIsPlaying = useReasoningStore((state) => state.setIsPlaying);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;
  const status = observerState === "thinking" ? "Thinking..." : observerState === "analyzing" ? "Analyzing Career..." : observerState === "comparing" ? "Comparing Futures..." : "Universe Ready";
  const strongestFuture = selectedNode?.data.title ?? "Industry";
  const confidence = selectedNode?.data.confidence ?? 76;
  const uncertainty = selectedNode?.data.counterargument ?? "How much international experience matters to you.";
  const challengeQuestion = challengePrompt || (selectedNode?.id === "visa" ? "What if getting a visa wasn't a concern?" : selectedNode?.id === "salary" ? "What if salary mattered less than learning?" : "Which assumption should we test?");
  const decisionNode = GRAPH_NODES.find((node) => node.id === "decision");
  const scene = THOUGHT_PLAYBACK[Math.min(playbackStep, THOUGHT_PLAYBACK.length - 1)];
  const blindSpotNote = blindSpots.length > 0 ? `Missing dimensions: ${blindSpots.map((spot) => spot.replace("ghost-", "")).join(", ")}` : "No obvious blind spots yet.";

  const chooseScenario = (bias: ScenarioBias) => {
    setScenarioBias(bias);
    setIsPlaying(false);
  };

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-indigo-500 uppercase">Decision</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-950">{decisionNode?.title ?? "Your decision"}</h2>
      </div>

      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/65 p-4">
        <div className="flex items-center gap-2 text-indigo-700">
          <BrainCircuit aria-hidden="true" className="size-4" />
          <h3 className="text-base font-semibold">{UNIVERSE_COPY.observer}</h3>
        </div>
        <p className="mt-2 text-sm font-semibold text-violet-700">{status}</p>
        <p className="mt-2 text-base leading-7 text-slate-700">{observerNarration}</p>
        <p className="mt-3 text-sm leading-6 text-slate-500">{scene.narration}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <p><span className="text-slate-500">Strongest:</span> {strongestFuture}</p>
          <p><span className="text-slate-500">Confidence:</span> {confidence}%</p>
          <p><span className="text-slate-500">Uncertainty:</span> {uncertainty}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-lg border border-indigo-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300" onClick={() => chooseScenario(selectedNode?.id === "visa" ? "visa" : selectedNode?.id === "salary" ? "salary" : selectedNode?.id === "startup" ? "funding" : selectedNode?.id === "research" ? "research" : "balanced")} type="button">Compare</button>
        <button className="rounded-lg border border-indigo-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300" onClick={() => setChallengePrompt(challengeQuestion)} type="button">Challenge</button>
        <details className="group relative">
          <summary className="list-none cursor-pointer rounded-lg border border-indigo-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300">More</summary>
          <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-44 rounded-xl border border-indigo-100 bg-white p-2 shadow-2xl shadow-indigo-950/10">
            <button className="w-full rounded-lg px-2 py-2 text-left text-sm text-slate-600 hover:bg-indigo-50" onClick={() => { setChallengePrompt(""); setScenarioBias("balanced"); }} type="button">Reset bias</button>
          </div>
        </details>
      </div>

      <div className="mt-5">
        <TimelinePanel />
      </div>

      <div className="mt-5 rounded-2xl border border-indigo-100 bg-white p-4 text-sm leading-6 text-slate-700">
        <div className="flex items-center gap-2 text-indigo-700">
          <ChevronRight aria-hidden="true" className="size-3" />
          <span>{UNIVERSE_COPY.nextQuestion}</span>
        </div>
        <p className="mt-2 text-slate-700">{challengePrompt || observerNarration}</p>
        <p className="mt-3 text-slate-500">{blindSpotNote}</p>
        <p className="mt-3 text-slate-400">Playback step {playbackStep + 1} / 5</p>
      </div>
    </section>
  );
}
