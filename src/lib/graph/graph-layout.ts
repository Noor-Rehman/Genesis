import type { GraphBlueprint, GraphBlueprintNode, GraphPoint } from "./graph-types";

const phaseFallbacks: Record<number, GraphPoint[]> = {
  2: [
    { x: -280, y: -140 },
    { x: 0, y: -180 },
    { x: 280, y: -140 },
  ],
  3: [
    { x: -360, y: 150 },
    { x: 0, y: 210 },
    { x: 360, y: 150 },
  ],
  4: [
    { x: -510, y: 390 },
    { x: -330, y: 400 },
    { x: -150, y: 390 },
    { x: 40, y: 400 },
    { x: 230, y: 390 },
    { x: 410, y: 400 },
  ],
};

const decisionFallback: GraphPoint = { x: 425, y: 300 };

function resolvePhasePosition(node: GraphBlueprintNode, indexInPhase: number): GraphPoint {
  if (node.position) {
    return node.position;
  }

  if (node.kind === "decision") {
    return decisionFallback;
  }

  const phaseFallback = phaseFallbacks[node.phase];

  if (phaseFallback?.[indexInPhase]) {
    return phaseFallback[indexInPhase];
  }

  return {
    x: decisionFallback.x + indexInPhase * 180 - 180,
    y: decisionFallback.y + node.phase * 110,
  };
}

export function layoutGraph(graph: GraphBlueprint): GraphBlueprint {
  const phaseIndexes = new Map<number, number>();

  return {
    ...graph,
    nodes: graph.nodes.map((node) => {
      const phaseIndex = phaseIndexes.get(node.phase) ?? 0;
      phaseIndexes.set(node.phase, phaseIndex + 1);
      return {
        ...node,
        position: resolvePhasePosition(node, phaseIndex),
      };
    }),
  };
}