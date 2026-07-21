import { memo } from "react";
import { BriefcaseBusiness, Lightbulb, TriangleAlert } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";

import type { UniverseNode } from "../types/graph";

const styles = {
  future: { icon: BriefcaseBusiness, className: "border-blue-300/30 bg-blue-400/10 text-blue-100 hover:border-blue-300/70" },
  risk: { icon: TriangleAlert, className: "border-rose-300/30 bg-rose-400/10 text-rose-100 hover:border-rose-300/70" },
  opportunity: { icon: Lightbulb, className: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100 hover:border-emerald-300/70" },
} as const;

function FutureNodeComponent({ data, selected }: NodeProps<UniverseNode>) {
  const style = styles[data.kind as keyof typeof styles] ?? styles.future;
  const Icon = style.icon;
  return <div className={`min-w-32 rounded-xl border px-3 py-2.5 shadow-lg shadow-black/20 transition ${style.className} ${selected ? "ring-2 ring-white/40" : ""}`}><Handle className="!border-0 !bg-transparent" position={Position.Top} type="target" /><div className="flex items-center gap-2"><Icon aria-hidden="true" className="size-3.5" /><span className="text-sm font-medium">{data.title}</span></div>{data.branch && <p className="mt-1 text-[11px] opacity-60">{data.branch}</p>}<Handle className="!border-0 !bg-transparent" position={Position.Bottom} type="source" /></div>;
}

export const FutureNode = memo(FutureNodeComponent) as unknown as ComponentType<NodeProps>;
