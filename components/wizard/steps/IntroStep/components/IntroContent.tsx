// components/wizard/steps/IntroStep/components/IntroContent.tsx
"use client"

import { Card } from "@/components/ui/card"
import { 
  ArrowRight,
  Users,
  Calendar,
  MessageCircle
} from "lucide-react"

export const IntroContent = () => (
  <div className="max-w-3xl mx-auto space-y-8 px-4">
    <div className="text-center space-y-3">
      <h1 className="text-4xl font-bold tracking-tight">Καταχώρηση έργου</h1>
      <p className="text-lg text-muted-foreground">
        Συμπληρώστε τη φόρμα για να συνδεθείτε με εξειδικευμένους μηχανικούς
      </p>
    </div>

    <div className="grid gap-6">
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-4">Πώς λειτουργεί</h2>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Πώς λειτουργεί;</h2>
          <p>
            Η διαδικασία είναι απλή και γρήγορη. Μέσα από 5 απλά βήματα θα μας πείτε τι χρειάζεστε και εμείς θα σας φέρουμε σε επαφή με τους κατάλληλους επαγγελματίες. Συγκεκριμένα θα χρειαστεί να μας πείτε:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Τι είδους εργασία θέλετε να κάνετε</li>
            <li>Πού βρίσκεται το ακίνητο</li>
            <li>Περισσότερες λεπτομέρειες για το έργο</li>
            <li>Τα στοιχεία επικοινωνίας σας</li>
          </ul>
          <p>
            Στη συνέχεια, θα επιβεβαιώσουμε τα στοιχεία σας και θα σας στείλουμε προσφορές από επαγγελματίες που ταιριάζουν με τις ανάγκες σας.
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 hover:shadow-lg transition-shadow border-none">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>Τι συμβαίνει μετά</span>
          <ArrowRight className="text-primary" size={20} />
        </h2>
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white text-primary shrink-0">
              <Users size={20} />
            </div>
            <p className="text-muted-foreground">
              Το έργο σας θα είναι διαθέσιμο στο δίκτυο εξειδικευμένων μηχανικών μας
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white text-primary shrink-0">
              <MessageCircle size={20} />
            </div>
            <p className="text-muted-foreground">
              Οι μηχανικοί θα δουν τις λεπτομέρειες και θα επικοινωνήσουν μαζί σας
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white text-primary shrink-0">
              <Calendar size={20} />
            </div>
            <p className="text-muted-foreground">
              Θα συζητήσετε τις λεπτομέρειες και θα κανονίσετε μια συνάντηση
            </p>
          </div>
        </div>
      </Card>
    </div>

    <p className="text-sm text-muted-foreground">
      Κάνοντας κλικ στο κουμπί &quot;Συνέχεια&quot;, συμφωνείτε αυτόματα με τους όρους χρήσης.
    </p>

    <p className="text-sm text-muted-foreground">
      Το &quot;Wizard&quot; είναι ένα &quot;step-by-step&quot; εργαλείο που σας βοηθά να καταχωρήσετε το έργο σας.
    </p>

    <p className="text-sm text-muted-foreground">
      Πατήστε &quot;Συνέχεια&quot; για να ξεκινήσετε.
    </p>
  </div>
)