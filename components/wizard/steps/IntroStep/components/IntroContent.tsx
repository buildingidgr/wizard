// components/wizard/steps/IntroStep/components/IntroContent.tsx
"use client"

import { Card } from "@/components/ui/card"
import { 
  ArrowRight,
  Users,
  Calendar,
  MessageCircle
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
  <div className="max-w-4xl mx-auto space-y-8 px-4">
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Καταχώρηση έργου</h1>
      <p className="text-sm text-muted-foreground">
        Συμπληρώστε τη φόρμα για να συνδεθείτε με εξειδικευμένους μηχανικούς
      </p>
    </div>

    <div className="grid gap-6">
      <Card className="p-6 hover:shadow-lg transition-shadow border-none">
        <h2 className="text-base font-semibold mb-3">Πώς λειτουργεί</h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Η διαδικασία είναι απλή και γρήγορη. Μέσα από 5 απλά βήματα θα μας πείτε τι χρειάζεστε και θα σας φέρουμε σε επαφή με τους κατάλληλους επαγγελματίες. Συγκεκριμένα θα χρειαστεί να μας πείτε:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Τι είδους εργασία θέλετε να κάνετε</li>
            <li>Πού βρίσκεται το ακίνητο</li>
            <li>Περισσότερες λεπτομέρειες για το έργο</li>
            <li>Τα στοιχεία επικοινωνίας σας</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Στη συνέχεια, θα επιβεβαιώσουμε τα στοιχεία σας και θα δημοσιεύσουμε το έργο σας στο δίκτυο των συνεργαζόμενων μηχανικών μας.
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 hover:shadow-lg transition-shadow border-none">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <span>Τι συμβαίνει μετά</span>
          <ArrowRight className="text-primary" size={16} />
        </h2>
        <div className="grid gap-3">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-card text-primary shrink-0">
              <Users size={16} />
            </div>
            <p className="text-sm text-muted-foreground">
              Το έργο σας θα είναι διαθέσιμο στο δίκτυο εξειδικευμένων μηχανικών μας
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-card text-primary shrink-0">
              <MessageCircle size={16} />
            </div>
            <p className="text-sm text-muted-foreground">
              Οι ενδιαφερόμενοι μηχανικοί θα επικοινωνήσουν μαζί σας για να συζητήσετε τις λεπτομέρειες του έργου
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-card text-primary shrink-0">
              <Calendar size={16} />
            </div>
            <p className="text-sm text-muted-foreground">
              Θα μπορείτε να συζητήσετε απευθείας με τους μηχανικούς και να επιλέξετε τον καταλληλότερο για το έργο σας
            </p>
          </div>
        </div>
      </Card>
    </div>

    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Η πλατφόρμα μας λειτουργεί ως μέσο διασύνδεσης μεταξύ ιδιοκτητών ακινήτων και επαγγελματιών μηχανικών. Δεν παρέχουμε τεχνικές υπηρεσίες και δεν φέρουμε ευθύνη για τις υπηρεσίες που παρέχονται από τους μηχανικούς.
      </p>

      <p className="text-xs text-muted-foreground">
        Τα προσωπικά σας δεδομένα προστατεύονται και χρησιμοποιούνται αποκλειστικά για τους σκοπούς της υπηρεσίας μας, σύμφωνα με την πολιτική απορρήτου μας.
      </p>
    </div>
  </div>
)