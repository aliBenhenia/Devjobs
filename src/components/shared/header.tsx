"use client";

import Link from "next/link";
import ThemeSwitch from "@/components/ui/switch";
import { useEffect, useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync with system or persisted preference (optional)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="relative bg-red-600 h-[800px]">
      {/* Banner background with increased height */}
      <div className="absolute inset-0 h-[500px] bg-accent rounded-bl-[100px] z-0">
        <div className="absolute inset-0 bg-[url('/assets/desktop/bg-pattern-header.svg')] bg-no-repeat bg-cover opacity-10" />
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
