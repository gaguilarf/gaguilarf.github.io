"use client";

import { motion } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import MusicPlayer from "./MusicPlayer";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

type VictoryMessageProps = {
  message?: string;
};

export default function VictoryMessage({ message }: VictoryMessageProps) {
  // ============================================
  // 🎂 ESCRIBE TU MENSAJE DE CUMPLEAÑOS AQUÍ 👇
  // ============================================
  const birthdayMessage = `¡Feliz Cumpleaños, mi amor! 🎉

Hoy es un día muy especial porque celebramos tu vida y todo lo maravilloso que eres. 

Cada momento a tu lado ha sido increíble, y estoy muy feliz de poder compartir este día contigo.

Que este nuevo año de vida esté lleno de alegría, amor y muchas sorpresas hermosas.

¡Te amo muchísimo! 💕

Con todo mi amor,
[Tu nombre aquí]`;
  // ============================================
  // ☝️ EDITA EL TEXTO DE ARRIBA
  // ============================================

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4">
      <MusicPlayer audioSrc="/music/winner.mp3" autoPlay={true} />

      {/* Fireworks background */}
      <div className="absolute w-full h-full">
        <Fireworks
          options={{
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50,
            explosion: 5,
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className={`text-6xl font-bold text-white mb-4 ${playfairDisplay.className}`}>
            ¡Feliz Cumpleaños! 🎂
          </h1>
          <p className="text-2xl text-white/90">
            ¡Lo lograste! Aquí está tu sorpresa 💕
          </p>
        </motion.div>

        {/* Message card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <div className="min-h-[300px] p-6">
            <p className="text-white text-xl leading-relaxed whitespace-pre-wrap">
              {message || birthdayMessage}
            </p>
          </div>
        </motion.div>

        {/* Decorative image */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="flex justify-center mt-8"
        >
          <Image
            src="/hamster_jumping.gif"
            alt="Celebración"
            width={200}
            height={200}
            unoptimized
            className="drop-shadow-2xl"
          />
        </motion.div>

        {/* Footer message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className={`text-center text-white/90 text-2xl mt-8 ${playfairDisplay.className}`}
        >
          Te amo muchísimo 💖
        </motion.p>
      </motion.div>
    </div>
  );
}

