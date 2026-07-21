import { memo, type ComponentType } from "react";
import { BriefcaseBusiness, Equal, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import type { UniverseNode } from "../types/graph";

const nodeStyles = {
  decision: { Icon: Sparkles, className: "w-64 rounded-full border-4 border-cyan-200/80 bg-[radial-gradient(circle_at_50%_12%,#34d399_0%,#0891b2_25%,#071b41_55%,#020617_100%)] px-7 py-10 text-cyan-50 shadow-[0_0_0_12px_rgba(34,211,238,0.15),0_0_80px_18px_rgba(34,211,238,0.55)]", label: "Your question" },
  future: { Icon: BriefcaseBusiness, className: "flex size-36 flex-col justify-center rounded-full border border-blue-200 bg-[radial-gradient(circle_at_30%_25%,#eff6ff,#60a5fa_45%,#2563eb)] px-3 text-white shadow-[0_0_0_7px_rgba(96,165,250,0.1),0_0_22px_rgba(59,130,246,0.32)]", label: undefined },
  assumption: { Icon: Equal, className: "flex size-32 flex-col justify-center rounded-full border border-amber-200 bg-[radial-gradient(circle_at_30%_25%,#fef3c7,#fbbf24_50%,#d97706)] px-3 text-white shadow-[0_0_0_6px_rgba(245,158,11,0.1),0_0_22px_rgba(245,158,11,0.28)]", label: undefined },
  risk: { Icon: TriangleAlert, className: "flex size-32 flex-col justify-center rounded-full border border-rose-200 bg-[radial-gradient(circle_at_30%_25%,#ffe4e6,#fb7185_48%,#be123c)] px-3 text-white shadow-[0_0_0_6px_rgba(244,63,94,0.1),0_0_22px_rgba(244,63,94,0.28)]", label: undefined },
  opportunity: { Icon: Lightbulb, className: "flex size-32 flex-col justify-center rounded-full border border-emerald-200 bg-[radial-gradient(circle_at_30%_25%,#d1fae5,#34d399_48%,#047857)] px-3 text-white shadow-[0_0_0_6px_rgba(16,185,129,0.1),0_0_22px_rgba(16,185,129,0.25)]", label: undefined },
  ghost: { Icon: Lightbulb, className: "flex size-28 flex-col justify-center rounded-full border border-slate-200 bg-white/70 px-3 text-slate-500 shadow-lg shadow-indigo-100", label: undefined },
} as const;

function AnimatedNodeComponent({ data, selected }: NodeProps<UniverseNode>) {
  const style = nodeStyles[data.kind];
  const Icon = style.Icon;
  return <motion.div animate={{ opacity: data.kind === "ghost" ? 0.55 : 1, scale: 1, y: [0, -4, 0] }} className={`border text-center transition hover:brightness-105 ${style.className} ${selected ? "ring-4 ring-indigo-300/50" : ""}`} initial={{ opacity: 0, scale: 0.8, y: 6 }} transition={{ delay: data.phase * 0.08, opacity: { duration: 0.35 }, scale: { duration: 0.35, ease: "easeOut" }, y: { duration: 4, ease: "easeInOut", repeat: Infinity } }}><Handle className="!border-0 !bg-transparent" position={Position.Top} type="target" /><div className="flex items-center justify-center gap-1.5"><Icon aria-hidden="true" className="size-4" /><span className="text-base font-semibold">{data.title}</span></div><p className="mt-1 text-[11px] font-semibold leading-4 tracking-[0.04em] uppercase opacity-80">{data.confidence ?? 0}% · {data.source}</p>{style.label && <p className="mt-1 text-xs font-bold tracking-[0.1em] uppercase opacity-85">{style.label}</p>}{data.branch && <p className="mt-1 text-xs opacity-75">{data.branch}</p>}<Handle className="!border-0 !bg-transparent" position={Position.Bottom} type="source" /></motion.div>;
}

export const AnimatedNode = memo(AnimatedNodeComponent) as unknown as ComponentType<NodeProps>;
