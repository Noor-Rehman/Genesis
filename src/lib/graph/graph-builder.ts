import { GRAPH_EDGES, GRAPH_NODES } from "@/features/reasoning/constants/graph";

import type {
  GraphBlueprint,
  GraphBlueprintEdge,
  GraphBlueprintNode,
  GraphEdgeData,
  GraphNodeData,
  UniverseEdge,
  UniverseNode,
} from "./graph-types";
import { layoutGraph } from "./graph-layout";

const nodeTypeByKind: Record<GraphNodeData["kind"], string> = {
  decision: "decision",
  future: "future",
  assumption: "assumption",
  risk: "risk",
  ghost: "ghost",
  opportunity: "opportunity",
};

function createNode({ id, kind, position, ...data }: GraphBlueprintNode): UniverseNode {
  return {
    id,
    type: nodeTypeByKind[kind],
    position: position ?? { x: 0, y: 0 },
    data: {
      ...data,
      kind,
    },
  };
}

function createEdge({ source, target, highlighted }: GraphBlueprintEdge): UniverseEdge {
  return {
    id: `${source}-${target}`,
    source,
    target,
    animated: true,
    style: { stroke: "#4c4665", strokeWidth: 1.25 },
    data: { highlighted } satisfies GraphEdgeData,
  };
}

export function buildGraphFromBlueprint(graph: GraphBlueprint): { nodes: UniverseNode[]; edges: UniverseEdge[] } {
  const laidOutGraph = layoutGraph(graph);

  return {
    nodes: laidOutGraph.nodes.map(createNode),
    edges: laidOutGraph.edges.map(createEdge),
  };
}

export function buildGraph(): { nodes: UniverseNode[]; edges: UniverseEdge[] } {
  const blueprint: GraphBlueprint = {
    decision: GRAPH_NODES[0]?.title ?? "Decision",
    nodes: GRAPH_NODES.map((node) => ({ ...node })),
    edges: GRAPH_EDGES.map(([source, target]) => ({ source, target })),
  };

  return buildGraphFromBlueprint(blueprint);
}