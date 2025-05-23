"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SimplePortalProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function SimplePortal({ isActive, onComplete }: SimplePortalProps) {
  console.log("SimplePortal rendered, isActive:", isActive);

  useEffect(() => {
    if (isActive && onComplete) {
      console.log("SimplePortal is active, setting timeout for onComplete");
      const timer = setTimeout(() => {
        console.log("SimplePortal calling onComplete");
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-32 h-32 bg-blue-500 rounded-full"
        animate={{
          scale: [1, 1.5, 10],
          opacity: [1, 0.8, 0],
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.3, 1],
        }}
      />
    </motion.div>
  );
}
