"use client"

import { useState } from 'react'
import { StepContainer } from "../shared/StepContainer"
import { ProgressBar } from "../shared/ProgressBar"
import { StepHeader } from "../shared/StepHeader"
import { StepNavigation } from "../shared/StepNavigation"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FileText, Lightbulb, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectInfoStepProps {
  info: string
  onInfoChange: (info: string) => void
  onContinue: () => void
  onBack: () => void
}

const examples = [
  {
    title: "Διαστάσεις και μεγέθη",
    examples: [
      "Το σπίτι είναι 120τμ με 3 υπνοδωμάτια",
      "Το οικόπεδο έχει διαστάσεις 10x15 μέτρα",
      "Θέλω να χτίσω διώροφη κατοικία 80τμ ανά όροφο"
    ]
  },
  {
    title: "Υπάρχουσα κατάσταση",
    examples: [
      "Το κτίριο είναι 30 ετών και χρειάζεται ανακαίνιση",
      "Υπάρχει ήδη παλιά κατασκευή που πρέπει να κατεδαφιστεί",
      "Το οικόπεδο είναι άδειο και έτοιμο για δόμηση"
    ]
  },
  {
    title: "Ειδικές απαιτήσεις",
    examples: [
      "Θέλω να εγκαταστήσω φωτοβολταϊκά στη στέγη",
      "Χρειάζομαι μελέτη για πισίνα στον κήπο",
      "Επιθυμώ ενεργειακή αναβάθμιση του κτιρίου"
    ]
  }
]

export const ProjectInfoStep = ({
  info,
  onInfoChange,
  onContinue,
  onBack
}: ProjectInfoStepProps) => {
  const [localInfo, setLocalInfo] = useState(info)
  const [wordCount, setWordCount] = useState(() => info.trim().split(/\s+/).filter(Boolean).length)

  const handleInfoChange = (value: string) => {
    setLocalInfo(value)
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length)
  }

  const handleSubmit = () => {
    onInfoChange(localInfo)
    onContinue()
  }

  return (
    <StepContainer>
      <ProgressBar currentStep={2} />
      <div className="space-y-8">
        <StepHeader 
          step={3} 
          title="Περιγράψτε το έργο σας"
          subtitle="Πείτε μας τι θέλετε να κάνετε"
        />
        
        <div className="grid gap-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <FileText size={20} />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-medium text-base">
                  Περιγραφή έργου
                </h3>
                <p className="text-sm text-muted-foreground">
                  Μιλήστε μας για το έργο σας με απλά λόγια - όπως θα το εξηγούσατε σε έναν φίλο σας
                </p>
              </div>
            </div>

            {!localInfo.trim() && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                <AlertCircle size={16} className="text-primary shrink-0" />
                <p>Για παράδειγμα: "Θέλω να ανακαινίσω την κουζίνα μου που είναι 15τμ. Χρειάζεται αλλαγή πλακιδίων, ντουλαπιών και ηλεκτρολογικής εγκατάστασης"</p>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <Textarea
                placeholder="Περιγράψτε με δικά σας λόγια τι ακριβώς θέλετε να κάνετε..."
                value={localInfo}
                onChange={(e) => handleInfoChange(e.target.value)}
                className={cn(
                  "min-h-[200px] resize-y",
                  "focus:ring-offset-0",
                  "placeholder:text-muted-foreground/60"
                )}
              />
              <div className="flex justify-end">
                <span className={cn(
                  "text-xs",
                  wordCount < 20 ? "text-destructive" : "text-muted-foreground"
                )}>
                  {wordCount} λέξεις {wordCount < 20 && "(προτείνονται τουλάχιστον 20 για καλύτερη κατανόηση)"}
                </span>
              </div>
            </motion.div>
          </Card>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <Lightbulb size={20} />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-medium text-base">
                    Χρήσιμες πληροφορίες που μπορείτε να αναφέρετε
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Κάντε κλικ σε οποιοδήποτε παράδειγμα για να το προσθέσετε στην περιγραφή σας
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    title: "Βασικές πληροφορίες",
                    examples: [
                      "Το σπίτι μου είναι 25 ετών και θέλω να το ανακαινίσω",
                      "Έχω ένα οικόπεδο και θέλω να χτίσω ένα σπίτι",
                      "Θέλω να κάνω μια προσθήκη στο υπάρχον σπίτι μου"
                    ]
                  },
                  {
                    title: "Μεγέθη και χώροι",
                    examples: [
                      "Το διαμέρισμα είναι 85τμ με 2 υπνοδωμάτια και σαλόνι",
                      "Ο χώρος που θέλω να ανακαινίσω είναι η κουζίνα 12τμ",
                      "Έχω μπαλκόνι 20τμ και θέλω να το κλείσω"
                    ]
                  },
                  {
                    title: "Ειδικές ανάγκες",
                    examples: [
                      "Θέλω να εξοικονομώ ενέργεια με καλύτερη μόνωση",
                      "Χρειάζομαι πρόσβαση για αναπηρικό αμαξίδιο",
                      "Θέλω να αξιοποιήσω το φυσικό φως όσο γίνεται"
                    ]
                  },
                  {
                    title: "Προτιμήσεις & προϋπολογισμός",
                    examples: [
                      "Προτιμώ μοντέρνο στυλ με απλές γραμμές",
                      "Θέλω οικονομικές λύσεις χωρίς να θυσιάσω την ποιότητα",
                      "Με ενδιαφέρουν οικολογικά υλικά"
                    ]
                  }
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <h4 className="text-sm font-medium text-foreground/80">
                      {category.title}
                    </h4>
                    <div className="grid gap-2">
                      {category.examples.map((example, i) => (
                        <div 
                          key={i}
                          className="text-sm text-muted-foreground bg-muted/30 rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleInfoChange(localInfo ? `${localInfo}\n${example}` : example)}
                        >
                          {example}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <StepNavigation
          onContinue={handleSubmit}
          onBack={onBack}
          disabled={!localInfo.trim() || wordCount < 10}
        />
      </div>
    </StepContainer>
  )
} 