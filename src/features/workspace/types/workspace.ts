export type ThinkingNode = {
  id: string;
  x: number;
  y: number;
  delay: number;
};

export type ThinkingConnection = {
  from: string;
  to: string;
  delay: number;
};

export type ThinkingParticle = {
  id: string;
  left: string;
  top: string;
  x: number;
  y: number;
  duration: number;
};
