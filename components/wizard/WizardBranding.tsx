"use client"

import Image from 'next/image'

export function WizardBranding() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="MechLabs Logo"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
      </div>
      <div className="space-y-2">
        <blockquote className="text-sm font-medium text-foreground">
          &quot;Προηγμένη σκέψη για σύγχρονες ανάγκες&quot;
        </blockquote>
        <cite className="block text-sm text-muted-foreground">
          <a href="/engineers" className="hover:text-foreground hover:underline cursor-pointer">
            Είσαι μηχανικός; Συνεργάσου με την MechLabs
          </a>
        </cite>
      </div>
      <div className="text-center space-y-4">
        <Image
          src="/2.png"
          alt="Success"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
    </div>
  )
} 