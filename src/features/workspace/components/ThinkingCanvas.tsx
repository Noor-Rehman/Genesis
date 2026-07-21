import { motion } from "framer-motion";

import {
  canvasTransition,
  thinkingConnections,
  thinkingNodes,
} from "../constants/workspace";

const nodesById = new Map(thinkingNodes.map((node) => [node.id, node]));

export function ThinkingCanvas() {
  return (
    <div aria-hidden="true" className="w-full max-w-4xl">
      <svg className="h-auto w-full" fill="none" viewBox="0 0 850 410">
        <g stroke="currentColor" className="text-indigo-300" strokeWidth="1.5">
          {thinkingConnections.map((connection) => {
            const from = nodesById.get(connection.from);
            const to = nodesById.get(connection.to);

            if (!from || !to) {
              return null;
            }

            return (
              <motion.line
                animate={{ opacity: 1, pathLength: 1 }}
                initial={{ opacity: 0, pathLength: 0 }}
                key={`${connection.from}-${connection.to}`}
                transition={{ ...canvasTransition, delay: connection.delay }}
                x1={from.x}
                x2={to.x}
                y1={from.y}
                y2={to.y}
              />
            );
          })}
        </g>
        <g>
          {thinkingNodes.map((node) => (
            <motion.circle
              animate={{ opacity: 1, scale: 1 }}
              className="fill-violet-500"
              cx={node.x}
              cy={node.y}
              initial={{ opacity: 0, scale: 0.5 }}
              key={node.id}
              r="3"
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              transition={{ ...canvasTransition, delay: node.delay }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
