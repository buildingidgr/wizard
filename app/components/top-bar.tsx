"use client"

import { useState } from "react"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "./language-selector"

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect is used to avoid hydration mismatch
  useState(() => setMounted(true))

  if (!mounted) {
    return null
  }

  return (
    <div className="w-full bg-background border-b">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="font-semibold text-lg">MechHub</div>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

