"use client";

import React from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Button } from "./ui/button";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div>
            <HeroGeometric 
                badge="FormAI"
                title1="Simple PDFs to"
                title2="Actionable Data"
            />
        </div>
    );
}