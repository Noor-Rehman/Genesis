import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import {
  entranceOffset,
  entranceTransition,
  LANDING,
} from "../constants/landing";

type ExploreButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

const buttonAnimation = {
  hidden: { opacity: 0, y: entranceOffset },
  visible: { opacity: 1, y: 0 },
};

export function ExploreButton({ disabled, onClick }: ExploreButtonProps) {
  return (
    <motion.div
      animate="visible"
      initial="hidden"
      transition={{ ...entranceTransition, delay: 0.2 }}
      variants={buttonAnimation}
    >
      <Button
        className="landing-explore-button h-16 w-full rounded-2xl border border-white/20 text-lg font-semibold text-white shadow-[0_18px_50px_rgba(83,150,255,.25)] focus-visible:ring-sky-300 disabled:border-white/8 disabled:bg-white/5 disabled:text-slate-600"
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {LANDING.button}
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/button:translate-x-0.5" />
      </Button>
    </motion.div>
  );
}
