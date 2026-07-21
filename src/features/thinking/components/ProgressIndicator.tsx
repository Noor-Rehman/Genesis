import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import { THINKING_COPY, THINKING_STEPS } from "../constants/thinking";

type ProgressIndicatorProps = { currentStep: number; progress: number };

export function ProgressIndicator({ currentStep, progress }: ProgressIndicatorProps) {
  const preparing = progress >= 72;

  return (
    <section aria-live="polite" className="w-full max-w-md space-y-7">
      <div className="space-y-3 rounded-2xl border border-indigo-100 bg-white/85 p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-sm">
        {THINKING_STEPS.map((step, index) => {
          const complete = index < currentStep || preparing;
          const active = index === currentStep && !preparing;

          return (
            <motion.div animate={{ opacity: index <= currentStep ? 1 : 0.3 }} className="flex items-center gap-3 py-1.5" initial={{ opacity: 0, y: 5 }} key={step.id} transition={{ delay: index * 0.08 }}>
              <span className={`flex size-6 items-center justify-center rounded-full border ${complete ? "border-violet-300 bg-violet-100 text-violet-700" : active ? "border-violet-400 text-violet-600" : "border-slate-300 text-transparent"}`}>
                {complete ? <Check aria-hidden="true" className="size-3" /> : <span className={active ? "size-1.5 animate-pulse rounded-full bg-violet-300" : "size-1.5"} />}
              </span>
              <span className={`text-base ${complete || active ? "text-slate-800" : "text-slate-400"}`}>{step.label}</span>
            </motion.div>
          );
        })}
        <AnimatePresence mode="wait">
          {preparing && <motion.p animate={{ opacity: 1 }} className="pt-2 text-base text-violet-700" initial={{ opacity: 0 }} key="preparing">{THINKING_COPY.preparing}</motion.p>}
        </AnimatePresence>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-base font-medium text-slate-600">
          <span>{THINKING_COPY.progressLabel}</span>
          <span className="tabular-nums text-slate-800">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-indigo-100">
          <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-violet-500" transition={{ ease: "linear", duration: 0.1 }} />
        </div>
      </div>
    </section>
  );
}
