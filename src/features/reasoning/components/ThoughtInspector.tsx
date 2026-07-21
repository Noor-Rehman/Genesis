import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import type { UniverseNode } from "../types/graph";

type ThoughtInspectorProps = {
  node: UniverseNode;
  onClose: () => void;
  onSaveAssumption: (nodeId: string, assumption: string) => void;
  challengePrompt: string;
  onChallenge: () => void;
};

export function ThoughtInspector({ node, onClose, onSaveAssumption, challengePrompt, onChallenge }: ThoughtInspectorProps) {
  return <ThoughtInspectorContent key={node.id} node={node} onClose={onClose} onSaveAssumption={onSaveAssumption} challengePrompt={challengePrompt} onChallenge={onChallenge} />;
}

function ThoughtInspectorContent({ node, onClose, onSaveAssumption, challengePrompt, onChallenge }: ThoughtInspectorProps) {
  const [draftAssumption, setDraftAssumption] = useState(node.data.assumptions[0] ?? "");

  return (
    <motion.aside
      animate={{ opacity: 1, x: 0 }}
      className="pointer-events-auto absolute bottom-5 right-7 top-16 z-20 w-[min(22rem,calc(100%-3.5rem))] overflow-y-auto rounded-2xl border border-cyan-300/20 bg-slate-950/85 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
      initial={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">Thought playback</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{node.data.title}</h3>
        </div>
        <button aria-label="Close thought details" className="rounded-md p-1 text-slate-400 hover:bg-indigo-50 hover:text-slate-900" onClick={onClose} type="button">
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{node.data.description}</p>
      <div className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm">
        <MetaRow label="Confidence" value={`${node.data.confidence ?? 0}%`} />
        <MetaRow label="Source" value={node.data.source} />
        <MetaRow label="Evidence" value={node.data.evidence} />
        <MetaRow label="Counterargument" value={node.data.counterargument} />
      </div>
      <div className="mt-4 rounded-xl border border-violet-200 bg-violet-50/80 p-4">
        <p className="text-xs font-semibold tracking-[0.14em] text-violet-600 uppercase">Edit assumption</p>
        <textarea className="mt-3 min-h-24 w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 focus:border-violet-400" onChange={(event) => setDraftAssumption(event.target.value)} placeholder="Rewrite the assumption..." value={draftAssumption} />
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-500" onClick={() => onSaveAssumption(node.id, draftAssumption)} type="button">Apply edit</button>
          <button className="rounded-lg border border-violet-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-violet-300 hover:bg-white" onClick={onChallenge} type="button">Challenge this node</button>
        </div>
      </div>
      {challengePrompt && <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4"><p className="text-xs font-semibold tracking-[0.14em] text-indigo-500 uppercase">Conversation</p><p className="mt-2 text-sm leading-6 text-slate-700">{challengePrompt}</p></div>}
      <div className="mt-4">
        <p className="text-xs font-semibold tracking-[0.14em] text-indigo-500 uppercase">Assumptions</p>
        <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
          {node.data.assumptions.map((assumption) => (
            <li className="rounded-lg border border-indigo-100 bg-white px-3 py-2" key={assumption}>{assumption}</li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">{label}</p>
      <p className="text-sm leading-6 text-slate-200">{value}</p>
    </div>
  );
}
