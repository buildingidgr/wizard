import { ProgressIndicator } from '@/components/progress-indicator'

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">MechHub Project Wizard</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <ProgressIndicator currentStep={1} totalSteps={7} />
        <div className="mt-8">{children}</div>
      </main>
    </div>
  )
}

