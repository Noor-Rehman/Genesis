"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DecisionInput } from "./DecisionInput";
import { ExploreButton } from "./ExploreButton";
import { Hero } from "./Hero";
import { LANDING } from "../constants/landing";
import { useReasoningStore } from "@/store/reasoning-store";

export function LandingPage() {
  const [decision, setDecision] = useState("");
  const router = useRouter();
  const setStoredDecision = useReasoningStore((state) => state.setDecision);
  const isExploreDisabled = decision.trim().length === 0;

  return (
    <main className="landing-premium relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 py-12 text-slate-100 sm:px-8">
      <div aria-hidden="true" className="landing-aurora" /><div aria-hidden="true" className="landing-grid" />
      <p className="landing-wordmark">GENESIS</p><p className="landing-status"><i /> Decision intelligence</p>
      <div aria-hidden="true" className="landing-orbit"><span /><b /><em /></div>
      <section aria-labelledby="landing-title" className="relative z-10 w-full max-w-[860px] space-y-11 text-center">
        <Hero />
        <div className="landing-query text-left">
          <DecisionInput onChange={(event) => setDecision(event.target.value)} value={decision} />
          <ExploreButton disabled={isExploreDisabled} onClick={() => { setStoredDecision(decision.trim()); router.push("/thinking"); }} />
        </div>
        <div aria-label="Genesis benefits" className="landing-capabilities">
          {["Map the tradeoffs", "Test assumptions", "See future paths"].map((benefit, index) => <div key={benefit}><span>0{index + 1}</span><p>{benefit}</p></div>)}
        </div>
        <footer className="pt-2">
          <p className="text-sm tracking-wide text-slate-500">&ldquo;{LANDING.footer}&rdquo;</p>
        </footer>
      </section>
    </main>
  );
}
