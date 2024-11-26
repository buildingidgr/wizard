import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export function BudgetTimeline({ updateProjectData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Budget and Timeline</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor="budget">Estimated Budget Range</Label>
            <Select onValueChange={(value) => updateProjectData({ budgetRange: value })}>
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select a budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under50k">Under $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                <SelectItem value="500k-1m">$500,000 - $1 million</SelectItem>
                <SelectItem value="over1m">Over $1 million</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timeline">Desired Project Timeline</Label>
            <Input
              id="timeline"
              placeholder="e.g., 6 months, 1 year, or specific date"
              onChange={(e) => updateProjectData({ timeline: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="flexibility">How flexible are you with the timeline?</Label>
            <Select onValueChange={(value) => updateProjectData({ timelineFlexibility: value })}>
              <SelectTrigger id="flexibility">
                <SelectValue placeholder="Select flexibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very-flexible">Very Flexible</SelectItem>
                <SelectItem value="somewhat-flexible">Somewhat Flexible</SelectItem>
                <SelectItem value="strict">Strict Timeline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image src="/placeholder.svg?height=300&width=300" alt="Budget and Timeline Illustration" width={300} height={300} className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

