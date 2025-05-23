"use client";

import { motion } from "framer-motion";

interface SpaceLoadingProps {
  isLoading: boolean;
}

export function SpaceLoading({ isLoading }: SpaceLoadingProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Outer orbit */}
        <motion.div
          className="absolute w-32 h-32 rounded-full border-2 border-blue-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Planet on outer orbit */}
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-blue-500"
            style={{
              top: "0%",
              left: "50%",
              marginLeft: "-8px",
              marginTop: "-8px",
            }}
          />
        </motion.div>

        {/* Middle orbit */}
        <motion.div
          className="absolute w-20 h-20 rounded-full border-2 border-purple-500/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        >
          {/* Planet on middle orbit */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-purple-500"
            style={{
              top: "0%",
              left: "50%",
              marginLeft: "-6px",
              marginTop: "-6px",
            }}
          />
        </motion.div>

        {/* Inner orbit */}
        <motion.div
          className="absolute w-12 h-12 rounded-full border-2 border-cyan-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          {/* Planet on inner orbit */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-cyan-500"
            style={{
              top: "0%",
              left: "50%",
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
          />
        </motion.div>

        {/* Central star */}
        <motion.div
          className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500"
          animate={{
            boxShadow: [
              "0 0 10px 2px rgba(255, 214, 0, 0.7)",
              "0 0 20px 4px rgba(255, 214, 0, 0.7)",
              "0 0 10px 2px rgba(255, 214, 0, 0.7)",
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Loading text */}
        <motion.p
          className="mt-12 text-white text-lg font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Загрузка...
        </motion.p>
      </div>
    </motion.div>
  );
}
