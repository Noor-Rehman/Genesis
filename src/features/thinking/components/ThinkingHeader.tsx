import { THINKING_COPY } from "../constants/thinking";

export function ThinkingHeader() {
  return (
    <header className="max-w-xl space-y-3 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-sky-300 uppercase">Genesis</p>
      <h1 className="text-balance text-4xl font-medium tracking-[-0.04em] text-slate-50 sm:text-5xl">
        {THINKING_COPY.title}
      </h1>
      <p className="text-pretty text-lg leading-8 text-slate-400">{THINKING_COPY.subtitle}</p>
    </header>
  );
}
