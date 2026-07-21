import { create } from "zustand";

import type { UniverseEdge, UniverseNode } from "@/lib/graph/graph-types";

export type ObserverState = "thinking" | "analyzing" | "comparing" | "ready";
export type ThinkingState = "idle" | "building" | "settling" | "ready";
export type ScenarioBias = "balanced" | "visa" | "salary" | "learning" | "startup" | "research" | "funding";

type ReasoningGraphState = {
  decision: string;
  nodes: UniverseNode[];
  edges: UniverseEdge[];
  selectedNode: string | null;
  observerState: ObserverState;
  thinkingState: ThinkingState;
  playbackStep: number;
  isPlaying: boolean;
  observerNarration: string;
  scenarioBias: ScenarioBias;
  challengePrompt: string;
  blindSpots: string[];
};

type ReasoningStore = ReasoningGraphState & {
  setDecision: (decision: string) => void;
  setGraph: (graph: Pick<ReasoningGraphState, "nodes" | "edges">) => void;
  setSelectedNode: (selectedNode: string | null) => void;
  setObserverState: (observerState: ObserverState) => void;
  setThinkingState: (thinkingState: ThinkingState) => void;
  setPlaybackStep: (playbackStep: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setObserverNarration: (observerNarration: string) => void;
  setScenarioBias: (scenarioBias: ScenarioBias) => void;
  setChallengePrompt: (challengePrompt: string) => void;
  setBlindSpots: (blindSpots: string[]) => void;
  resetReasoning: () => void;
};

const initialState: ReasoningGraphState = {
  decision: "",
  nodes: [],
  edges: [],
  selectedNode: null,
  observerState: "thinking",
  thinkingState: "idle",
  playbackStep: 0,
  isPlaying: true,
  observerNarration: "What are the possible paths?",
  scenarioBias: "balanced",
  challengePrompt: "",
  blindSpots: [],
};

export const useReasoningStore = create<ReasoningStore>((set) => ({
  ...initialState,
  setDecision: (decision) => set({ decision }),
  setGraph: ({ nodes, edges }) => set({ nodes, edges }),
  setSelectedNode: (selectedNode) => set({ selectedNode }),
  setObserverState: (observerState) => set({ observerState }),
  setThinkingState: (thinkingState) => set({ thinkingState }),
  setPlaybackStep: (playbackStep) => set({ playbackStep }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setObserverNarration: (observerNarration) => set({ observerNarration }),
  setScenarioBias: (scenarioBias) => set({ scenarioBias }),
  setChallengePrompt: (challengePrompt) => set({ challengePrompt }),
  setBlindSpots: (blindSpots) => set({ blindSpots }),
  resetReasoning: () => set(initialState),
}));