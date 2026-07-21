export type {
  GraphEdgeData,
  GraphNodeData,
  GraphNodeKind,
  UniverseEdge,
  UniverseNode,
} from "@/lib/graph/graph-types";

export type ObserverInsight = {
  strongestFuture: string;
  confidence: number;
  influentialAssumption: string;
  biggestUncertainty: string;
  nextQuestion: string;
};
