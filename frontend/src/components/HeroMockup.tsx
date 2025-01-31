import React from "react";
import { motion } from "framer-motion";

export default function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 border shadow-xl z-10 rounded-xl p-6 bg-green-300 bg-opacity-25 lg:w-[60%] w-full flex justify-center items-center"
    >
      <motion.img
        src="/forms.png"
        className="w-full h-full object-cover rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}