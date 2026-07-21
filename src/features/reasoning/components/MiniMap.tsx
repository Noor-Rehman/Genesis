import { MiniMap as ReactFlowMiniMap } from "@xyflow/react";

export function MiniMap() {
  return <div className="pointer-events-auto absolute bottom-5 left-5 hidden overflow-hidden rounded-xl border border-indigo-100 bg-white/90 shadow-xl shadow-indigo-950/10 backdrop-blur md:block"><ReactFlowMiniMap className="!bg-[#f8faff]" maskColor="rgb(238 242 255 / 0.72)" nodeColor="rgb(99 102 241)" pannable zoomable /></div>;
}
