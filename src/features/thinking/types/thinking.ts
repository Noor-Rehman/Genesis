export type ThinkingStep = {
  id: string;
  label: string;
};

export type ThinkingNodeData = {
  id: string;
  x: number;
  y: number;
  delay: number;
  size?: number;
};

export type ThinkingConnectionData = {
  from: string;
  to: string;
  delay: number;
};
