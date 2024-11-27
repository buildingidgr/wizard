"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BudgetTimelineProps {
  updateProjectData: (data: { budget?: string; timeline?: string }) => void
}

export function BudgetTimeline({ updateProjectData }: BudgetTimelineProps) {
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value)
    updateProjectData({ budget: event.target.value })
  }

  const handleTimelineChange = (value: string) => {
    setTimeline(value)
    updateProjectData({ timeline: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Budget & Timeline</h2>
        <p className="text-muted-foreground">Specify your budget range and preferred timeline</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Project Budget (USD)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="Enter your budget"
            value={budget}
            onChange={handleBudgetChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline">Project Timeline</Label>
          <Select onValueChange={handleTimelineChange} value={timeline}>
            <SelectTrigger id="timeline">
              <SelectValue placeholder="Select preferred timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3 months">1-3 months</SelectItem>
              <SelectItem value="3-6 months">3-6 months</SelectItem>
              <SelectItem value="6-12 months">6-12 months</SelectItem>
              <SelectItem value="1+ year">1+ year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

