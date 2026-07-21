import { motion } from "framer-motion";

import type { ThinkingNodeData } from "../types/thinking";

type ThinkingNodeProps = { node: ThinkingNodeData };

export function ThinkingNode({ node }: ThinkingNodeProps) {
  const radius = node.size ?? 3;

  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      <motion.circle
        animate={{ opacity: [0.08, 0.45, 0.08], scale: [1, 2.8, 1] }}
        className="fill-violet-400"
        cx="0"
        cy="0"
        initial={{ opacity: 0, scale: 0 }}
        r={radius * 2.5}
        transition={{ delay: node.delay, duration: 3.6, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.circle
        animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.12, 0.9] }}
        className="fill-violet-300"
        cx="0"
        cy="0"
        initial={{ opacity: 0, scale: 0 }}
        r={radius}
        transition={{ delay: node.delay, duration: 3.6, ease: "easeInOut", repeat: Infinity }}
      />
    </g>
  );
}
