import type {
  ThinkingConnection,
  ThinkingNode,
  ThinkingParticle,
} from "../types/workspace";

export const workspaceCopy = {
  title: "Constructing your reasoning space",
  subtitle: "Every important decision creates multiple possible futures.",
  completeTitle: "Your reasoning space is ready",
  completeDescription: "Preparing your first view of the possibilities ahead.",
} as const;

export const thinkingStatuses = [
  "Analyzing goals…",
  "Extracting assumptions…",
  "Generating futures…",
  "Building reasoning graph…",
  "Preparing observer…",
  "Ready",
] as const;

export const statusRotationMs = 1_800;
export const readyTransitionMs = 800;
export const entranceTransition = { duration: 0.4, ease: "easeOut" } as const;
export const canvasTransition = { duration: 0.7, ease: "easeOut" } as const;
export const entranceOffset = 12;

export const thinkingNodes: ThinkingNode[] = [
  { id: "a", x: 108, y: 200, delay: 0 },
  { id: "b", x: 188, y: 118, delay: 0.1 },
  { id: "c", x: 220, y: 282, delay: 0.2 },
  { id: "d", x: 310, y: 76, delay: 0.3 },
  { id: "e", x: 326, y: 188, delay: 0.4 },
  { id: "f", x: 342, y: 326, delay: 0.5 },
  { id: "g", x: 438, y: 132, delay: 0.6 },
  { id: "h", x: 454, y: 242, delay: 0.7 },
  { id: "i", x: 510, y: 62, delay: 0.8 },
  { id: "j", x: 540, y: 350, delay: 0.9 },
  { id: "k", x: 582, y: 190, delay: 1 },
  { id: "l", x: 662, y: 105, delay: 1.1 },
  { id: "m", x: 680, y: 274, delay: 1.2 },
  { id: "n", x: 746, y: 198, delay: 1.3 },
];

export const thinkingConnections: ThinkingConnection[] = [
  { from: "a", to: "b", delay: 0.1 },
  { from: "a", to: "c", delay: 0.2 },
  { from: "b", to: "d", delay: 0.3 },
  { from: "b", to: "e", delay: 0.4 },
  { from: "c", to: "e", delay: 0.4 },
  { from: "c", to: "f", delay: 0.5 },
  { from: "d", to: "g", delay: 0.6 },
  { from: "e", to: "g", delay: 0.6 },
  { from: "e", to: "h", delay: 0.7 },
  { from: "f", to: "h", delay: 0.7 },
  { from: "f", to: "j", delay: 0.9 },
  { from: "g", to: "i", delay: 0.8 },
  { from: "g", to: "k", delay: 1 },
  { from: "h", to: "k", delay: 1 },
  { from: "h", to: "j", delay: 0.9 },
  { from: "i", to: "l", delay: 1.1 },
  { from: "j", to: "m", delay: 1.2 },
  { from: "k", to: "l", delay: 1.1 },
  { from: "k", to: "m", delay: 1.2 },
  { from: "l", to: "n", delay: 1.3 },
  { from: "m", to: "n", delay: 1.3 },
];

export const thinkingParticles: ThinkingParticle[] = [
  { id: "p1", left: "10%", top: "18%", x: 18, y: -10, duration: 8 },
  { id: "p2", left: "22%", top: "72%", x: -12, y: 16, duration: 10 },
  { id: "p3", left: "40%", top: "12%", x: 10, y: 14, duration: 9 },
  { id: "p4", left: "62%", top: "78%", x: 16, y: -12, duration: 11 },
  { id: "p5", left: "82%", top: "26%", x: -14, y: 12, duration: 9 },
  { id: "p6", left: "90%", top: "66%", x: 10, y: 16, duration: 10 },
] as const;
