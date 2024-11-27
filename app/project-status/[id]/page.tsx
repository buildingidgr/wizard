'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock function to fetch project data
const fetchProjectData = async (id: string) => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return {
    id,
    status: 'In Progress',
    type: 'Residential Building',
    location: '123 Main St, Anytown, USA',
    budget: '$100,000 - $250,000',
    timeline: '6 months',
    description: 'Construction of a new family home with 3 bedrooms and 2 bathrooms.',
    engineers: [
      { id: 1, name: 'Jane Doe', message: "I'm interested in your project. Can you provide more details about the specific requirements?" },
      { id: 2, name: 'John Smith', message: "I have experience with similar projects. I'd like to submit a bid." },
    ],
  }
}

export default function ProjectStatusPage() {
  const { id } = useParams()
  const [projectData, setProjectData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState('')

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const data = await fetchProjectData(id as string)
        setProjectData(data)
      } catch (error) {
        console.error('Error fetching project data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjectData()
  }, [id])

  const handleReply = (engineerId: number) => {
    console.log(`Replying to engineer ${engineerId}: ${reply}`)
    // In a real application, this would send the reply to the backend
    setReply('')
  }

  if (loading) {
    return <div className="container mx-auto py-8 px-4 text-center">Loading project data...</div>
  }

  if (!projectData) {
    return <div className="container mx-auto py-8 px-4 text-center">Project not found</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Project Status</CardTitle>
          <CardDescription className="text-center">Project ID: {projectData.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Status:</p>
              <Badge variant="default">{projectData.status}</Badge>
            </div>
            <div>
              <p className="font-semibold">Type:</p>
              <p>{projectData.type}</p>
            </div>
            <div>
              <p className="font-semibold">Location:</p>
              <p>{projectData.location}</p>
            </div>
            <div>
              <p className="font-semibold">Budget:</p>
              <p>{projectData.budget}</p>
            </div>
            <div>
              <p className="font-semibold">Timeline:</p>
              <p>{projectData.timeline}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Description:</p>
            <p>{projectData.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Engineer Responses</h3>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {projectData.engineers.map((engineer: any) => (
                <div key={engineer.id} className="mb-4 pb-4 border-b last:border-b-0">
                  <p className="font-semibold">{engineer.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{engineer.message}</p>
                  <Textarea
                    placeholder="Type your reply here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={() => handleReply(engineer.id)}>Send Reply</Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

