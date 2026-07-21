"use client";

import { useEffect, useState } from "react";

import { STEP_DURATION_MS, THINKING_DURATION_MS, THINKING_STEPS } from "../constants/thinking";

export function useThinkingAnimation() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      setElapsed(Math.min(performance.now() - startedAt, THINKING_DURATION_MS));
    }, 50);

    return () => window.clearInterval(timer);
  }, []);

  const progress = Math.round((elapsed / THINKING_DURATION_MS) * 100);
  const currentStep = Math.min(Math.floor(elapsed / STEP_DURATION_MS), THINKING_STEPS.length - 1);

  return {
    currentStep,
    isComplete: elapsed >= THINKING_DURATION_MS,
    progress,
  };
}
