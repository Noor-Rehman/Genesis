import { MiniMap } from "@xyflow/react";

export function MiniMapPanel() {
  return (
    <div className="absolute bottom-5 right-5 z-10 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/90 shadow-xl shadow-black/30">
      <MiniMap className="!bg-zinc-900" maskColor="rgb(9 9 11 / 0.72)" nodeColor="rgb(161 161 170)" pannable zoomable />
    </div>
  );
}
