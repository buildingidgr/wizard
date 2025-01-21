"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
        <div className="space-y-6">
          <section>
            <h3 className="font-semibold mb-2">1. Εισαγωγή</h3>
            <p className="text-muted-foreground">
              Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο η Mechlabs συλλέγει, χρησιμοποιεί και προστατεύει τις πληροφορίες που μας παρέχετε κατά τη χρήση της πλατφόρμας μας. Η προστασία των προσωπικών σας δεδομένων είναι πρωταρχικής σημασίας για εμάς.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">2. Συλλογή Πληροφοριών</h3>
            <p className="text-muted-foreground mb-2">Συλλέγουμε τις ακόλουθες πληροφορίες:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Προσωπικά στοιχεία (ονοματεπώνυμο, email, τηλέφωνο)</li>
              <li>Στοιχεία του έργου σας (τύπος έργου, προϋπολογισμός, χρονοδιάγραμμα)</li>
              <li>Τοποθεσία του ακινήτου (διεύθυνση, περιοχή)</li>
              <li>Πληροφορίες που παρέχετε μέσω της επικοινωνίας μαζί μας</li>
              <li>Τεχνικές πληροφορίες για τη χρήση της πλατφόρμας</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">3. Χρήση των Πληροφοριών</h3>
            <p className="text-muted-foreground mb-2">Χρησιμοποιούμε τις πληροφορίες σας για:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Την παροχή των υπηρεσιών μας και τη διαχείριση του λογαριασμού σας</li>
              <li>Τη διασύνδεσή σας με κατάλληλους επαγγελματίες μηχανικούς</li>
              <li>Την επικοινωνία μαζί σας σχετικά με το έργο σας</li>
              <li>Τη βελτίωση της πλατφόρμας μας</li>
              <li>Την ασφάλεια των συναλλαγών</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">4. Προστασία των Πληροφοριών</h3>
            <p className="text-muted-foreground">
              Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων από μη εξουσιοδοτημένη πρόσβαση, απώλεια ή καταστροφή.
            </p>
          </section>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <section>
          <h3 className="font-semibold mb-2">1. Εισαγωγή</h3>
          <p className="text-muted-foreground">
            Η Mechlabs δεσμεύεται να προστατεύει τα προσωπικά δεδομένα των χρηστών της σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR) της ΕΕ 2016/679.
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">2. Αρχές Επεξεργασίας</h3>
          <p className="text-muted-foreground mb-2">Επεξεργαζόμαστε τα προσωπικά δεδομένα σύμφωνα με τις ακόλουθες αρχές:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Νομιμότητα, διαφάνεια και δικαιοσύνη</li>
            <li>Περιορισμός του σκοπού</li>
            <li>Ελαχιστοποίηση των δεδομένων</li>
            <li>Ακρίβεια</li>
            <li>Περιορισμός της περιόδου αποθήκευσης</li>
            <li>Ακεραιότητα και εμπιστευτικότητα</li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">3. Νομική Βάση</h3>
          <p className="text-muted-foreground mb-2">Η επεξεργασία των δεδομένων σας βασίζεται στις εξής νομικές βάσεις:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Τη συγκατάθεσή σας</li>
            <li>Την εκτέλεση της μεταξύ μας σύμβασης</li>
            <li>Τις νομικές μας υποχρεώσεις</li>
            <li>Το έννομο συμφέρον μας</li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">4. Τα Δικαιώματά σας</h3>
          <p className="text-muted-foreground mb-2">Έχετε τα ακόλουθα δικαιώματα:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Πρόσβαση στα δεδομένα σας</li>
            <li>Διόρθωση των δεδομένων σας</li>
            <li>Διαγραφή των δεδομένων σας</li>
            <li>Περιορισμό της επεξεργασίας</li>
            <li>Φορητότητα των δεδομένων</li>
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            Διαβάστε προσεκτικά τους όρους και τις προϋποθέσεις.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          {renderContent()}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Κλείσιμο</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 