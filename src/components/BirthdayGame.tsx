"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PuzzleGame from "./games/PuzzleGame";
import LoveTrivia from "./games/LoveTrivia";
import VictoryMessage from "./shared/VictoryMessage";
import SnowFall from "./shared/SnowFall";

type GameStage = "puzzle" | "trivia" | "victory";

const TRANSITION_DURATION = 2;

export default function BirthdayGame() {
  const [stage, setStage] = useState<GameStage>("puzzle");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePuzzleComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage("trivia");
      setIsTransitioning(false);
    }, TRANSITION_DURATION * 1000);
  };

  const handleTriviaComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage("victory");
      setIsTransitioning(false);
    }, TRANSITION_DURATION * 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      <SnowFall />
      
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: TRANSITION_DURATION }}
            className="w-full"
          >
            {stage === "puzzle" && <PuzzleGame onComplete={handlePuzzleComplete} />}
            {stage === "trivia" && <LoveTrivia onComplete={handleTriviaComplete} />}
            {stage === "victory" && <VictoryMessage />}
          </motion.div>
        )}
      </AnimatePresence>

      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/80 z-50"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-white text-xl">Cargando siguiente sorpresa...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
