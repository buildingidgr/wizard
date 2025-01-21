"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface PolicyDrawerProps {
  type: "privacy" | "gdpr"
  trigger?: React.ReactNode
}

export function PolicyDrawer({ type, trigger }: PolicyDrawerProps) {
  const title = type === "privacy" ? "Πολιτική Απορρήτου" : "Πολιτική GDPR"

  const renderContent = () => {
    if (type === "privacy") {
      return (
        <div className="prose prose-slate lg:prose-lg max-w-none space-y-6 lg:space-y-8 p-6">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">1. Εισαγωγή</h2>
            <p className="text-base md:text-lg">
              Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο η Mechlabs συλλέγει, χρησιμοποιεί και προστατεύει τις πληροφορίες που μας παρέχετε κατά τη χρήση της πλατφόρμας μας. Η προστασία των προσωπικών σας δεδομένων είναι πρωταρχικής σημασίας για εμάς.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">2. Συλλογή Πληροφοριών</h2>
            <p className="text-base md:text-lg">Συλλέγουμε τις ακόλουθες πληροφορίες:</p>
            <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
              <li>Προσωπικά στοιχεία (ονοματεπώνυμο, email, τηλέφωνο)</li>
              <li>Στοιχεία του έργου σας (τύπος έργου, προϋπολογισμός, χρονοδιάγραμμα)</li>
              <li>Τοποθεσία του ακινήτου (διεύθυνση, περιοχή)</li>
              <li>Πληροφορίες που παρέχετε μέσω της επικοινωνίας μαζί μας</li>
              <li>Τεχνικές πληροφορίες για τη χρήση της πλατφόρμας (cookies, στοιχεία συσκευής)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">3. Χρήση των Πληροφοριών</h2>
            <p className="text-base md:text-lg">Χρησιμοποιούμε τις πληροφορίες σας για:</p>
            <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
              <li>Την παροχή των υπηρεσιών μας και τη διαχείριση του λογαριασμού σας</li>
              <li>Τη διασύνδεσή σας με κατάλληλους επαγγελματίες μηχανικούς βάσει των αναγκών σας</li>
              <li>Την επικοινωνία μαζί σας σχετικά με το έργο και τις υπηρεσίες μας</li>
              <li>Τη βελτίωση της πλατφόρμας και των υπηρεσιών μας</li>
              <li>Την ασφάλεια των συναλλαγών και την πρόληψη απάτης</li>
              <li>Τη συμμόρφωση με τις νομικές μας υποχρεώσεις</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">4. Προστασία των Πληροφοριών</h2>
            <p className="text-base md:text-lg">
              Εφαρμόζουμε αυστηρά μέτρα ασφαλείας για την προστασία των δεδομένων σας:
            </p>
            <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
              <li>Κρυπτογράφηση δεδομένων κατά τη μεταφορά και αποθήκευση</li>
              <li>Περιορισμένη πρόσβαση σε προσωπικά δεδομένα μόνο σε εξουσιοδοτημένο προσωπικό</li>
              <li>Τακτικοί έλεγχοι ασφαλείας και ενημερώσεις συστημάτων</li>
              <li>Συνεργασία με αξιόπιστους παρόχους υπηρεσιών</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">5. Τα Δικαιώματά σας</h2>
            <p className="text-base md:text-lg">
              Έχετε το δικαίωμα να:
            </p>
            <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
              <li>Ζητήσετε πρόσβαση στα προσωπικά σας δεδομένα</li>
              <li>Διορθώσετε ανακριβή δεδομένα</li>
              <li>Ζητήσετε τη διαγραφή των δεδομένων σας</li>
              <li>Περιορίσετε την επεξεργασία των δεδομένων σας</li>
              <li>Λάβετε τα δεδομένα σας σε δομημένη μορφή</li>
            </ul>
          </section>
        </div>
      )
    }

    return (
      <div className="prose prose-slate lg:prose-lg max-w-none space-y-6 lg:space-y-8 p-6">
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">1. Εισαγωγή</h2>
          <p className="text-base md:text-lg">
            Η Mechlabs δεσμεύεται να προστατεύει τα προσωπικά δεδομένα των χρηστών της σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR) της ΕΕ 2016/679. Η παρούσα πολιτική περιγράφει τις υποχρεώσεις μας και τα δικαιώματά σας σύμφωνα με τον κανονισμό.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">2. Αρχές Επεξεργασίας</h2>
          <p className="text-base md:text-lg">Επεξεργαζόμαστε τα προσωπικά δεδομένα σύμφωνα με τις ακόλουθες αρχές:</p>
          <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
            <li>Νομιμότητα, διαφάνεια και δικαιοσύνη</li>
            <li>Περιορισμός του σκοπού</li>
            <li>Ελαχιστοποίηση των δεδομένων</li>
            <li>Ακρίβεια</li>
            <li>Περιορισμός της περιόδου αποθήκευσης</li>
            <li>Ακεραιότητα και εμπιστευτικότητα</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">3. Δεδομένα που Συλλέγουμε</h2>
          <p className="text-base md:text-lg">Συλλέγουμε και επεξεργαζόμαστε τα ακόλουθα προσωπικά δεδομένα:</p>
          <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
            <li>Ονοματεπώνυμο για την ταυτοποίησή σας</li>
            <li>Διεύθυνση email για την επικοινωνία</li>
            <li>Αριθμό τηλεφώνου για άμεση επικοινωνία</li>
            <li>Διεύθυνση του ακινήτου για το έργο</li>
            <li>Λεπτομέρειες σχετικά με το έργο σας</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">4. Νομική Βάση</h2>
          <p className="text-base md:text-lg">Η επεξεργασία των δεδομένων σας βασίζεται στις εξής νομικές βάσεις:</p>
          <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
            <li>Τη συγκατάθεσή σας για την επεξεργασία των δεδομένων σας</li>
            <li>Την εκτέλεση της μεταξύ μας σύμβασης παροχής υπηρεσιών</li>
            <li>Τις νομικές μας υποχρεώσεις βάσει της ισχύουσας νομοθεσίας</li>
            <li>Το έννομο συμφέρον μας για τη βελτίωση των υπηρεσιών</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">5. Διεθνείς Μεταφορές</h2>
          <p className="text-base md:text-lg">
            Τα δεδομένα σας αποθηκεύονται και υποβάλλονται σε επεξεργασία εντός της Ευρωπαϊκής Ένωσης. Σε περίπτωση που απαιτείται μεταφορά δεδομένων εκτός ΕΕ, διασφαλίζουμε ότι παρέχονται επαρκείς εγγυήσεις προστασίας σύμφωνα με το GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">6. Ασφάλεια Δεδομένων</h2>
          <p className="text-base md:text-lg">
            Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων, συμπεριλαμβανομένων:
          </p>
          <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
            <li>Κρυπτογράφησης δεδομένων</li>
            <li>Ελέγχων πρόσβασης</li>
            <li>Τακτικών αξιολογήσεων ασφαλείας</li>
            <li>Εκπαίδευσης προσωπικού</li>
          </ul>
        </section>
      </div>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {trigger || (
          <Button variant="link" className="p-0 h-auto font-normal hover:no-underline">
            {title}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-y-auto">
        <DrawerHeader className="border-b px-6 py-4 sticky top-0 bg-background z-10">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerClose asChild>
            <div className="absolute right-4 top-4">
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DrawerClose>
        </DrawerHeader>
        {renderContent()}
      </DrawerContent>
    </Drawer>
  )
} 