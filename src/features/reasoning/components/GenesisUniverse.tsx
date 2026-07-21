"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CircleDot, Sparkles, X, ArrowUpRight, Heart, Landmark, Brain, ShieldCheck, Users, Compass, ArrowRightLeft, Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useReasoningStore } from "@/store/reasoning-store";
import { fallbackUniverse, type AiPath } from "@/lib/reasoning/ai";
import "./genesis-universe.css";
import "./compare-mode.css";
import { CompareMode } from "./CompareMode";

type Path = AiPath & { icon: typeof Heart; color: string };

const paths: Path[] = [
  { id: "purple", color:"purple", title: "Passion & purpose", label: "Play it safe", outcome: "A stable career with room to explore", detail: "Keep your role while shaping the problem you want to solve.", confidence: 72, icon: Heart, reasoning: "Your current role provides a strong platform to experiment from a position of safety.", assumptions: ["Energy remains after work", "You can protect focus time"], evidence: "You have shipped high-agency projects before.", tradeoff: "Slower validation in exchange for lower downside.", imagePrompt:"" },
  { id: "blue", color:"blue", title: "Financial impact", label: "Make the leap", outcome: "A focused runway for founder momentum", detail: "Commit fully and learn at the speed of the market.", confidence: 58, icon: Landmark, reasoning: "A clean break creates attention and urgency, but concentrates financial risk.", assumptions: ["18 months of runway", "Early customer access"], evidence: "The market is accelerating around your domain expertise.", tradeoff: "More speed in exchange for income certainty.", imagePrompt:"" },
  { id: "cyan", color:"cyan", title: "Skills & growth", label: "Side quest", outcome: "Compounding founder skills", detail: "Build in public while transitioning gradually.", confidence: 81, icon: Brain, reasoning: "A staged transition produces the richest learning loop with controlled exposure.", assumptions: ["Consistent weekly cadence", "A narrow initial product"], evidence: "Your skills map directly to the first customer problem.", tradeoff: "Progress is steady, not immediate.", imagePrompt:"" },
  { id: "green", color:"green", title: "Risk & security", label: "Join & learn", outcome: "A stronger founder network", detail: "Join an AI startup and learn the operating system.", confidence: 64, icon: ShieldCheck, reasoning: "A high-growth team grants proximity to the problems, people, and patterns you need.", assumptions: ["Mission alignment", "Meaningful ownership"], evidence: "Adjacent teams are actively hiring builders like you.", tradeoff: "Less autonomy in exchange for accelerated context.", imagePrompt:"" },
  { id: "orange", color:"orange", title: "People & belonging", label: "Pivot career", outcome: "A new professional identity", detail: "Use your strengths to enter the AI field deliberately.", confidence: 69, icon: Users, reasoning: "The right community can create momentum that individual effort cannot.", assumptions: ["Mentors are accessible", "Your network will travel with you"], evidence: "Your most meaningful work has been collaborative.", tradeoff: "Requires rebuilding professional credibility.", imagePrompt:"" },
  { id: "pink", color:"pink", title: "Long-term fulfilment", label: "Wild card", outcome: "An uncharted but resonant path", detail: "Follow the signal that keeps returning.", confidence: 33, icon: Compass, reasoning: "Some paths are not legible yet, but curiosity is information too.", assumptions: ["You can tolerate ambiguity", "Discovery is a valid outcome"], evidence: "Several unrelated interests point to a shared underlying theme.", tradeoff: "Maximum possibility with minimal predictability.", imagePrompt:"" },
];

const colors = ["purple", "blue", "cyan", "green", "orange", "pink"];
const icons = [Heart, Landmark, Brain, ShieldCheck, Users, Compass];
const toPath = (path: AiPath, index: number): Path => ({ ...path, color: colors[index], icon: icons[index] });

export function GenesisUniverse() {
  const decision = useReasoningStore((state) => state.decision);
  const [graph, setGraph] = useState<Path[]>(() => decision ? fallbackUniverse(decision).paths.map(toPath) : paths);
  const [active, setActive] = useState<Path | null>(null);
  const [world, setWorld] = useState<Path | null>(null);
  const [loading, setLoading] = useState(Boolean(decision));
  const [comparison, setComparison] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [evidence, setEvidence] = useState<Record<string, string[]>>({});
  useEffect(() => { if (!decision) return; let cancelled = false; setLoading(true); fetch("/api/reason", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({decision}) }).then(r => r.json()).then(data => { if (!cancelled && Array.isArray(data.paths)) setGraph(data.paths.map(toPath)); }).finally(() => { if (!cancelled) setLoading(false); }); return () => { cancelled = true; }; }, [decision]);
  const updatePath = (next: Path) => { setGraph(current => current.map(path => path.id === next.id ? next : path)); setActive(next); };
  const selectForComparison = (id: string) => { setComparison(current => current.includes(id) ? current.filter((item) => item !== id) : [...current.slice(-1), id]); setIsComparing(true); };
  const addEvidence = (pathId: string, item: string) => setEvidence(current => ({ ...current, [pathId]: [...(current[pathId] || []), item] }));
  return <main className={`genesis ${world ? "is-diving" : ""}`}>
    <div className="nebula nebula-one" /><div className="nebula nebula-two" /><div className="grain" />
    <Starfield />
    <header className="genesis-brand"><span>GENESIS</span><small>AI THAT MAKES THINKING VISIBLE</small></header>
    <aside className="legend"><p>REASONING OVERLAY</p><Legend color="#b76aff" text="6 Primary paths" /><Legend color="#58b9ff" text="24 Key factors" /><Legend color="#ffd764" text="63 Potential outcomes" /><Legend color="#fff" text="∞ Possibilities" /></aside>
    <section className="universe" aria-label="Reasoning universe">
      <div className="root-wrap"><span className="question-label">{loading ? "CONSTRUCTING YOUR UNIVERSE" : "YOUR QUESTION"}</span><motion.button initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:"spring", delay:.7, stiffness:75, damping:14}} className="root-node" onClick={() => setActive(graph[2])}><span>{decision || "Should I leave my software job and build an AI startup?"}</span></motion.button></div>
      <svg className="constellations" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{graph.map((p,i) => { const x = 115 + i * 194; return <g key={p.id}><path className={`branch-line ${p.color}`} d={`M600 118 C600 188 ${x} 166 ${x} 260`} /><path className={`trail ${p.color}`} d={`M${x} 310 C${x} 380 ${x - 40} 385 ${x} 485`} /></g>})}</svg>
      <div className="paths">{graph.map((path, index) => <PathCard path={path} index={index} key={path.id} onOpen={setActive} onWorld={setWorld} />)}</div>
    </section>
    <div className="quote">“The future is not something we enter. The future is something we create.”</div>
    <footer className="command"><Sparkles size={14}/><span>Explore</span><i/> <span>Reflect</span><i/> <span>Decide</span><i/> <span>Create your future</span></footer>
    <button className="compare-trigger" onClick={() => setIsComparing(true)}><ArrowRightLeft size={15}/> Compare futures {comparison.length ? `(${comparison.length}/2)` : ""}</button>
    <AnimatePresence>{active && <Inspector path={active} onClose={() => setActive(null)} onChange={updatePath} onCompare={selectForComparison} evidence={evidence[active.id] || []} onAddEvidence={addEvidence} />}</AnimatePresence>
    <AnimatePresence>{isComparing && <CompareMode paths={graph} selected={comparison} onSelect={selectForComparison} onClose={() => setIsComparing(false)} />}</AnimatePresence>
    <AnimatePresence>{world && <FutureWorld path={world} onClose={() => setWorld(null)} />}</AnimatePresence>
  </main>;
}

function Starfield() { return <div className="stars" aria-hidden="true">{Array.from({length: 85}, (_, i) => <b key={i} style={{left:`${(i*37)%100}%`, top:`${(i*61)%100}%`, animationDelay:`${(i%9)*-.7}s`}} />)}</div> }
function Legend({color,text}:{color:string;text:string}) { return <div><b style={{background:color, boxShadow:`0 0 12px ${color}`}}/><span>{text}</span></div> }
function PathCard({path,index,onOpen,onWorld}:{path:Path;index:number;onOpen:(p:Path)=>void;onWorld:(p:Path)=>void}) { const Icon=path.icon; return <motion.article initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{delay:1.25+index*.13, duration:.55}} className={`path-card ${path.color}`} onMouseEnter={(e)=>e.currentTarget.classList.add("hovered")} onMouseLeave={(e)=>e.currentTarget.classList.remove("hovered")}>
  <button className="factor" onClick={()=>onOpen(path)}><span>{path.title}</span><Icon size={24}/></button><div className="timeline"><span/><span/><span/><span/><span/></div>
  <button className="world" onClick={()=>onWorld(path)} aria-label={`Explore ${path.label} future world`}><div className="planet"><div className="planet-light"/><span>EXPLORE</span></div><p>PATH {index+1}</p><h2>{path.label}</h2><small>{path.detail}</small><em>{path.confidence}% alignment</em></button>
</motion.article> }
function Inspector({path,onClose,onChange,onCompare,evidence,onAddEvidence}:{path:Path;onClose:()=>void;onChange:(next:Path)=>void;onCompare:(id:string)=>void;evidence:string[];onAddEvidence:(id:string,item:string)=>void}) { const [draft,setDraft]=useState(""); const edit=(key:"title"|"reasoning"|"evidence"|"tradeoff", value:string)=>onChange({...path,[key]:value}); const submitEvidence=()=>{const item=draft.trim();if(item){onAddEvidence(path.id,item);setDraft("");}}; return <motion.aside initial={{x:420, opacity:0}} animate={{x:0,opacity:1}} exit={{x:420,opacity:0}} transition={{type:"spring", damping:26, stiffness:220}} className="inspector"><button className="close" onClick={onClose}><X size={18}/></button><div className={`panel-orb ${path.color}`}/><p className="eyebrow">EDITABLE REASONING PATH</p><input className="path-title-input" value={path.title} onChange={e=>edit("title",e.target.value)}/><button className="inspector-compare" onClick={()=>onCompare(path.id)}><ArrowRightLeft size={14}/> Add to comparison</button><section><label>Reasoning</label><textarea value={path.reasoning} onChange={e=>edit("reasoning",e.target.value)}/></section><section><label>Assumptions · one per line</label><textarea value={path.assumptions.join("\n")} onChange={e=>onChange({...path, assumptions:e.target.value.split("\n").filter(Boolean)})}/></section><section><label>Confidence · {path.confidence}%</label><input type="range" min="1" max="99" value={path.confidence} onChange={e=>onChange({...path,confidence:Number(e.target.value)})}/></section><section><label>Evidence cards</label><div className="evidence-add"><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();submitEvidence();}}} placeholder="Add a link, note, or constraint"/><button onClick={submitEvidence}><Plus size={14}/></button></div>{evidence.map((item,index)=><div className="evidence-card" key={`${item}-${index}`}><Link2 size={13}/><span>{item}</span></div>)}<textarea value={path.evidence} onChange={e=>edit("evidence",e.target.value)} placeholder="AI evidence summary"/></section><section><label>Tradeoff</label><textarea value={path.tradeoff} onChange={e=>edit("tradeoff",e.target.value)}/></section></motion.aside> }
function FutureWorld({path,onClose}:{path:Path;onClose:()=>void}) { return <motion.section initial={{opacity:0,scale:.82}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.12}} transition={{type:"spring",damping:24}} className={`future-view ${path.id}`}><button onClick={onClose} className="return"><ChevronRight size={17}/> Return to universe</button><div className="future-orbit"><div className="future-planet"><span>{path.label}</span></div></div><div className="future-copy"><p>FUTURE WORLD</p><h2>{path.outcome}</h2><span>This possibility is now a living reasoning space.</span><button onClick={onClose}>Explore this universe <ArrowUpRight size={16}/></button></div></motion.section> }
