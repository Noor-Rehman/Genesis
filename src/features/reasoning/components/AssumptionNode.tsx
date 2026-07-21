import { memo } from "react";
import { Equal } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";

import type { UniverseNode } from "../types/graph";

function AssumptionNodeComponent({ data, selected }: NodeProps<UniverseNode>) {
  return <div className={`min-w-28 rounded-lg border border-amber-300/35 bg-amber-400/10 px-3 py-2 text-amber-100 shadow-lg shadow-black/15 transition hover:border-amber-300/70 ${selected ? "ring-2 ring-amber-200/40" : ""}`}><Handle className="!border-0 !bg-transparent" position={Position.Top} type="target" /><div className="flex items-center gap-1.5"><Equal aria-hidden="true" className="size-3" /><span className="text-xs font-medium">{data.title}</span></div><Handle className="!border-0 !bg-transparent" position={Position.Bottom} type="source" /></div>;
}

export const AssumptionNode = memo(AssumptionNodeComponent) as unknown as ComponentType<NodeProps>;
