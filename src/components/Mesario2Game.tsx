"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WordScrambleGame from "./games/WordScrambleGame";
import WordScrambleVictory from "./shared/WordScrambleVictory";
import SnowFall from "./shared/SnowFall";
import TextFooter2 from "./shared/TextFooter2";

const ANIM_DURATION = 2;

export default function Mesario2Game() {
  const [showVictory, setShowVictory] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGameComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowVictory(true);
    }, ANIM_DURATION * 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative px-10">
      <SnowFall />
      {!showVictory ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: ANIM_DURATION }}
          className="w-full"
        >
          <WordScrambleGame onComplete={handleGameComplete} />
          <TextFooter2 />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIM_DURATION }}
          className="w-full"
        >
          <WordScrambleVictory />
        </motion.div>
      )}
    </div>
  );
}
