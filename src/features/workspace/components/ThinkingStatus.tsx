import { AnimatePresence, motion } from "framer-motion";

import { entranceTransition } from "../constants/workspace";

type ThinkingStatusProps = {
  status: string;
};

export function ThinkingStatus({ status }: ThinkingStatusProps) {
  return (
    <div aria-live="polite" className="h-6 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-base font-medium tracking-wide text-slate-600"
          exit={{ opacity: 0, y: -6 }}
          initial={{ opacity: 0, y: 6 }}
          key={status}
          transition={entranceTransition}
        >
          {status}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
