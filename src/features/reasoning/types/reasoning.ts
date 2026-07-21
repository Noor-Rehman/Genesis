import type { Edge, Node } from "@xyflow/react";

export type ReasoningNodeKind =
  | "root"
  | "concept"
  | "evidence"
  | "future"
  | "assumption"
  | "question";

export type ReasoningNodeData = {
  title: string;
  description: string;
  confidence: number;
  kind: ReasoningNodeKind;
  relatedIds: string[];
  animationDelay: number;
};

export type ReasoningEdgeData = {
  highlighted?: boolean;
};

export type ReasoningGraphNode = Node<ReasoningNodeData>;
export type ReasoningGraphEdge = Edge<ReasoningEdgeData>;
