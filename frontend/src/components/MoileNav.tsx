'use client'

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function MoileNav() {

  const router = useRouter()
  return (
    <div className="flex justify-between px-6 py-4 lg:hidden">
      <div className="flex justify-center items-center space-x-1">
          <img src="/logo.png" alt="formai-logo" className="size-5" />
          <span className="text-lg font-bold">FormAI</span>
        </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <FiMenu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-6">
            <SheetTitle className="font-bold text-2xl">FormAI</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-[40%]">
            {/* Navigation Links */}
            <nav className="flex-1">
              <ul className="flex flex-col space-y-4">
                <li className="w-full text-center text-muted-foreground cursor-pointer">
                  Features
                </li>
                <li className="w-full text-center text-muted-foreground cursor-pointer">
                  Github
                </li>
                <li className="w-full text-center text-muted-foreground cursor-pointer">
                  Discord
                </li>
              </ul>
            </nav>

              <Button size="sm" onClick={() => router.push('/signin') }>Signin</Button>
            </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}