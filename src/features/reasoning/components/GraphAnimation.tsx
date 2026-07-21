"use client";

import { useCallback, useEffect, useMemo } from "react";
import { ReactFlow, useNodesState, useReactFlow, type EdgeTypes, type NodeTypes } from "@xyflow/react";

import { useGraphLayout } from "../hooks/useGraphLayout";
import { initialViewport } from "../constants/reasoning";
import { THOUGHT_PLAYBACK } from "../constants/graph";
import type { UniverseNode } from "../types/graph";
import { AnimatedEdge } from "./AnimatedEdge";
import { AnimatedNode } from "./AnimatedNode";
import { GraphBackground } from "./GraphBackground";
import { MiniMap } from "./MiniMap";
import { ThoughtInspector } from "./ThoughtInspector";
import { Toolbar } from "./Toolbar";
import { useReasoningStore } from "@/store/reasoning-store";

const nodeTypes: NodeTypes = { assumption: AnimatedNode, decision: AnimatedNode, future: AnimatedNode, ghost: AnimatedNode, opportunity: AnimatedNode, risk: AnimatedNode };
const edgeTypes: EdgeTypes = { animated: AnimatedEdge };

const scenarioShiftByBias: Record<string, Partial<Record<string, { x: number; y: number; confidenceDelta: number }>>> = {
  balanced: {},
  visa: {
    masters: { x: -80, y: -10, confidenceDelta: 10 },
    visa: { x: -40, y: -20, confidenceDelta: 18 },
    industry: { x: 30, y: 10, confidenceDelta: -4 },
    startup: { x: 40, y: 10, confidenceDelta: -2 },
  },
  salary: {
    industry: { x: -30, y: -18, confidenceDelta: 14 },
    salary: { x: -60, y: -16, confidenceDelta: 14 },
    research: { x: 40, y: 6, confidenceDelta: -6 },
  },
  learning: {
    learning: { x: -40, y: -20, confidenceDelta: 14 },
    masters: { x: -30, y: -8, confidenceDelta: 10 },
    industry: { x: 32, y: 8, confidenceDelta: -2 },
  },
  startup: {
    startup: { x: 70, y: -22, confidenceDelta: 14 },
    risk: { x: 20, y: 0, confidenceDelta: -4 },
    opportunity: { x: -10, y: 0, confidenceDelta: 8 },
  },
  research: {
    research: { x: -60, y: -20, confidenceDelta: 14 },
    masters: { x: -28, y: -6, confidenceDelta: 8 },
    industry: { x: 42, y: 10, confidenceDelta: -5 },
  },
  funding: {
    startup: { x: 54, y: -20, confidenceDelta: 16 },
    salary: { x: 28, y: -10, confidenceDelta: 8 },
    industry: { x: -18, y: 6, confidenceDelta: 2 },
  },
};

type BlindSpotTemplate = {
  id: string;
  title: string;
  description: string;
  confidence: number;
  source: string;
  evidence: string;
  assumptions: readonly string[];
  counterargument: string;
  phase: number;
  position: { x: number; y: number };
};

const blindSpotBase: BlindSpotTemplate[] = [
  { id: "ghost-network", title: "Network", description: "Who you become connected to through each path.", confidence: 22, source: "Blind spot detection", evidence: "Network effects often change long-term outcomes.", assumptions: ["Relationships matter beyond the first job."], counterargument: "Not every decision hinges on networking intensity.", phase: 4, position: { x: 1120, y: 420 } },
  { id: "ghost-burnout", title: "Burnout", description: "Whether the pace is sustainable.", confidence: 18, source: "Blind spot detection", evidence: "Sustained effort can degrade if the environment is too intense.", assumptions: ["Your energy is finite."], counterargument: "A high-friction period can still be worthwhile.", phase: 4, position: { x: 1100, y: 500 } },
  { id: "ghost-happiness", title: "Happiness", description: "Whether the path aligns with how you want to live.", confidence: 26, source: "Blind spot detection", evidence: "A strong career path can still be the wrong life path.", assumptions: ["Fulfillment is part of the objective."], counterargument: "Happiness may follow from mastery and momentum.", phase: 4, position: { x: 1110, y: 580 } },
];

export function GraphAnimation() {
  const graph = useGraphLayout();
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const { fitView, setViewport } = useReactFlow();
  const playbackStep = useReasoningStore((state) => state.playbackStep);
  const isPlaying = useReasoningStore((state) => state.isPlaying);
  const selectedNodeId = useReasoningStore((state) => state.selectedNode);
  const setGraph = useReasoningStore((state) => state.setGraph);
  const setSelectedNode = useReasoningStore((state) => state.setSelectedNode);
  const setObserverState = useReasoningStore((state) => state.setObserverState);
  const setThinkingState = useReasoningStore((state) => state.setThinkingState);
  const setIsPlaying = useReasoningStore((state) => state.setIsPlaying);
  const setPlaybackStep = useReasoningStore((state) => state.setPlaybackStep);
  const setObserverNarration = useReasoningStore((state) => state.setObserverNarration);
  const scenarioBias = useReasoningStore((state) => state.scenarioBias);
  const challengePrompt = useReasoningStore((state) => state.challengePrompt);
  const blindSpots = useReasoningStore((state) => state.blindSpots);
  const setScenarioBias = useReasoningStore((state) => state.setScenarioBias);
  const setChallengePrompt = useReasoningStore((state) => state.setChallengePrompt);
  const setBlindSpots = useReasoningStore((state) => state.setBlindSpots);

  const currentScene = THOUGHT_PLAYBACK[Math.min(playbackStep, THOUGHT_PLAYBACK.length - 1)];
  const selectedNode = useMemo(() => nodes.find((node) => node.id === selectedNodeId) ?? null, [nodes, selectedNodeId]);
  const visibleNodeIds = useMemo(() => new Set<string>(currentScene.visibleNodeIds), [currentScene.visibleNodeIds]);
  const visibleNodes = useMemo(() => nodes.filter((node) => visibleNodeIds.has(node.id)), [nodes, visibleNodeIds]);
  const visibleIds = useMemo(() => new Set(visibleNodes.map((node) => node.id)), [visibleNodes]);
  const visibleEdges = useMemo(() => graph.edges.filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target)).map((edge) => ({ ...edge, type: "animated" })), [graph.edges, visibleIds]);
  const ghostNodes = useMemo(() => blindSpotBase.filter((node) => blindSpots.includes(node.id)).map((node, index) => ({
    id: node.id,
    type: "ghost",
    position: { x: node.position.x, y: node.position.y + index * 8 },
    data: {
      title: node.title,
      description: node.description,
      kind: "ghost" as const,
      confidence: node.confidence,
      source: node.source,
      evidence: node.evidence,
      assumptions: node.assumptions,
      counterargument: node.counterargument,
      phase: node.phase,
    },
  })), [blindSpots]);

  const reflowNodes = useCallback((sourceNodes: UniverseNode[], nextBias: keyof typeof scenarioShiftByBias = scenarioBias) => {
    const shifts = scenarioShiftByBias[nextBias] ?? scenarioShiftByBias.balanced;
    return sourceNodes.map((node) => {
      const baseShift = shifts[node.id] ?? { x: 0, y: 0, confidenceDelta: 0 };
      const confidence = Math.max(0, Math.min(100, (node.data.confidence ?? 0) + baseShift.confidenceDelta));
      return {
        ...node,
        position: {
          x: node.position.x + baseShift.x,
          y: node.position.y + baseShift.y,
        },
        data: {
          ...node.data,
          confidence,
        },
      };
    });
  }, [scenarioBias]);

  useEffect(() => {
    const baseNodes = reflowNodes(graph.nodes, scenarioBias);
    setNodes(baseNodes);
  }, [ghostNodes, graph.nodes, reflowNodes, scenarioBias, setNodes]);

  useEffect(() => {
    if (selectedNodeId && !selectedNode) {
      setSelectedNode(null);
    }
  }, [selectedNode, selectedNodeId, setSelectedNode]);

  useEffect(() => {
    setGraph({ nodes, edges: graph.edges });
  }, [graph.edges, nodes, setGraph]);

  useEffect(() => {
    setObserverState(currentScene.observer === "Thinking..." ? "thinking" : currentScene.observer === "Analyzing Career..." ? "analyzing" : currentScene.observer === "Comparing Futures..." ? "comparing" : "ready");
    setThinkingState(playbackStep < THOUGHT_PLAYBACK.length - 1 ? (playbackStep === 0 ? "building" : playbackStep === THOUGHT_PLAYBACK.length - 1 ? "ready" : "settling") : "ready");
    setObserverNarration(currentScene.narration);
    setBlindSpots(playbackStep >= 3 || scenarioBias !== "balanced" ? ["ghost-network", "ghost-burnout", "ghost-happiness"] : []);
    setChallengePrompt(selectedNode?.data.kind === "assumption" ? `What if ${selectedNode.data.title.toLowerCase()} wasn't a constraint?` : selectedNode?.id === "visa" ? "What if getting a visa wasn't a concern?" : selectedNode?.id === "salary" ? "What if salary mattered less than learning?" : "What assumption would you like to test?");
    if (playbackStep === THOUGHT_PLAYBACK.length - 1) {
      void fitView({ duration: 1_100, padding: 0.18 });
    }
  }, [currentScene.narration, currentScene.observer, fitView, playbackStep, scenarioBias, selectedNode?.data.kind, selectedNode?.data.title, selectedNode?.id, setBlindSpots, setChallengePrompt, setObserverNarration, setObserverState, setThinkingState]);

  useEffect(() => {
    if (!isPlaying || playbackStep >= THOUGHT_PLAYBACK.length - 1) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setPlaybackStep(playbackStep + 1);
    }, currentScene.holdMs);

    return () => window.clearTimeout(timer);
  }, [currentScene.holdMs, isPlaying, playbackStep, setPlaybackStep]);

  useEffect(() => {
    if (playbackStep >= THOUGHT_PLAYBACK.length - 1) {
      setIsPlaying(false);
    }
  }, [playbackStep, setIsPlaying]);

  const resetUniverse = () => {
    setPlaybackStep(0);
    setSelectedNode(null);
    setIsPlaying(true);
    setScenarioBias("balanced");
    setChallengePrompt("");
    setBlindSpots([]);
    void setViewport(initialViewport, { duration: 250 });
  };

  const updateNodeAssumption = (nodeId: string, assumption: string) => {
    setNodes((current) => current.map((node) => {
      if (node.id !== nodeId) {
        return node;
      }

      const nextAssumptions = assumption ? [assumption, ...node.data.assumptions.slice(1)] : node.data.assumptions;
      return {
        ...node,
        data: {
          ...node.data,
          assumptions: nextAssumptions,
          source: assumption.toLowerCase().includes("funding") ? "Funding scenario" : node.data.source,
          confidence: Math.min(100, (node.data.confidence ?? 0) + 8),
        },
      };
    }));

    if (assumption.toLowerCase().includes("visa")) setScenarioBias("visa");
    if (assumption.toLowerCase().includes("salary")) setScenarioBias("salary");
    if (assumption.toLowerCase().includes("learning")) setScenarioBias("learning");
    if (assumption.toLowerCase().includes("startup") || assumption.toLowerCase().includes("funding")) setScenarioBias("funding");
    if (assumption.toLowerCase().includes("research")) setScenarioBias("research");
  };

  const challengeReasoning = () => {
    const nextBias = selectedNode?.id === "visa" ? "visa" : selectedNode?.id === "salary" ? "salary" : selectedNode?.id === "learning" ? "learning" : selectedNode?.id === "startup" ? "funding" : selectedNode?.id === "research" ? "research" : "balanced";
    setScenarioBias(nextBias);
    setIsPlaying(false);
    setPlaybackStep(Math.min(playbackStep + 1, THOUGHT_PLAYBACK.length - 1));
  };

  return <section aria-label="Animated reasoning universe" className="relative h-full min-h-0 w-full flex-1"><GraphBackground /><ReactFlow className="h-full w-full" edgeTypes={edgeTypes} edges={visibleEdges} fitView fitViewOptions={{ padding: 0.28 }} nodes={[...visibleNodes, ...ghostNodes] as UniverseNode[]} nodesConnectable={false} nodesDraggable onEdgesChange={() => undefined} onNodeClick={(_, node) => setSelectedNode(node.id)} onNodeDragStart={(_, node) => setSelectedNode(node.id)} onNodesChange={onNodesChange} nodeTypes={nodeTypes} panOnDrag proOptions={{ hideAttribution: true }}><Toolbar onReset={resetUniverse} onChallenge={challengeReasoning} /><MiniMap />{selectedNode && <ThoughtInspector node={selectedNode} onClose={() => setSelectedNode(null)} onSaveAssumption={updateNodeAssumption} challengePrompt={challengePrompt} onChallenge={challengeReasoning} />}</ReactFlow></section>;
}
