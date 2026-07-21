"use client";

import { motion, MotionConfig } from "framer-motion";

import { ReasoningUniverse } from "@/features/reasoning";

import { entranceOffset, entranceTransition, workspaceCopy } from "../constants/workspace";
import { useThinkingStatus } from "../hooks/useThinkingStatus";
import { ThinkingCanvas } from "./ThinkingCanvas";
import { ThinkingParticles } from "./ThinkingParticles";
import { ThinkingStatus } from "./ThinkingStatus";

const pageAnimation = {
  hidden: { opacity: 0, y: entranceOffset },
  visible: { opacity: 1, y: 0 },
};

export function ThinkingSpace() {
  const { isComplete, status } = useThinkingStatus();

  if (isComplete) {
    return <ReasoningUniverse />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#f8f9ff] px-5 py-16 text-slate-900 sm:px-8">
        <ThinkingParticles />
        <motion.section
              animate="visible"
              aria-labelledby="thinking-space-title"
              className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10"
              initial="hidden"
              transition={entranceTransition}
              variants={pageAnimation}
            >
              <div className="max-w-xl space-y-3 text-center">
                <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" id="thinking-space-title">
                  {workspaceCopy.title}
                </h1>
                <p className="text-pretty text-lg leading-8 text-slate-600">
                  {workspaceCopy.subtitle}
                </p>
              </div>
              <ThinkingCanvas />
              <ThinkingStatus status={status} />
        </motion.section>
      </main>
    </MotionConfig>
  );
}
