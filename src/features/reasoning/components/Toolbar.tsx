import { Download, RotateCcw, SlidersHorizontal, Split } from "lucide-react";

type ToolbarProps = { onReset: () => void; onChallenge: () => void };

const controls = [
  { label: "Compare Futures", icon: Split },
  { label: "Edit Assumptions", icon: SlidersHorizontal },
  { label: "Export", icon: Download },
] as const;

export function Toolbar({ onReset, onChallenge }: ToolbarProps) {
  return (
    <div aria-label="Universe controls" className="pointer-events-auto absolute bottom-5 left-1/2 z-10 flex max-w-[calc(100%-3rem)] -translate-x-1/2 flex-wrap justify-center gap-2" role="toolbar">
      {controls.map(({ icon: Icon, label }) => (
        <button className="flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-slate-950/75 px-3.5 py-2.5 text-sm font-semibold text-cyan-50 shadow-lg shadow-cyan-950/25 backdrop-blur transition hover:border-cyan-300/60 hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-400" key={label} type="button">
          <Icon aria-hidden="true" className="size-3.5" />
          <span>{label}</span>
        </button>
      ))}
      <button className="flex items-center gap-2 rounded-lg border border-cyan-200/60 bg-cyan-500/80 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 backdrop-blur transition hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300" onClick={onChallenge} type="button">
        <Split aria-hidden="true" className="size-3.5" />
        <span>Challenge My Thinking</span>
      </button>
      <button className="flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-slate-950/75 px-3.5 py-2.5 text-sm font-semibold text-cyan-50 shadow-lg shadow-cyan-950/25 backdrop-blur transition hover:border-cyan-300/60 hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-400" onClick={onReset} type="button">
        <RotateCcw aria-hidden="true" className="size-3.5" />
        <span>Reset Universe</span>
      </button>
    </div>
  );
}
