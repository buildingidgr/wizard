import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const projectId = searchParams.id as string
  const status = searchParams.status as string
  const interestedEngineers = parseInt(searchParams.interested as string) || 0

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Thank You for Submitting Your Project!</CardTitle>
          <CardDescription>Your project has been successfully received.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Project ID:</p>
            <p>{projectId}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <Badge variant={status === 'pending' ? 'secondary' : 'default'}>{status}</Badge>
          </div>
          <div>
            <p className="font-semibold">Engineer Interest:</p>
            <p>{interestedEngineers} engineer{interestedEngineers !== 1 ? 's' : ''} found this project interesting</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            We will review your project details and get back to you soon. You can use your Project ID to check the status of your project in the future.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

