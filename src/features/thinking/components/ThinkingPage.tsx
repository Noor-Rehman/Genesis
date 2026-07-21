"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useThinkingAnimation } from "../hooks/useThinkingAnimation";
import { ProgressIndicator } from "./ProgressIndicator";
import { ThinkingCanvas } from "./ThinkingCanvas";
import { ThinkingHeader } from "./ThinkingHeader";

export function ThinkingPage() {
  const router = useRouter();
  const { currentStep, isComplete, progress } = useThinkingAnimation();

  useEffect(() => {
    if (isComplete) router.replace("/reasoning");
  }, [isComplete, router]);

  return (
    <main className="genesis-shell relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 py-16 text-slate-100 sm:px-8">
      <div aria-hidden="true" className="genesis-nebula genesis-nebula-left" /><div aria-hidden="true" className="genesis-nebula genesis-nebula-right" /><div aria-hidden="true" className="genesis-stars" />
      <ThinkingCanvas />
      <div className="relative z-10 flex w-full max-w-[700px] flex-col items-center gap-10">
        <ThinkingHeader />
        <ProgressIndicator currentStep={currentStep} progress={progress} />
      </div>
    </main>
  );
}
