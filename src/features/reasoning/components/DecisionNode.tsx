import { memo } from "react";
import { Sparkles } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";

import type { UniverseNode } from "../types/graph";

function DecisionNodeComponent({ data }: NodeProps<UniverseNode>) {
  return <div className="w-64 rounded-2xl border border-violet-300/60 bg-violet-600 px-5 py-4 text-center text-white shadow-2xl shadow-violet-950/70"><Handle className="!border-0 !bg-transparent" position={Position.Top} type="target" /><div className="flex items-center justify-center gap-2"><Sparkles aria-hidden="true" className="size-4" /><span className="text-xs font-semibold tracking-[0.16em] uppercase">Your Decision</span></div><p className="mt-2 text-sm font-medium leading-5">{data.title}</p><Handle className="!border-0 !bg-transparent" position={Position.Bottom} type="source" /></div>;
}

export const DecisionNode = memo(DecisionNodeComponent) as unknown as ComponentType<NodeProps>;
