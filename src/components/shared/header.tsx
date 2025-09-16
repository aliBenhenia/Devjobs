"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialDarkMode = savedTheme 
      ? savedTheme === "dark" 
      : systemPrefersDark;
      
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle("dark", initialDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <header className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div 
        className="absolute inset-0 rounded-bl-[100px] z-0"
        style={{
          height: "160px",
          background: "linear-gradient(120deg, #5964e0 0%, #5964e0 50%, #939bf4 100%)"
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/desktop/bg-pattern-header.svg"
            alt="Header background"
            fill
            priority
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-white font-bold text-3xl tracking-tight"
          >
            devjobs
          </Link>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}