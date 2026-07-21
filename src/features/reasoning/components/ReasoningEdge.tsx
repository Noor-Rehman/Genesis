import { memo } from "react";
import { motion } from "framer-motion";
import { getBezierPath, type EdgeProps } from "@xyflow/react";

import type { ReasoningGraphEdge } from "../types/reasoning";

function ReasoningEdgeComponent({
  data,
  sourcePosition,
  sourceX,
  sourceY,
  targetPosition,
  targetX,
  targetY,
}: EdgeProps<ReasoningGraphEdge>) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const isHighlighted = data?.highlighted;

  return (
    <motion.path
      animate={{ opacity: isHighlighted ? 0.9 : 0.45, pathLength: 1 }}
      d={edgePath}
      fill="none"
      initial={{ opacity: 0, pathLength: 0 }}
      stroke={isHighlighted ? "rgb(228 228 231)" : "rgb(82 82 91)"}
      strokeWidth={isHighlighted ? 1.5 : 1}
      transition={{ duration: 0.7, ease: "easeOut" }}
    />
  );
}

export const ReasoningEdge = memo(ReasoningEdgeComponent);
