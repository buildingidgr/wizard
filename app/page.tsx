import { ProjectSubmissionForm } from "@/components/project-submission-form"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Civil Engineering Project Submission</h1>
      <ProjectSubmissionForm />
    </main>
  )
}

