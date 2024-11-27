import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ReviewSubmit({ projectData }) {
  const formatKey = (key: string) => {
    return key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <ul className="list-disc list-inside">
          {Object.entries(value).map(([subKey, subValue]) => (
            <li key={subKey}>
              <span className="font-medium">{formatKey(subKey)}:</span> {renderValue(subValue)}
            </li>
          ))}
        </ul>
      )
    }
    return String(value)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Review Your Project Details</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <ScrollArea className="flex-1 h-[60vh]">
          <div className="space-y-6 pr-4">
            {Object.entries(projectData).map(([key, value]) => (
              <div key={key} className="border-b pb-4">
                <h3 className="font-medium text-lg">{formatKey(key)}</h3>
                <div className="text-muted-foreground">{renderValue(value)}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex-1 flex items-center justify-center">
          <Image src="/placeholder.svg?height=300&width=300" alt="Review and Submit Illustration" width={300} height={300} className="rounded-lg" />
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Please review all the information above carefully. If everything looks correct, click "Submit" to send your project details to our team of civil engineers. If you need to make any changes, use the "Previous" button to navigate back to the relevant sections.
      </p>
    </div>
  )
}

