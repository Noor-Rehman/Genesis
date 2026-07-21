"use client";

import { ArrowRightLeft, Check, X } from "lucide-react";
import type { AiPath } from "@/lib/reasoning/ai";

type CompareModeProps = {
  paths: AiPath[];
  selected: string[];
  onSelect: (id: string) => void;
  onClose: () => void;
};

export function CompareMode({ paths, selected, onSelect, onClose }: CompareModeProps) {
  const [leftId, rightId] = selected;
  const left = paths.find((path) => path.id === leftId);
  const right = paths.find((path) => path.id === rightId);

  return <aside className="compare-mode">
    <header><div><span className="compare-kicker"><ArrowRightLeft size={14} /> Compare futures</span><h2>See the tradeoffs clearly.</h2></div><button onClick={onClose} aria-label="Close comparison"><X size={17} /></button></header>
    {selected.length < 2 ? <div className="compare-empty">Choose {2 - selected.length} more future from the graph to begin an honest side-by-side comparison.</div> : <div className="compare-columns">{[left, right].map((path) => path && <article key={path.id}><p className="compare-label">{path.label}</p><h3>{path.outcome}</h3><section><label>Why this works</label><p>{path.reasoning}</p></section><section><label>Tradeoff</label><p>{path.tradeoff}</p></section><section><label>Confidence</label><strong>{path.confidence}%</strong></section><section><label>Key assumptions</label>{path.assumptions.slice(0, 2).map((assumption) => <span className="compare-assumption" key={assumption}><Check size={12}/>{assumption}</span>)}</section><button onClick={() => onSelect(path.id)}>Replace this future</button></article>)}</div>}
  </aside>;
}
