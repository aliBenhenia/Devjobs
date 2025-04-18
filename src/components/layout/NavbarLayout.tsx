"use client";

import React,{ useEffect, useState } from "react";
import DarkModeTest from "@/app/t";
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
    <>
        {/* <nav className="bg-gray-800 p-4">

            <div className="container mx-auto">
            <h1 className="text-secondary">Job Board</h1>
            <div className="bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark p-6 rounded">
  Hello with dark mode!
</div>
<div className="bg-base-dark text-base-white p-4 rounded">
  This uses your custom base colors from tailwind.config.js
</div>

<button className="bg-base-blue text-base-white hover:bg-base-violet">
  Click me
</button>


            </div>
        </nav> */}
        {/* <DarkModeTest /> */}
      <Header />
      <main>{children}</main>
    </>
  );
};

export default NavbarLayout;
