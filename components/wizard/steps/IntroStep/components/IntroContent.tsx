// components/wizard/steps/IntroStep/components/IntroContent.tsx
"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ClipboardList, 
  MapPin, 
  FileText, 
  UserRound, 
  CheckCircle,
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

export const IntroFooter = ({ onAgreementChange }: { onAgreementChange: (checked: boolean) => void }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleCheckboxChange = (checked: boolean) => {
    setAgreed(checked)
    onAgreementChange(checked)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreed}
          onCheckedChange={handleCheckboxChange}
        />
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Συμφωνώ με τους{" "}
          <button 
            onClick={() => setIsTermsOpen(true)} 
            className="underline underline-offset-4 hover:text-primary"
          >
            Όρους Χρήσης
          </button>
          {" "}και την{" "}
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="underline underline-offset-4 hover:text-primary"
          >
            Πολιτική Απορρήτου
          </button>
        </label>
      </div>

      <Drawer open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Όροι Χρήσης</DrawerTitle>
          </DrawerHeader>
          <div className="p-6 space-y-6 text-muted-foreground max-h-[80vh] overflow-y-auto">
            <h3 className="font-semibold text-foreground text-lg">1. Γενικοί Όροι και Προϋποθέσεις</h3>
            <div className="space-y-2">
              <p>Καλωσήρθατε στην πλατφόρμα μας. Οι παρόντες όροι και προϋποθέσεις ("Όροι") διέπουν τη χρήση της πλατφόρμας και των υπηρεσιών μας. Διαβάστε προσεκτικά τους όρους πριν χρησιμοποιήσετε την πλατφόρμα μας.</p>
              <p>Χρησιμοποιώντας την υπηρεσία μας, δηλώνετε ότι έχετε διαβάσει, κατανοήσει και συμφωνείτε να δεσμεύεστε από τους παρόντες όρους.</p>
            </div>
            
            <h3 className="font-semibold text-foreground text-lg">2. Περιγραφή Υπηρεσιών</h3>
            <div className="space-y-2">
              <p>2.1. Η πλατφόρμα μας λειτουργεί ως διαδικτυακή υπηρεσία διασύνδεσης μεταξύ πελατών και επαγγελματιών μηχανικών.</p>
              <p>2.2. Παρέχουμε ένα ψηφιακό περιβάλλον όπου οι πελάτες μπορούν να:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Δημοσιεύσουν λεπτομέρειες των έργων τους</li>
                <li>Συνδεθούν με πιστοποιημένους επαγγελματίες μηχανικούς</li>
                <li>Διαχειριστούν την επικοινωνία τους με τους επαγγελματίες</li>
              </ul>
              <p>2.3. Δεν εγγυόμαστε την ολοκλήρωση οποιασδήποτε συμφωνίας μεταξύ των μερών ούτε εμπλεκόμαστε στις συμβατικές σχέσεις μεταξύ χρηστών και επαγγελματιών.</p>
            </div>
            
            <h3 className="font-semibold text-foreground text-lg">3. Ευθύνες και Υποχρεώσεις Χρήστη</h3>
            <div className="space-y-2">
              <p>3.1. Ως χρήστης της πλατφόρμας, είστε υπεύθυνοι για:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Την ακρίβεια και πληρότητα των πληροφοριών που παρέχετε</li>
                <li>Την ασφάλεια των διαπιστευτηρίων του λογαριασμού σας</li>
                <li>Κάθε δραστηριότητα που πραγματοποιείται μέσω του λογαριασμού σας</li>
                <li>Τη συμμόρφωση με όλους τους ισχύοντες νόμους και κανονισμούς</li>
              </ul>
              <p>3.2. Απαγορεύεται ρητά:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Η παροχή ψευδών ή παραπλανητικών πληροφοριών</li>
                <li>Η χρήση της πλατφόρμας για παράνομους σκοπούς</li>
                <li>Η παρενόχληση άλλων χρηστών ή επαγγελματιών</li>
              </ul>
            </div>
            
            <h3 className="font-semibold text-foreground text-lg">4. Περιορισμός Ευθύνης</h3>
            <div className="space-y-2">
              <p>4.1. Η πλατφόρμα μας παρέχεται "ως έχει" και "ως διαθέσιμη" χωρίς εγγυήσεις οποιουδήποτε είδους.</p>
              <p>4.2. Δεν φέρουμε ευθύνη για:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Οποιαδήποτε άμεση, έμμεση ή επακόλουθη ζημία</li>
                <li>Την ποιότητα των υπηρεσιών που παρέχονται από τους επαγγελματίες</li>
                <li>Διαφωνίες ή διαφορές μεταξύ χρηστών και επαγγελματιών</li>
                <li>Τεχνικές δυσλειτουργίες ή διακοπές της υπηρεσίας</li>
              </ul>
            </div>

            <h3 className="font-semibold text-foreground text-lg">5. Πνευματική Ιδιοκτησία</h3>
            <div className="space-y-2">
              <p>5.1. Όλο το περιεχόμενο της πλατφόρμας (συμπεριλαμβανομένων κειμένων, γραφικών, λογοτύπων) αποτελεί πνευματική ιδιοκτησία της εταιρείας μας.</p>
              <p>5.2. Απαγορεύεται η αναπαραγωγή, διανομή ή τροποποίηση του περιεχομένου χωρίς την έγγραφη άδειά μας.</p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Πολιτική Απορρήτου</DrawerTitle>
          </DrawerHeader>
          <div className="p-6 space-y-6 text-muted-foreground max-h-[80vh] overflow-y-auto">
            <h3 className="font-semibold text-foreground text-lg">1. Συλλογή και Επεξεργασία Δεδομένων</h3>
            <div className="space-y-2">
              <p>1.1. Συλλέγουμε και επεξεργαζόμαστε τα ακόλουθα προσωπικά δεδομένα:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Στοιχεία ταυτότητας (ονοματεπώνυμο)</li>
                <li>Στοιχεία επικοινωνίας (email, τηλέφωνο)</li>
                <li>Διεύθυνση και τοποθεσία έργου</li>
                <li>Πληροφορίες σχετικά με τα έργα και τις απαιτήσεις σας</li>
                <li>Δεδομένα περιήγησης και χρήσης της πλατφόρμας</li>
              </ul>
            </div>
            
            <h3 className="font-semibold text-foreground text-lg">2. Σκοπός και Νομική Βάση Επεξεργασίας</h3>
            <div className="space-y-2">
              <p>2.1. Επεξεργαζόμαστε τα δεδομένα σας για τους εξής σκοπούς:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Παροχή των υπηρεσιών της πλατφόρμας</li>
                <li>Διασύνδεση με κατάλληλους επαγγελματίες</li>
                <li>Επικοινωνία σχετικά με τα έργα σας</li>
                <li>Βελτίωση των υπηρεσιών μας</li>
                <li>Συμμόρφωση με νομικές υποχρεώσεις</li>
              </ul>
              <p>2.2. Η επεξεργασία βασίζεται στις ακόλουθες νομικές βάσεις:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Εκτέλεση σύμβασης</li>
                <li>Έννομο συμφέρον</li>
                <li>Συγκατάθεση (όπου απαιτείται)</li>
              </ul>
            </div>
            
            <h3 className="font-semibold text-foreground text-lg">3. Προστασία και Ασφάλεια Δεδομένων</h3>
            <div className="space-y-2">
              <p>3.1. Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων σας:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Κρυπτογράφηση δεδομένων</li>
                <li>Ασφαλή συστήματα αποθήκευσης</li>
                <li>Περιορισμένη πρόσβαση προσωπικού</li>
                <li>Τακτικούς ελέγχους ασφαλείας</li>
              </ul>
              <p>3.2. Συμμορφωνόμαστε πλήρως με τον GDPR και την ελληνική νομοθεσία περί προστασίας δεδομένων.</p>
            </div>
            
            <h3 className="font-semibold text-foreground text-lg">4. Δικαιώματα Χρηστών</h3>
            <div className="space-y-2">
              <p>4.1. Έχετε τα ακόλουθα δικαιώματα σχετικά με τα προσωπικά σας δεδομένα:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Δικαίωμα πρόσβασης στα δεδομένα σας</li>
                <li>Δικαίωμα διόρθωσης ανακριβών δεδομένων</li>
                <li>Δικαίωμα διαγραφής ("δικαίωμα στη λήθη")</li>
                <li>Δικαίωμα περιορισμού της επεξεργασίας</li>
                <li>Δικαίωμα φορητότητας των δεδομένων</li>
                <li>Δικαίωμα εναντίωσης στην επεξεργασία</li>
              </ul>
              <p>4.2. Μπορείτε να ασκήσετε τα δικαιώματά σας επικοινωνώντας μαζί μας στο [email επικοινωνίας].</p>
            </div>

            <h3 className="font-semibold text-foreground text-lg">5. Διατήρηση και Διαγραφή Δεδομένων</h3>
            <div className="space-y-2">
              <p>5.1. Διατηρούμε τα προσωπικά σας δεδομένα για όσο χρονικό διάστημα είναι απαραίτητο για την εκπλήρωση των σκοπών επεξεργασίας.</p>
              <p>5.2. Μετά την ολοκλήρωση του σκοπού επεξεργασίας, τα δεδομένα σας διαγράφονται με ασφαλή τρόπο.</p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}