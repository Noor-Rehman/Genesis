import { motion } from "framer-motion";
import { X } from "lucide-react";

import { reasoningCopy } from "../constants/reasoning";
import type { ReasoningGraphNode } from "../types/reasoning";

type NodeInspectorProps = {
  node: ReasoningGraphNode | null;
  relatedTitles: string[];
  onClose: () => void;
};

export function NodeInspector({ node, relatedTitles, onClose }: NodeInspectorProps) {
  if (!node) {
    return null;
  }

  return (
    <motion.aside
      animate={{ opacity: 1, x: 0 }}
      aria-labelledby="node-inspector-title"
      className="absolute inset-y-4 right-4 z-20 flex w-80 flex-col rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:right-6"
      initial={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">{reasoningCopy.inspectorTitle}</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]" id="node-inspector-title">{node.data.title}</h2>
        </div>
        <button aria-label="Close inspector" className="rounded-md p-1 text-zinc-400 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-zinc-400" onClick={onClose} type="button">
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <p className="mt-6 text-sm leading-6 text-zinc-400">{node.data.description}</p>
      <div className="mt-6 border-y border-white/10 py-4">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{reasoningCopy.confidence}</p>
        <p className="mt-1 text-2xl font-semibold">{node.data.confidence}%</p>
      </div>
      <div className="mt-6">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{reasoningCopy.relatedNodes}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {relatedTitles.map((title) => <li className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300" key={title}>{title}</li>)}
        </ul>
      </div>
    </motion.aside>
  );
}
