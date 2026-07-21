import { memo } from "react";
import { motion } from "framer-motion";
import { CircleHelp, Compass, Eye, Lightbulb, Search, ShieldCheck } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";

import type { ReasoningGraphNode, ReasoningNodeKind } from "../types/reasoning";

const nodeIcons = {
  root: Compass,
  concept: Lightbulb,
  evidence: Search,
  future: Eye,
  assumption: ShieldCheck,
  question: CircleHelp,
} as const;

const nodeStyles: Record<ReasoningNodeKind, string> = {
  root: "border-zinc-300/60 bg-zinc-100 text-zinc-950 shadow-zinc-950/30",
  concept: "border-sky-200/20 bg-zinc-900 text-zinc-100",
  evidence: "border-emerald-200/20 bg-zinc-900 text-zinc-100",
  future: "border-violet-200/20 bg-zinc-900 text-zinc-100",
  assumption: "border-amber-200/20 bg-zinc-900 text-zinc-100",
  question: "border-rose-200/20 bg-zinc-900 text-zinc-100",
};

function ReasoningNodeComponent({ data, selected }: NodeProps<ReasoningGraphNode>) {
  const Icon = nodeIcons[data.kind];

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={`min-w-36 rounded-xl border px-3 py-2.5 shadow-xl shadow-black/20 transition-shadow ${nodeStyles[data.kind]} ${selected ? "ring-2 ring-zinc-300/60" : "hover:shadow-2xl"}`}
      initial={{ opacity: 0, scale: 0.92 }}
      transition={{ delay: data.animationDelay, duration: 0.35, ease: "easeOut" }}
    >
      <Handle className="!border-0 !bg-transparent" position={Position.Left} type="target" />
      <div className="flex items-center gap-2">
        <Icon aria-hidden="true" className="size-3.5 opacity-70" />
        <span className="text-sm font-medium tracking-[-0.01em]">{data.title}</span>
      </div>
      <Handle className="!border-0 !bg-transparent" position={Position.Right} type="source" />
    </motion.div>
  );
}

export const ReasoningNode = memo(ReasoningNodeComponent) as unknown as ComponentType<NodeProps>;
