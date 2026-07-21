import { memo } from "react";
import { motion } from "framer-motion";
import { getSmoothStepPath, type EdgeProps } from "@xyflow/react";

import type { UniverseEdge } from "../types/graph";

function AnimatedEdgeComponent({ data, sourcePosition, sourceX, sourceY, targetPosition, targetX, targetY }: EdgeProps<UniverseEdge>) {
  const [path] = getSmoothStepPath({ borderRadius: 22, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const stroke = data?.highlighted ? "#7c3aed" : "#6366f1";

  return <><motion.path animate={{ opacity: data?.highlighted ? 0.32 : 0.2, pathLength: 1 }} d={path} fill="none" initial={{ opacity: 0, pathLength: 0 }} stroke={stroke} strokeLinecap="round" strokeWidth={7} transition={{ duration: 0.8, ease: "easeOut" }} /><motion.path animate={{ opacity: data?.highlighted ? 0.95 : 0.7, pathLength: 1 }} d={path} fill="none" initial={{ opacity: 0, pathLength: 0 }} stroke={stroke} strokeLinecap="round" strokeWidth={data?.highlighted ? 2.5 : 1.8} transition={{ duration: 0.8, ease: "easeOut" }} /><motion.circle animate={{ offsetDistance: ["0%", "100%"] }} fill="#a78bfa" r="3.5" style={{ filter: "drop-shadow(0 0 5px #8b5cf6)", offsetPath: `path('${path}')` }} transition={{ duration: 4.5, ease: "linear", repeat: Infinity }} /></>;
}

export const AnimatedEdge = memo(AnimatedEdgeComponent);
