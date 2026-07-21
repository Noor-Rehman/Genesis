import { motion } from "framer-motion";

import type { ThinkingConnectionData, ThinkingNodeData } from "../types/thinking";

type ThinkingConnectionProps = {
  connection: ThinkingConnectionData;
  from: ThinkingNodeData;
  to: ThinkingNodeData;
};

export function ThinkingConnection({ connection, from, to }: ThinkingConnectionProps) {
  return (
    <motion.line
      animate={{ opacity: [0.12, 0.42, 0.12], pathLength: 1 }}
      initial={{ opacity: 0, pathLength: 0 }}
      stroke="currentColor"
      strokeWidth="1"
      transition={{ delay: connection.delay, duration: 3.6, ease: "easeInOut", repeat: Infinity }}
      x1={from.x}
      x2={to.x}
      y1={from.y}
      y2={to.y}
    />
  );
}
