import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const projectId = searchParams.id as string
  const status = searchParams.status as string
  const interestedEngineers = searchParams.interested as string

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
          <CardDescription>Your project has been submitted successfully.</CardDescription>
        </CardHeader>
        <div className="p-6">
          <p className="mb-4"><strong>Project ID:</strong> {projectId}</p>
          <p className="mb-4"><strong>Status:</strong> {status}</p>
          <p className="mb-4"><strong>Engineers Interested:</strong> {interestedEngineers}</p>
          <p className="mb-6">We will review your project and get back to you soon.</p>
          <Link href={`/project-status/${projectId}`} passHref>
            <Button className="w-full">View Project Status</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

