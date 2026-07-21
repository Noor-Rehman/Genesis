"use client";

import { useCallback, useState } from "react";
import { useEdgesState, useNodesState } from "@xyflow/react";

import { buildGraph } from "../services/graph-builder";
import type { UniverseNode } from "../types/graph";
import { useGraphLayout } from "./useGraphLayout";

export function useUniverse() {
  const initialGraph = useGraphLayout();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges);
  const [selectedNode, setSelectedNode] = useState<UniverseNode | null>(null);

  const selectNode = useCallback((node: UniverseNode | null) => {
    setSelectedNode(node);
    setEdges((current) => current.map((edge) => ({ ...edge, data: { highlighted: Boolean(node && (edge.source === node.id || edge.target === node.id)) }, style: { ...edge.style, stroke: node && (edge.source === node.id || edge.target === node.id) ? "#a78bfa" : "#4c4665" } })));
  }, [setEdges]);

  const resetUniverse = useCallback(() => {
    const graph = buildGraph();
    setNodes(graph.nodes);
    setEdges(graph.edges);
    setSelectedNode(null);
  }, [setEdges, setNodes]);

  return { edges, nodes, onEdgesChange, onNodesChange, resetUniverse, selectedNode, selectNode };
}
