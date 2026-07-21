import { motion } from "framer-motion";

import { thinkingParticles } from "../constants/workspace";

export function ThinkingParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {thinkingParticles.map((particle) => (
        <motion.span
          animate={{ x: [0, particle.x, 0], y: [0, particle.y, 0] }}
          className="absolute size-1 rounded-full bg-indigo-300/50"
          key={particle.id}
          style={{ left: particle.left, top: particle.top }}
          transition={{ duration: particle.duration, ease: "easeInOut", repeat: Infinity }}
        />
      ))}
    </div>
  );
}
