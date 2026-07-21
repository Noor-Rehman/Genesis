import { useMemo } from "react";

import { buildGraph } from "../services/graph-builder";

export function useGraphLayout() {
  return useMemo(() => buildGraph(), []);
}
