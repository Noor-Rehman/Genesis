import type { ObserverInsight } from "../types/graph";

export const UNIVERSE_COPY = {
  title: "Reasoning Universe",
  subtitle: "Explore the futures your decision makes possible.",
  observer: "Observer",
  currentStrongest: "Current strongest future",
  confidence: "Confidence",
  influentialAssumption: "Most influential assumption",
  uncertainty: "Biggest uncertainty",
  nextQuestion: "Suggested next question",
} as const;

export const GRAPH_NODES = [
  { id: "decision", title: "Should I pursue a Master's in Germany?", description: "The decision at the root of this exploration.", kind: "decision", confidence: 98, source: "Your question", evidence: "This is the decision being explored.", assumptions: ["You want to compare paths, not receive a single answer."], counterargument: "A different question may create a different tree.", position: { x: 500, y: 45 }, phase: 1 },
  { id: "career", title: "Career", description: "Long-term professional direction.", kind: "future", confidence: 81, source: "Path factor", evidence: "Strong mentorship and visible growth compound over time.", assumptions: ["You care about trajectory."], counterargument: "Near-term momentum may matter more.", position: { x: 120, y: 265 }, phase: 2 },
  { id: "finance", title: "Finance", description: "Income, cost, and financial flexibility.", kind: "future", confidence: 73, source: "Path factor", evidence: "Tuition and opportunity cost shape the decision.", assumptions: ["Funding is not unlimited."], counterargument: "A higher salary could change the balance.", position: { x: 470, y: 265 }, phase: 2 },
  { id: "learning", title: "Learning", description: "Depth, mentorship, and capability growth.", kind: "future", confidence: 84, source: "Path factor", evidence: "Structured environments accelerate skill growth.", assumptions: ["Mentorship quality matters."], counterargument: "Self-directed learning can be equally strong.", position: { x: 820, y: 265 }, phase: 2 },
  { id: "masters", title: "Master's", description: "Advanced study and international network.", kind: "future", confidence: 62, source: "Path 01", evidence: "A degree can unlock network depth and international optionality.", assumptions: ["Admission is feasible."], counterargument: "Study may slow career momentum.", branch: "Path 01 · academic", position: { x: 120, y: 500 }, phase: 3 },
  { id: "industry", title: "Industry", description: "Applied learning and immediate momentum.", kind: "future", confidence: 88, source: "Path 02", evidence: "Industry experience compounds through shipping and feedback.", assumptions: ["You can find a strong team now."], counterargument: "The path may be narrower later.", branch: "Path 02 · professional", position: { x: 470, y: 500 }, phase: 3 },
  { id: "startup", title: "Startup", description: "Rapid responsibility and ownership.", kind: "future", confidence: 69, source: "Path 03", evidence: "Startups force learning through ownership and ambiguity.", assumptions: ["You tolerate volatility."], counterargument: "Risk may be too high if certainty is needed.", branch: "Path 03 · venture", position: { x: 820, y: 500 }, phase: 3 },
  { id: "risk", title: "Risk", description: "Downside to prepare for.", kind: "risk", confidence: 55, source: "Path 01 outcome", evidence: "Visa, finances, and job mismatch can create friction.", assumptions: ["Your tolerance for uncertainty is moderate."], counterargument: "A clear plan can reduce most of this risk.", position: { x: 20, y: 735 }, phase: 4 },
  { id: "opportunity", title: "Opportunity", description: "Upside created by this choice.", kind: "opportunity", confidence: 79, source: "Path 01 outcome", evidence: "The right environment amplifies future options.", assumptions: ["The market rewards specialization."], counterargument: "Opportunity only matters if you act on it.", position: { x: 210, y: 735 }, phase: 4 },
  { id: "growth", title: "Growth", description: "Compounding capability over time.", kind: "opportunity", confidence: 86, source: "Path 02 outcome", evidence: "Better feedback loops increase long-term growth.", assumptions: ["Compounding matters more than comfort."], counterargument: "Growth without alignment can be wasted effort.", position: { x: 400, y: 735 }, phase: 4 },
  { id: "visa", title: "Visa", description: "A key Germany-path uncertainty.", kind: "assumption", confidence: 62, source: "Path 02 outcome", evidence: "Immigration rules determine feasibility.", assumptions: ["You qualify for admission."], counterargument: "Rules and processing times can change.", position: { x: 590, y: 735 }, phase: 4 },
  { id: "salary", title: "Salary", description: "Near-term earnings potential.", kind: "opportunity", confidence: 74, source: "Path 02 outcome", evidence: "Pay can change the study-versus-work tradeoff.", assumptions: ["You can compare offers directly."], counterargument: "Salary alone ignores mentorship.", position: { x: 680, y: 735 }, phase: 4 },
  { id: "research", title: "Research", description: "Depth of academic exploration.", kind: "opportunity", confidence: 66, source: "Path 03 outcome", evidence: "Research environments improve long-horizon thinking.", assumptions: ["You want theoretical exploration."], counterargument: "Research may not map to the job you want.", position: { x: 870, y: 735 }, phase: 4 },
  { id: "family", title: "Family", description: "Support system and personal ties.", kind: "assumption", confidence: 58, source: "Path 03 outcome", evidence: "Support and proximity change the cost of moving abroad.", assumptions: ["Personal ties matter."], counterargument: "The move can still be worthwhile.", position: { x: 1060, y: 735 }, phase: 4 },
] as const;

export const GRAPH_EDGES = [
  ["decision", "career"], ["decision", "finance"], ["decision", "learning"],
  ["career", "masters"], ["finance", "industry"], ["learning", "startup"],
  ["masters", "risk"], ["masters", "opportunity"],
  ["industry", "growth"], ["industry", "visa"], ["industry", "salary"],
  ["startup", "research"], ["startup", "family"],
] as const;

export const OBSERVER_INSIGHT: ObserverInsight = {
  strongestFuture: "Future B — Industry growth with optionality",
  confidence: 76,
  influentialAssumption: "A role with strong mentorship is available now.",
  biggestUncertainty: "How much you value international academic experience over immediate momentum.",
  nextQuestion: "What would make the Master's path worth delaying two years of industry experience?",
};

export const THOUGHT_PLAYBACK = [
  {
    step: 0,
    label: "Decision",
    narration: "What are the possible paths?",
    observer: "Thinking...",
    visibleNodeIds: ["decision"],
    holdMs: 900,
  },
  {
    step: 1,
    label: "Paths emerge",
    narration: "Master's, Industry, Startup appear.",
    observer: "Analyzing Career...",
    visibleNodeIds: ["decision", "career", "finance", "learning"],
    holdMs: 1_050,
  },
  {
    step: 2,
    label: "Tradeoffs",
    narration: "What matters most?",
    observer: "Comparing Futures...",
    visibleNodeIds: ["decision", "career", "finance", "learning", "masters", "industry", "startup"],
    holdMs: 1_150,
  },
  {
    step: 3,
    label: "Missing information",
    narration: "How important is international experience?",
    observer: "Comparing Futures...",
    visibleNodeIds: ["decision", "career", "finance", "learning", "masters", "industry", "startup", "risk", "opportunity", "growth", "visa", "salary", "research", "family"],
    holdMs: 1_300,
  },
  {
    step: 4,
    label: "Universe ready",
    narration: "The model has a shape, not an answer.",
    observer: "Universe Ready",
    visibleNodeIds: ["decision", "career", "finance", "learning", "masters", "industry", "startup", "risk", "opportunity", "growth", "visa", "salary", "research", "family"],
    holdMs: 0,
  },
] as const;
