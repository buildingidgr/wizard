"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { ProgressSteps } from "../../shared/ProgressSteps"
import { Input } from "@/components/ui/input"

interface ProjectInfoStepProps {
  projectTitle: string
  additionalInfo: string
  onInfoChange: (title: string, info: string) => void
  onContinue: () => void
  onBack: () => void
}

export const ProjectInfoStep = ({
  projectTitle,
  additionalInfo,
  onInfoChange,
  onContinue,
  onBack
}: ProjectInfoStepProps) => {
  const [localTitle, setLocalTitle] = useState(projectTitle)
  const [localInfo, setLocalInfo] = useState(additionalInfo)
  const [wordCount, setWordCount] = useState(() => additionalInfo.trim().split(/\s+/).filter(Boolean).length)

  const handleInfoChange = (value: string) => {
    setLocalInfo(value)
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length)
  }

  const handleSubmit = () => {
    onInfoChange(localTitle, localInfo)
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
            <div className="space-y-2">
              <Input
                placeholder="Τίτλος έργου"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                maxLength={100}
              />
              <div className="flex justify-end">
                <p className={`text-sm ${localTitle.length >= 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {localTitle.length}/100 χαρακτήρες
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Περιγράψτε τις απαιτήσεις του έργου σας..."
              value={localInfo}
              onChange={(e) => handleInfoChange(e.target.value)}
              className="min-h-[200px]"
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">
                  Ελάχιστο όριο: 10 λέξεις
                </p>
                <p className={`${wordCount < 10 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {wordCount} {wordCount === 1 ? 'λέξη' : 'λέξεις'}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Περιγράψτε με λεπτομέρεια το έργο σας. Η περιγραφή θα πρέπει να είναι τουλάχιστον 10 λέξεις. Για παράδειγμα: &ldquo;Θέλω να ανακαινίσω το μπάνιο του σπιτιού μου που βρίσκεται στην Αθήνα&rdquo;
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={handleSubmit}
              disabled={!localTitle.trim() || !localInfo.trim() || wordCount < 10}
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