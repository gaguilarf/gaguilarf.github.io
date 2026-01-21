"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import MusicPlayer from "../shared/MusicPlayer";

type PuzzleGameProps = {
  onComplete: () => void;
};

const GRID_SIZE = 4; // 4x4 puzzle
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

type PuzzlePiece = {
  id: number;
  currentPosition: number;
  correctPosition: number;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function PuzzleGame({ onComplete }: PuzzleGameProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Initialize puzzle pieces
    const initialPieces: PuzzlePiece[] = Array.from({ length: TOTAL_PIECES }, (_, i) => ({
      id: i,
      currentPosition: i,
      correctPosition: i,
    }));
    
    // Shuffle positions
    const shuffledPositions = shuffleArray(Array.from({ length: TOTAL_PIECES }, (_, i) => i));
    const shuffledPieces = initialPieces.map((piece, index) => ({
      ...piece,
      currentPosition: shuffledPositions[index],
    }));
    
    setPieces(shuffledPieces);
  }, []);

  const handlePieceClick = (pieceId: number) => {
    if (isComplete) return;

    console.log("🔵 Piece clicked:", pieceId);
    console.log("🔵 Currently selected piece:", selectedPiece);

    if (selectedPiece === null) {
      // First piece selected
      console.log("✅ Selecting first piece:", pieceId);
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      // Clicking the same piece - deselect it
      console.log("⚠️ Same piece clicked - deselecting");
      setSelectedPiece(null);
    } else {
      // Swap the two pieces
      console.log("🔄 Swapping pieces:", selectedPiece, "↔️", pieceId);
      
      setPieces((prevPieces) => {
        console.log("📦 Previous pieces state:", prevPieces);
        
        const piece1Index = prevPieces.findIndex((p) => p.id === selectedPiece);
        const piece2Index = prevPieces.findIndex((p) => p.id === pieceId);
        
        console.log("🔍 Piece 1 index:", piece1Index, "- Current position:", prevPieces[piece1Index]?.currentPosition);
        console.log("🔍 Piece 2 index:", piece2Index, "- Current position:", prevPieces[piece2Index]?.currentPosition);
        
        // Create new array with swapped positions (avoid mutation!)
        const newPieces = prevPieces.map((piece, index) => {
          if (index === piece1Index) {
            // Swap piece 1 to piece 2's position
            return { ...piece, currentPosition: prevPieces[piece2Index].currentPosition };
          } else if (index === piece2Index) {
            // Swap piece 2 to piece 1's position
            return { ...piece, currentPosition: prevPieces[piece1Index].currentPosition };
          }
          return piece;
        });
        
        console.log("✨ After swap - Piece 1 position:", newPieces[piece1Index].currentPosition);
        console.log("✨ After swap - Piece 2 position:", newPieces[piece2Index].currentPosition);
        console.log("📦 New pieces state:", newPieces);
        
        return newPieces;
      });
      
      console.log("🔓 Deselecting pieces");
      setSelectedPiece(null);
    }
  };

  // Check if puzzle is complete
  useEffect(() => {
    if (pieces.length === 0) return;
    
    console.log("🎯 Checking puzzle completion...");
    console.log("📊 Current pieces:", pieces.map(p => ({ id: p.id, current: p.currentPosition, correct: p.correctPosition })));
    
    const complete = pieces.every((piece) => piece.currentPosition === piece.correctPosition);
    console.log("🏁 Is complete?", complete);
    
    if (complete && !isComplete) {
      console.log("🎉 PUZZLE COMPLETED!");
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [pieces, isComplete, onComplete]);

  // Sort pieces by current position for rendering
  const sortedPieces = [...pieces].sort((a, b) => a.currentPosition - b.currentPosition);

  return (
    <div className="flex flex-col items-center justify-center">
      <MusicPlayer audioSrc="/music/background.mp3" autoPlay={true} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-white mb-2">
          🧩 Arma el Rompecabezas
        </h2>
        <p className="text-white/80">
          Haz clic en dos piezas para intercambiarlas
        </p>
      </motion.div>

      <div className="relative">
        <div 
          className="grid gap-1 bg-white/10 p-2 rounded-lg backdrop-blur-sm"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: '600px',
            height: '600px',
          }}
        >
          {sortedPieces.map((piece) => {
            const row = Math.floor(piece.id / GRID_SIZE);
            const col = piece.id % GRID_SIZE;
            const isSelected = selectedPiece === piece.id;
            const isCorrect = piece.currentPosition === piece.correctPosition;

            return (
              <motion.div
                key={piece.id}
                onClick={() => handlePieceClick(piece.id)}
                className={`relative cursor-pointer overflow-hidden rounded-md ${
                  isSelected ? 'ring-4 ring-pink-500' : ''
                } ${isCorrect && isComplete ? 'ring-2 ring-green-500' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/game-photos/0.jpeg)',
                    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                    backgroundPosition: `${col * (100 / (GRID_SIZE - 1))}% ${row * (100 / (GRID_SIZE - 1))}%`,
                  }}
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-pink-500/30 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">✓</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <h3 className="text-4xl font-bold text-white mb-2">
                  ¡Completado! 🎉
                </h3>
                <p className="text-white/80">Preparando la siguiente sorpresa...</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
