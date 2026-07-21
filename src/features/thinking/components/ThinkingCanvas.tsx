import { THINKING_CONNECTIONS, THINKING_NODES } from "../constants/thinking";
import { ThinkingConnection } from "./ThinkingConnection";
import { ThinkingNode } from "./ThinkingNode";

const nodesById = new Map(THINKING_NODES.map((node) => [node.id, node]));

export function ThinkingCanvas() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 opacity-80">
      <svg className="mx-auto h-auto w-full max-w-5xl text-sky-300" fill="none" viewBox="0 0 820 420">
        <g>
          {THINKING_CONNECTIONS.map((connection) => {
            const from = nodesById.get(connection.from);
            const to = nodesById.get(connection.to);

            return from && to ? <ThinkingConnection connection={connection} from={from} key={`${connection.from}-${connection.to}`} to={to} /> : null;
          })}
        </g>
        <g>{THINKING_NODES.map((node) => <ThinkingNode key={node.id} node={node} />)}</g>
      </svg>
    </div>
  );
}
