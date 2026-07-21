import { Pause, Play } from "lucide-react";

import { THOUGHT_PLAYBACK } from "../constants/graph";
import { useReasoningStore } from "@/store/reasoning-store";

export function TimelinePanel() {
  const playbackStep = useReasoningStore((state) => state.playbackStep);
  const isPlaying = useReasoningStore((state) => state.isPlaying);
  const setPlaybackStep = useReasoningStore((state) => state.setPlaybackStep);
  const setIsPlaying = useReasoningStore((state) => state.setIsPlaying);

  const currentScene = THOUGHT_PLAYBACK[playbackStep] ?? THOUGHT_PLAYBACK[0];

  return (
    <aside className="rounded-2xl border border-indigo-100 bg-white/85 px-4 py-4 shadow-xl shadow-indigo-950/5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] text-indigo-500 uppercase">Thought playback</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{currentScene.label}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300" onClick={() => setIsPlaying(!isPlaying)} type="button">
          {isPlaying ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{currentScene.narration}</p>
      <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
        <span>Today</span>
        <input aria-label="Thought playback timeline" className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-indigo-100 accent-violet-600" max={THOUGHT_PLAYBACK.length - 1} min={0} onChange={(event) => { setPlaybackStep(Number(event.target.value)); setIsPlaying(false); }} type="range" value={playbackStep} />
        <span>2035</span>
      </div>
    </aside>
  );
}
