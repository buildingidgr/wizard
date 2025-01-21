"use client"

import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-muted/10">
      <div className="container py-12 px-4 md:px-6 lg:px-8">
        <Card className="p-6 md:p-8 lg:p-10 shadow-lg">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 lg:mb-10">Πολιτική Απορρήτου</h1>
            
            <div className="prose prose-slate lg:prose-lg max-w-none space-y-6 lg:space-y-8">
              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">1. Εισαγωγή</h2>
                <p className="text-base md:text-lg">
                  Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο η Mechlabs συλλέγει, χρησιμοποιεί και προστατεύει τις πληροφορίες που μας παρέχετε κατά τη χρήση της πλατφόρμας μας.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">2. Συλλογή Πληροφοριών</h2>
                <p className="text-base md:text-lg">Συλλέγουμε τις ακόλουθες πληροφορίες:</p>
                <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
                  <li>Προσωπικά στοιχεία (ονοματεπώνυμο, email, τηλέφωνο)</li>
                  <li>Στοιχεία του έργου σας</li>
                  <li>Τοποθεσία του ακινήτου</li>
                  <li>Πληροφορίες που παρέχετε μέσω της επικοινωνίας μαζί μας</li>
                  <li>Τεχνικές πληροφορίες για τη χρήση της πλατφόρμας</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">3. Χρήση των Πληροφοριών</h2>
                <p className="text-base md:text-lg">Χρησιμοποιούμε τις πληροφορίες σας για:</p>
                <ul className="list-disc pl-6 md:pl-8 space-y-2 text-base md:text-lg">
                  <li>Την παροχή των υπηρεσιών μας</li>
                  <li>Τη διασύνδεσή σας με επαγγελματίες μηχανικούς</li>
                  <li>Την επικοινωνία μαζί σας σχετικά με το έργο σας</li>
                  <li>Τη βελτίωση της πλατφόρμας μας</li>
                  <li>Την ασφάλεια των συναλλαγών</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6">4. Προστασία των Πληροφοριών</h2>
                <p className="text-base md:text-lg">
                  Δεσμευόμαστε να προστατεύουμε τις πληροφορίες σας. Εφαρμόζουμε κατάλληλα μέτρα ασφαλείας για την προστασία των δεδομένων σας από μη εξουσιοδοτημένη πρόσβαση, αλλοίωση ή αποκάλυψη.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Κοινοποίηση Πληροφοριών</h2>
                <p>Μοιραζόμαστε τις πληροφορίες σας μόνο με:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Επαγγελματίες μηχανικούς που έχουν εγγραφεί στην πλατφόρμα μας</li>
                  <li>Παρόχους υπηρεσιών που μας βοηθούν στη λειτουργία της πλατφόρμας</li>
                  <li>Αρχές όπου απαιτείται από το νόμο</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Cookies και Τεχνολογίες Παρακολούθησης</h2>
                <p>
                  Χρησιμοποιούμε cookies και παρόμοιες τεχνολογίες για τη βελτίωση της εμπειρίας σας στην πλατφόρμα μας. Μπορείτε να ελέγξετε τη χρήση των cookies μέσω των ρυθμίσεων του προγράμματος περιήγησής σας.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Τα Δικαιώματά σας</h2>
                <p>Έχετε το δικαίωμα να:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ζητήσετε πρόσβαση στις πληροφορίες σας</li>
                  <li>Διορθώσετε ή ενημερώσετε τις πληροφορίες σας</li>
                  <li>Ζητήσετε τη διαγραφή των πληροφοριών σας</li>
                  <li>Εναντιωθείτε στην επεξεργασία των πληροφοριών σας</li>
                  <li>Ζητήσετε περιορισμό της επεξεργασίας</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Επικοινωνία</h2>
                <p>
                  Για οποιαδήποτε ερώτηση σχετικά με την πολιτική απορρήτου μας ή τον τρόπο που χειριζόμαστε τις πληροφορίες σας, επικοινωνήστε μαζί μας στο privacy@mechlabs.gr
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Αλλαγές στην Πολιτική Απορρήτου</h2>
                <p>
                  Ενδέχεται να ενημερώνουμε περιοδικά αυτήν την πολιτική. Οι αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα και, όπου κρίνεται απαραίτητο, θα σας ενημερώνουμε μέσω email.
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 