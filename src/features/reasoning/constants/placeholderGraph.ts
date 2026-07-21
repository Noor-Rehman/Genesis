import { thinkingNodes } from "@/features/workspace/constants/workspace";

import type {
  ReasoningGraphEdge,
  ReasoningGraphNode,
  ReasoningNodeData,
} from "../types/reasoning";

type GraphNodeDefinition = Omit<ReasoningNodeData, "relatedIds" | "animationDelay"> & {
  id: string;
  position: { x: number; y: number };
};

const continuedPositions = thinkingNodes.map(({ x, y }) => ({ x, y }));

const graphNodes: GraphNodeDefinition[] = [
  { id: "decision", title: "Your Decision", description: "The choice currently being explored.", confidence: 100, kind: "root", position: continuedPositions[0] },
  { id: "career", title: "Career", description: "The work trajectory shaped by this decision.", confidence: 82, kind: "concept", position: continuedPositions[1] },
  { id: "finance", title: "Finance", description: "The financial trade-offs and outcomes involved.", confidence: 78, kind: "concept", position: continuedPositions[2] },
  { id: "learning", title: "Learning", description: "The knowledge and capability this path can build.", confidence: 86, kind: "concept", position: continuedPositions[3] },
  { id: "risk", title: "Risk", description: "The uncertainty and resilience required by each path.", confidence: 71, kind: "concept", position: continuedPositions[4] },
  { id: "location", title: "Location", description: "The environments where this decision can unfold.", confidence: 75, kind: "concept", position: continuedPositions[5] },
  { id: "salary", title: "Salary", description: "Potential near-term earning outcomes.", confidence: 68, kind: "evidence", position: continuedPositions[6] },
  { id: "promotion", title: "Promotion", description: "Growth opportunities within a chosen career path.", confidence: 64, kind: "future", position: continuedPositions[7] },
  { id: "purpose", title: "Purpose", description: "Personal meaning and long-term motivation.", confidence: 59, kind: "question", position: continuedPositions[8] },
  { id: "cost", title: "Cost", description: "Tuition, relocation, and opportunity costs.", confidence: 84, kind: "evidence", position: continuedPositions[9] },
  { id: "savings", title: "Savings", description: "Capacity to preserve financial flexibility.", confidence: 73, kind: "assumption", position: continuedPositions[10] },
  { id: "debt", title: "Debt", description: "Potential obligations created by the decision.", confidence: 70, kind: "future", position: continuedPositions[11] },
  { id: "masters", title: "Masters", description: "Structured advanced study and credentials.", confidence: 81, kind: "concept", position: continuedPositions[12] },
  { id: "research", title: "Research", description: "Depth of inquiry and academic exploration.", confidence: 66, kind: "evidence", position: continuedPositions[13] },
  { id: "industry", title: "Industry", description: "Applied learning through professional work.", confidence: 77, kind: "future", position: { x: 772, y: 342 } },
  { id: "germany", title: "Germany", description: "A possible setting for study and growth.", confidence: 74, kind: "concept", position: { x: 640, y: 398 } },
  { id: "startup", title: "Startup", description: "A high-ownership environment with rapid learning.", confidence: 69, kind: "future", position: { x: 492, y: 416 } },
  { id: "remote", title: "Remote", description: "A flexible work model with location independence.", confidence: 62, kind: "assumption", position: { x: 285, y: 408 } },
  { id: "security", title: "Security", description: "Stability, predictability, and support systems.", confidence: 67, kind: "assumption", position: { x: 72, y: 356 } },
  { id: "opportunity", title: "Opportunity", description: "Upside created by uncertainty and timing.", confidence: 72, kind: "future", position: { x: 14, y: 272 } },
  { id: "failure", title: "Failure", description: "Downside scenarios worth preparing for.", confidence: 56, kind: "question", position: { x: 18, y: 108 } },
];

const graphLinks = [
  ["decision", "career"], ["decision", "finance"], ["decision", "learning"], ["decision", "risk"], ["decision", "location"],
  ["career", "salary"], ["career", "promotion"], ["career", "purpose"],
  ["finance", "cost"], ["finance", "savings"], ["finance", "debt"],
  ["learning", "masters"], ["learning", "research"], ["learning", "industry"],
  ["location", "germany"], ["location", "startup"], ["location", "remote"],
  ["risk", "security"], ["risk", "opportunity"], ["risk", "failure"],
] as const;

export function createPlaceholderGraph(): {
  nodes: ReasoningGraphNode[];
  edges: ReasoningGraphEdge[];
} {
  const relatedNodes = new Map<string, string[]>();

  graphLinks.forEach(([source, target]) => {
    relatedNodes.set(source, [...(relatedNodes.get(source) ?? []), target]);
    relatedNodes.set(target, [...(relatedNodes.get(target) ?? []), source]);
  });

  return {
    nodes: graphNodes.map(({ id, position, ...data }, index) => ({
      id,
      type: "reasoning",
      position,
      data: {
        ...data,
        animationDelay: index * 0.06,
        relatedIds: relatedNodes.get(id) ?? [],
      },
    })),
    edges: graphLinks.map(([source, target]) => ({
      id: `${source}-${target}`,
      source,
      target,
      type: "reasoning",
      animated: true,
      data: { highlighted: false },
    })),
  };
}
