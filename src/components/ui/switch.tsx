"use client";

import { Moon, Sun } from "lucide-react";
import React, { useEffect } from "react";

interface ThemeSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export default function ThemeSwitch({
  checked,
  onCheckedChange,
  className = "",
}: ThemeSwitchProps) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", checked);
  }, [checked]);

  return (
    <div className="flex items-center gap-3">
      <Sun className="text-yellow-400" />

      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`w-12 h-6 rounded-full relative flex items-center transition-colors duration-300 
          ${checked ? "bg-white" : "bg-gray-400"} ${className}`}
      >
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full transform transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-6 bg-black" : "translate-x-0 bg-white"
          }`}
        />
      </button>

      <Moon className="text-gray-500 dark:text-white" />
    </div>
  );
}
