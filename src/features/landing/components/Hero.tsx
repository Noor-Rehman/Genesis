import { motion } from "framer-motion";

import {
  entranceOffset,
  entranceTransition,
  LANDING,
} from "../constants/landing";

const heroAnimation = {
  hidden: { opacity: 0, y: entranceOffset },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <motion.header
      animate="visible"
      className="landing-hero space-y-4 text-center"
      initial="hidden"
      transition={entranceTransition}
      variants={heroAnimation}
    >
      <div className="space-y-4">
        <h1
          className="text-balance font-sans text-5xl font-medium tracking-[-0.06em] text-white sm:text-6xl"
          id="landing-title"
        >
          Make the next move <span className="text-sky-200">visible.</span>
        </h1>
        <p className="text-balance font-sans text-lg font-medium tracking-[-0.03em] text-sky-200 sm:text-xl">
          {LANDING.subtitle}
        </p>
        <p className="mx-auto max-w-md text-pretty text-base leading-7 text-slate-400">
          Explore possibilities instead of receiving answers.
        </p>
      </div>
    </motion.header>
  );
}
