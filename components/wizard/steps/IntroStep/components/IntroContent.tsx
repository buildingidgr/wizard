// components/wizard/steps/IntroStep/components/IntroContent.tsx
"use client"

import { Card } from "@/components/ui/card"
import { 
  ArrowRight,
  Users,
  Calendar,
  MessageCircle,
  CircleDot
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { PolicyDrawer } from "@/components/shared/PolicyDrawer"

interface IntroFooterProps {
  onAgreementChange: (agreed: boolean) => void
}

export const IntroFooter = ({ onAgreementChange }: IntroFooterProps) => (
  <div className="flex items-start gap-2">
    <Checkbox
      id="terms"
      onCheckedChange={(checked) => onAgreementChange(checked as boolean)}
    />
    <label
      htmlFor="terms"
      className="text-sm text-muted-foreground leading-relaxed"
    >
      Διάβασα και αποδέχομαι την <PolicyDrawer type="privacy" /> και συναινώ στην επεξεργασία των προσωπικών μου δεδομένων σύμφωνα με τον <PolicyDrawer type="gdpr" />.
    </label>
  </div>
)

export const IntroContent = () => (
  <div className="space-y-4 sm:space-y-6">
    {/* Header */}
    <div className="text-center space-y-2 sm:space-y-3 pb-2">
      <h1 className="text-xl sm:text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
        Καταχώρηση έργου
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto px-4 sm:px-0">
        Συμπληρώστε τη φόρμα για να συνδεθείτε με εξειδικευμένους μηχανικούς
      </p>
    </div>

    {/* Steps */}
    <Card className="p-5 sm:p-6 hover:shadow-lg transition-shadow border-none bg-gradient-to-b from-background to-primary/5">
      <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
        <span>Πώς λειτουργεί</span>
        <span className="text-[10px] sm:text-xs text-muted-foreground font-normal">4 απλά βήματα</span>
      </h2>
      <div className="space-y-5 sm:space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <CircleDot size={18} />
          </div>
          <div>
            <p className="font-medium mb-1 flex items-center gap-2">
              Επιλέξτε κατηγορία
              <span className="text-xs text-muted-foreground font-normal">Βήμα 1</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Διαλέξτε το είδος της εργασίας που θέλετε να κάνετε
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <CircleDot size={18} />
          </div>
          <div>
            <p className="font-medium mb-1 flex items-center gap-2">
              Προσθέστε τοποθεσία
              <span className="text-xs text-muted-foreground font-normal">Βήμα 2</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Υποδείξτε πού βρίσκεται το ακίνητο
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <CircleDot size={18} />
          </div>
          <div>
            <p className="font-medium mb-1 flex items-center gap-2">
              Περιγράψτε το έργο
              <span className="text-xs text-muted-foreground font-normal">Βήμα 3</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Δώστε μας περισσότερες λεπτομέρειες για το έργο σας
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <CircleDot size={18} />
          </div>
          <div>
            <p className="font-medium mb-1 flex items-center gap-2">
              Προσθέστε στοιχεία επικοινωνίας
              <span className="text-xs text-muted-foreground font-normal">Βήμα 4</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Συμπληρώστε τα στοιχεία σας για να επικοινωνήσουν μαζί σας
            </p>
          </div>
        </div>
      </div>
    </Card>

    {/* What happens next */}
    <Card className="p-5 sm:p-6 hover:shadow-lg transition-shadow border-none bg-gradient-to-b from-primary/5 to-primary/10">
      <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
        <span>Τι συμβαίνει μετά</span>
        <ArrowRight className="text-primary" size={18} />
      </h2>
      <div className="space-y-5 sm:space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-background text-primary shrink-0">
            <Users size={18} />
          </div>
          <div>
            <p className="font-medium mb-1">Δημοσίευση έργου</p>
            <p className="text-sm text-muted-foreground">
              Το έργο σας θα είναι διαθέσιμο στο δίκτυο εξειδικευμένων μηχανικών μας
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-background text-primary shrink-0">
            <MessageCircle size={18} />
          </div>
          <div>
            <p className="font-medium mb-1">Επικοινωνία</p>
            <p className="text-sm text-muted-foreground">
              Οι ενδιαφερόμενοι μηχανικοί θα επικοινωνήσουν μαζί σας
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-background text-primary shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <p className="font-medium mb-1">Επιλογή μηχανικού</p>
            <p className="text-sm text-muted-foreground">
              Επιλέξτε τον καταλληλότερο μηχανικό για το έργο σας
            </p>
          </div>
        </div>
      </div>
    </Card>

    {/* Footer text */}
    <div className="space-y-3 sm:space-y-2 text-[11px] sm:text-xs text-muted-foreground border-t pt-4 px-1 sm:px-0">
      <p>
        Η πλατφόρμα μας λειτουργεί ως μέσο διασύνδεσης μεταξύ ιδιοκτητών ακινήτων και επαγγελματιών μηχανικών. Δεν παρέχουμε τεχνικές υπηρεσίες και δεν φέρουμε ευθύνη για τις υπηρεσίες που παρέχονται από τους μηχανικούς.
      </p>
      <p>
        Τα προσωπικά σας δεδομένα προστατεύονται και χρησιμοποιούνται αποκλειστικά για τους σκοπούς της υπηρεσίας μας, σύμφωνα με την πολιτική απορρήτου μας.
      </p>
    </div>
  </div>
)