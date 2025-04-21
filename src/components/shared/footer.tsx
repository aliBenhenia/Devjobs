// src/components/Footer.tsx
"use client"
import Link from "next/link"
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-600 pt-6 text-center text-sm text-gray-400 dark:text-gray-500">
      <p>© {new Date().getFullYear()} JobBoard by 
        <Link href="https://github.com/aliBenhenia" className="text-blue-500 hover:underline"> AliBenhenia</Link>
        . All rights reserved.</p>
    </footer>
  )
}
