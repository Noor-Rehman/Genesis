"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Background, BackgroundVariant, ReactFlow, useEdgesState, useNodesState, useReactFlow, type EdgeTypes, type NodeTypes } from "@xyflow/react";

import { createPlaceholderGraph } from "../constants/placeholderGraph";
import { cameraTransitionMs, initialViewport, introViewport } from "../constants/reasoning";
import { useMediaQuery } from "../hooks/useMediaQuery";
import type { ReasoningGraphEdge, ReasoningGraphNode } from "../types/reasoning";
import { MiniMapPanel } from "./MiniMapPanel";
import { NodeInspector } from "./NodeInspector";
import { ReasoningEdge } from "./ReasoningEdge";
import { ReasoningNode } from "./ReasoningNode";
import { Toolbar } from "./Toolbar";

const initialGraph = createPlaceholderGraph();
const nodeTypes: NodeTypes = { reasoning: ReasoningNode };
const edgeTypes: EdgeTypes = { reasoning: ReasoningEdge };

function updateEdgeHighlights(edges: ReasoningGraphEdge[], nodeId: string | null) {
  return edges.map((edge) => ({
    ...edge,
    data: { ...edge.data, highlighted: nodeId !== null && (edge.source === nodeId || edge.target === nodeId) },
  }));
}

export function ReasoningCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges);
  const [selectedNode, setSelectedNode] = useState<ReasoningGraphNode | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { setViewport } = useReactFlow();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void setViewport(initialViewport, { duration: cameraTransitionMs });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [setViewport]);

  const relatedTitles = useMemo(() => {
    if (!selectedNode) return [];
    return selectedNode.data.relatedIds.map((id) => nodes.find((node) => node.id === id)?.data.title).filter((title): title is string => Boolean(title));
  }, [nodes, selectedNode]);

  const selectNode = useCallback((node: ReasoningGraphNode | null) => {
    setSelectedNode(node);
    setEdges((currentEdges) => updateEdgeHighlights(currentEdges, node?.id ?? null));
  }, [setEdges]);

  const highlightConnections = useCallback((nodeId: string | null) => {
    setEdges((currentEdges) => updateEdgeHighlights(currentEdges, nodeId));
  }, [setEdges]);

  const resetCanvas = useCallback(() => {
    setNodes(initialGraph.nodes);
    setEdges(initialGraph.edges);
    setSelectedNode(null);
    void setViewport(initialViewport, { duration: 400 });
  }, [setEdges, setNodes, setViewport]);

  return (
    <section aria-label="Interactive reasoning canvas" className="h-[100dvh] w-full bg-zinc-950">
      <ReactFlow
        defaultViewport={introViewport}
        edgeTypes={edgeTypes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodes={nodes}
        nodesConnectable={false}
        nodesDraggable={!isMobile}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => selectNode(node)}
        onNodeMouseEnter={(_, node) => highlightConnections(node.id)}
        onNodeMouseLeave={() => highlightConnections(selectedNode?.id ?? null)}
        onNodesChange={onNodesChange}
        panOnDrag={!isMobile}
        proOptions={{ hideAttribution: true }}
        selectionOnDrag={!isMobile}
        zoomOnDoubleClick={!isMobile}
        zoomOnPinch={!isMobile}
        zoomOnScroll={!isMobile}
      >
        <Background color="rgb(113 113 122 / 0.18)" gap={22} size={1} variant={BackgroundVariant.Dots} />
        {!isMobile && <Toolbar onChallenge={() => undefined} onReset={resetCanvas} />}
        {!isMobile && <MiniMapPanel />}
        {!isMobile && <NodeInspector node={selectedNode} onClose={() => selectNode(null)} relatedTitles={relatedTitles} />}
      </ReactFlow>
    </section>
  );
}
