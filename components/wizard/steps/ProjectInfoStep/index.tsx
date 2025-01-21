"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { ProgressSteps } from "../../shared/ProgressSteps"

interface ProjectInfoStepProps {
  additionalInfo: string
  onInfoChange: (info: string) => void
  onContinue: () => void
  onBack: () => void
}

export const ProjectInfoStep = ({
  additionalInfo,
  onInfoChange,
  onContinue,
  onBack
}: ProjectInfoStepProps) => {
  const [localInfo, setLocalInfo] = useState(additionalInfo)
  const [wordCount, setWordCount] = useState(() => additionalInfo.trim().split(/\s+/).filter(Boolean).length)

  const handleInfoChange = (value: string) => {
    setLocalInfo(value)
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length)
  }

  const handleSubmit = () => {
    onInfoChange(localInfo)
    onContinue()
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <ProgressSteps currentStep={2} />
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-sm text-muted-foreground">
              Βήμα 3: Πληροφορίες έργου
            </span>
            <h1 className="text-3xl font-bold">
              Περιγράψτε το έργο σας
            </h1>
          </div>
          <div className="space-y-4">
            <Textarea
              placeholder="Περιγράψτε τις απαιτήσεις του έργου σας..."
              value={localInfo}
              onChange={(e) => handleInfoChange(e.target.value)}
              className="min-h-[200px]"
            />
            <p className="text-sm text-muted-foreground">
              Περιγράψτε με λεπτομέρειες τις απαιτήσεις του έργου σας. Για παράδειγμα: &quot;Χρειάζομαι έναν μηχανικό για την επίβλεψη ανακαίνισης διαμερίσματος 80τμ&quot;
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={handleSubmit}
              disabled={!localInfo.trim() || wordCount < 10}
              className="w-full"
              size="lg"
            >
              Επιβεβαίωση
            </Button>
            <Button 
              variant="outline"
              onClick={onBack}
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Επιστροφή
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 