import { motion } from "framer-motion";
import type { ChangeEvent } from "react";

import {
  entranceOffset,
  entranceTransition,
  inputLabel,
  LANDING,
} from "../constants/landing";

type DecisionInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

const inputAnimation = {
  hidden: { opacity: 0, y: entranceOffset },
  visible: { opacity: 1, y: 0 },
};

export function DecisionInput({ value, onChange }: DecisionInputProps) {
  return (
    <motion.div
      animate="visible"
      initial="hidden"
      transition={{ ...entranceTransition, delay: 0.1 }}
      variants={inputAnimation}
    >
      <label className="sr-only" htmlFor="decision">
        {inputLabel}
      </label>
      <textarea
        className="min-h-30 w-full resize-none rounded-xl border border-white/10 bg-[#0b1021]/85 px-5 py-4 text-[15px] leading-7 text-slate-100 shadow-[0_20px_80px_rgba(0,0,0,.35)] outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-sky-300/45 focus:ring-4 focus:ring-sky-400/8"
        id="decision"
        name="decision"
        onChange={onChange}
        placeholder={LANDING.placeholder}
        value={value}
      />
    </motion.div>
  );
}
