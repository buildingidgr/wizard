"use client"

import { Card } from "@/components/ui/card"

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-muted/10">
      <div className="container py-12 px-4 md:px-6 lg:px-8">
        <Card className="p-6 md:p-8 lg:p-10 shadow-lg">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 lg:mb-10">Πολιτική GDPR</h1>
            
            <div className="prose prose-slate lg:prose-lg max-w-none space-y-6 lg:space-y-8">
              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">1. Εισαγωγή</h2>
                <p className="text-base md:text-lg">
                  Η Mechlabs δεσμεύεται να προστατεύει τα προσωπικά δεδομένα των χρηστών της σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR) της ΕΕ 2016/679.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">2. Δεδομένα που Συλλέγουμε</h2>
                <p className="text-base md:text-lg">Συλλέγουμε και επεξεργαζόμαστε τα ακόλουθα προσωπικά δεδομένα:</p>
                <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
                  <li>Ονοματεπώνυμο</li>
                  <li>Διεύθυνση email</li>
                  <li>Αριθμό τηλεφώνου</li>
                  <li>Διεύθυνση του ακινήτου για το έργο</li>
                  <li>Λεπτομέρειες σχετικά με το έργο σας</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">3. Σκοπός Επεξεργασίας</h2>
                <p className="text-base md:text-lg">Επεξεργαζόμαστε τα δεδομένα σας για τους εξής σκοπούς:</p>
                <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
                  <li>Διασύνδεση με κατάλληλους επαγγελματίες μηχανικούς</li>
                  <li>Επικοινωνία σχετικά με το έργο σας</li>
                  <li>Επαλήθευση της ταυτότητάς σας</li>
                  <li>Βελτίωση των υπηρεσιών μας</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">4. Νομική Βάση</h2>
                <p className="text-base md:text-lg">Η επεξεργασία των δεδομένων σας βασίζεται στις εξής νομικές βάσεις:</p>
                <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
                  <li>Τη συγκατάθεσή σας</li>
                  <li>Την εκτέλεση της μεταξύ μας σύμβασης</li>
                  <li>Τις νομικές μας υποχρεώσεις</li>
                  <li>Το έννομο συμφέρον μας για τη λειτουργία και βελτίωση των υπηρεσιών μας</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">5. Τα Δικαιώματά σας</h2>
                <p className="text-base md:text-lg">Έχετε τα ακόλουθα δικαιώματα:</p>
                <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
                  <li>Πρόσβαση στα δεδομένα σας</li>
                  <li>Διόρθωση των δεδομένων σας</li>
                  <li>Διαγραφή των δεδομένων σας</li>
                  <li>Περιορισμό της επεξεργασίας</li>
                  <li>Φορητότητα των δεδομένων</li>
                  <li>Εναντίωση στην επεξεργασία</li>
                  <li>Ανάκληση της συγκατάθεσής σας</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">6. Ασφάλεια</h2>
                <p className="text-base md:text-lg">
                  Λαμβάνουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων από μη εξουσιοδοτημένη πρόσβαση, απώλεια ή καταστροφή.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">7. Επικοινωνία</h2>
                <p className="text-base md:text-lg">
                  Για οποιαδήποτε ερώτηση σχετικά με την επεξεργασία των προσωπικών σας δεδομένων ή για την άσκηση των δικαιωμάτων σας, μπορείτε να επικοινωνήσετε μαζί μας στο privacy@mechlabs.gr
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">8. Αλλαγές στην Πολιτική</h2>
                <p className="text-base md:text-lg">
                  Διατηρούμε το δικαίωμα να τροποποιήσουμε την παρούσα πολιτική. Οι αλλαγές θα ανακοινώνονται στην ιστοσελίδα μας και, όπου απαιτείται, θα ζητείται εκ νέου η συγκατάθεσή σας.
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 