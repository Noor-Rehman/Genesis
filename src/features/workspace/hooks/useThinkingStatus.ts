"use client";

import { useEffect, useState } from "react";

import {
  readyTransitionMs,
  statusRotationMs,
  thinkingStatuses,
} from "../constants/workspace";

export function useThinkingStatus() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const isReady = statusIndex === thinkingStatuses.length - 1;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isReady) {
        setIsComplete(true);
        return;
      }

      setStatusIndex((currentIndex) => currentIndex + 1);
    }, isReady ? readyTransitionMs : statusRotationMs);

    return () => window.clearTimeout(timer);
  }, [isReady]);

  return { isComplete, status: thinkingStatuses[statusIndex] };
}
