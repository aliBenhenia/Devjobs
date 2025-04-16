'use client'

import { useEffect, useState } from 'react'

export default function DarkModeTest() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark'
    document.documentElement.classList.toggle('dark', isDarkStored)
    setIsDark(isDarkStored)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    setIsDark(newTheme)
  }

  const boxes = [
    { label: 'bg', class: 'bg-bg dark:bg-bg-dark' },
    { label: 'text', class: 'text-text dark:text-text-dark' },
    { label: 'secondary', class: 'text-secondary dark:text-secondary-dark' },
    { label: 'accent', class: 'bg-accent dark:bg-accent-dark text-white' },
    { label: 'card', class: 'bg-card dark:bg-card-dark' },
    { label: 'border', class: 'border border-border dark:border-border-dark' },
    { label: 'hover', class: 'bg-hover dark:bg-hover-dark' },
  ]

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark p-6 space-y-6">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-accent dark:bg-accent-dark text-white hover:bg-hover dark:hover:bg-hover-dark"
      >
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boxes.map(({ label, class: boxClass }) => (
          <div
            key={label}
            className={`${boxClass} p-6 rounded shadow border border-border dark:border-border-dark`}
          >
            <strong className="capitalize">{label}</strong>
            <p className="mt-2 text-sm text-secondary dark:text-secondary-dark">
              This box uses the "{label}" color
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


