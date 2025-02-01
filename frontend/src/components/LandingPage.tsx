"use client";

import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {

    const router = useRouter();

  return (
    <div className="min-h-screen gradient-section w-full flex flex-col justify-center items-center">
      {/* Main Content with Hero-mockup and CTA button */}
      <div className="flex flex-col justify-center items-start h-auto space-y-2 px-4">
        {/* Animated h1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl lg:text-7xl font-bold "
        >
          Turn your PDFs into <br />{" "}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            actionable JSON forms
          </motion.span>
        </motion.h1>

        {/* Animated p */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-foreground text-sm lg:text-lg max-w-lg"
        >
          Transform PDFs into structured, actionable data using our AI-powered
          text extraction and classification.
        </motion.p>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center pt-6"
        >
          <Button className="group" onClick={() => router.push('/signin')}>
            Get Started for free{" "}
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
      <Image
        height={400}
        width={400}
        className="p-6"
        src="/hero.svg"
        alt="HeroImage"
      />
       </motion.div>
    </div>
  );
}
