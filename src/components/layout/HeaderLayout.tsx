"use client";

import React,{ useEffect, useState } from "react";
import Header from "@/components/shared/header";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  return (
    <div className="flex flex-col justify-center max-w-6xl mx-auto">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default NavbarLayout;
