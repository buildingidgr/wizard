import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface StepProps {
  onNext: (data: any) => void
  onPrevious?: () => void
  data: any
}

export function ProjectType({ onNext, data }: StepProps) {
  const [projectType, setProjectType] = useState(data.projectType || '')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Select Project Type</h2>
      <Select onValueChange={setProjectType} defaultValue={projectType}>
        <SelectTrigger>
          <SelectValue placeholder="Select project type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="residential">Residential</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="industrial">Industrial</SelectItem>
          <SelectItem value="infrastructure">Infrastructure</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={() => onNext({ projectType })}>Next</Button>
    </div>
  )
}

export function ProjectLocation({ onNext, onPrevious, data }: StepProps) {
  const [location, setLocation] = useState(data.location || '')
  const [size, setSize] = useState(data.size || '')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Project Location and Size</h2>
      <Input
        placeholder="Project Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        placeholder="Project Size (sq ft)"
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <div className="space-x-4">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={() => onNext({ location, size })}>Next</Button>
      </div>
    </div>
  )
}

export function ProjectGoals({ onNext, onPrevious, data }: StepProps) {
  const [goals, setGoals] = useState(data.goals || '')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Project Goals and Requirements</h2>
      <Textarea
        placeholder="Describe your project goals and requirements"
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
      />
      <div className="space-x-4">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={() => onNext({ goals })}>Next</Button>
      </div>
    </div>
  )
}

export function ProjectBudget({ onNext, onPrevious, data }: StepProps) {
  const [budget, setBudget] = useState(data.budget || '')
  const [timeline, setTimeline] = useState(data.timeline || '')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Budget and Timeline</h2>
      <Input
        placeholder="Budget ($)"
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <Input
        placeholder="Timeline (months)"
        type="number"
        value={timeline}
        onChange={(e) => setTimeline(e.target.value)}
      />
      <div className="space-x-4">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={() => onNext({ budget, timeline })}>Next</Button>
      </div>
    </div>
  )
}

export function ProjectDetails({ onNext, onPrevious, data }: StepProps) {
  const [details, setDetails] = useState(data.details || '')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Additional Details and Concerns</h2>
      <Textarea
        placeholder="Any additional details or concerns about your project"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <div className="space-x-4">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={() => onNext({ details })}>Next</Button>
      </div>
    </div>
  )
}

export function ContactInfo({ onNext, onPrevious, data }: StepProps) {
  const [name, setName] = useState(data.name || '')
  const [email, setEmail] = useState(data.email || '')
  const [phone, setPhone] = useState(data.phone || '')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact Information</h2>
      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="space-x-4">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={() => onNext({ name, email, phone })}>Next</Button>
      </div>
    </div>
  )
}

export function ReviewSubmit({ onSubmit, onPrevious, data }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Review and Submit</h2>
      <div className="bg-muted p-4 rounded-lg">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="space-x-4">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={onSubmit}>Submit Project</Button>
      </div>
    </div>
  )
}

