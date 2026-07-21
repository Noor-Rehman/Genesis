import type { Edge, Node } from "@xyflow/react";

export type GraphNodeKind = "decision" | "future" | "assumption" | "risk" | "opportunity" | "ghost";

export type GraphNodeData = {
  title: string;
  description: string;
  kind: GraphNodeKind;
  confidence?: number;
  branch?: string;
  phase: number;
  source: string;
  evidence: string;
  assumptions: readonly string[];
  counterargument: string;
  priority?: number;
};

export type GraphEdgeData = {
  highlighted?: boolean;
};

export type GraphPoint = {
  x: number;
  y: number;
};

export type GraphBlueprintNode = GraphNodeData & {
  id: string;
  position?: GraphPoint;
};

export type GraphBlueprintEdge = {
  source: string;
  target: string;
  highlighted?: boolean;
};

export type GraphBlueprint = {
  decision: string;
  nodes: GraphBlueprintNode[];
  edges: GraphBlueprintEdge[];
};

export type UniverseNode = Node<GraphNodeData>;
export type UniverseEdge = Edge<GraphEdgeData>;