"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "@/components/ui/switch";
import { useEffect, useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="relative z-50 "
    style={{height: "160px"}}
    >
      {/* Banner background with Next.js Image */}
      <div className="absolute inset-0 h-[300px] rounded-bl-[100px] z-0 h-[500px]">
        <Image
          src="/assets/desktop/bg-pattern-header.svg"
          alt="Header background"
          fill
          priority
        />
      </div>

      <div className="relative container z-10 mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-3xl">
            devjobs
          </Link>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeSwitch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="transition-colors"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
