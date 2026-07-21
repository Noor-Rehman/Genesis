import type { ThinkingConnectionData, ThinkingNodeData, ThinkingStep } from "../types/thinking";

export const THINKING_COPY = {
  title: "Analyzing your decision...",
  subtitle: "Mapping the possibilities around what matters to you.",
  preparing: "Preparing reasoning universe...",
  progressLabel: "Thinking...",
} as const;

export const THINKING_STEPS: ThinkingStep[] = [
  { id: "goal", label: "Understanding your goal" },
  { id: "constraints", label: "Identifying constraints" },
  { id: "alternatives", label: "Exploring alternatives" },
  { id: "futures", label: "Building possible futures" },
  { id: "assumptions", label: "Connecting assumptions" },
];

export const STEP_DURATION_MS = 600;
export const THINKING_DURATION_MS = 4_200;

export const THINKING_NODES: ThinkingNodeData[] = [
  { id: "origin", x: 95, y: 210, delay: 0, size: 5 },
  { id: "goal", x: 205, y: 112, delay: 0.2 },
  { id: "constraint", x: 215, y: 305, delay: 0.35 },
  { id: "option-a", x: 355, y: 82, delay: 0.55, size: 4 },
  { id: "option-b", x: 372, y: 200, delay: 0.65, size: 5 },
  { id: "option-c", x: 350, y: 337, delay: 0.75, size: 4 },
  { id: "future-a", x: 530, y: 125, delay: 0.95 },
  { id: "future-b", x: 545, y: 265, delay: 1.05, size: 5 },
  { id: "outcome-a", x: 710, y: 92, delay: 1.2, size: 4 },
  { id: "outcome-b", x: 730, y: 205, delay: 1.3, size: 5 },
  { id: "outcome-c", x: 705, y: 330, delay: 1.4, size: 4 },
];

export const THINKING_CONNECTIONS: ThinkingConnectionData[] = [
  { from: "origin", to: "goal", delay: 0.1 },
  { from: "origin", to: "constraint", delay: 0.2 },
  { from: "goal", to: "option-a", delay: 0.3 },
  { from: "goal", to: "option-b", delay: 0.4 },
  { from: "constraint", to: "option-b", delay: 0.5 },
  { from: "constraint", to: "option-c", delay: 0.6 },
  { from: "option-a", to: "future-a", delay: 0.7 },
  { from: "option-b", to: "future-a", delay: 0.8 },
  { from: "option-b", to: "future-b", delay: 0.9 },
  { from: "option-c", to: "future-b", delay: 1 },
  { from: "future-a", to: "outcome-a", delay: 1.1 },
  { from: "future-a", to: "outcome-b", delay: 1.2 },
  { from: "future-b", to: "outcome-b", delay: 1.3 },
  { from: "future-b", to: "outcome-c", delay: 1.4 },
];
