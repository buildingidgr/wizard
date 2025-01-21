"use client"

import Image from 'next/image'

export function WizardBranding() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="MechLabs Logo"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        <blockquote className="text-sm font-medium text-foreground">
          &quot;Προηγμένη σκέψη για σύγχρονες ανάγκες&quot;
        </blockquote>
      </div>
      <cite className="text-sm text-muted-foreground">
        <a href="/engineers" className="hover:text-foreground hover:underline cursor-pointer">
          Είσαι μηχανικός; Συνεργάσου με την MechLabs
        </a>
      </cite>
    </div>
  )
} 