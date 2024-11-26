"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-between">
          {selectedLanguage.name}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onSelect={() => setSelectedLanguage(language)}
          >
            <Check
              className={`mr-2 h-4 w-4 ${
                selectedLanguage.code === language.code ? "opacity-100" : "opacity-0"
              }`}
            />
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

