'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// SVG icons as components
const Building2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 9h8" />
    <path d="M8 15h8" />
  </svg>
)

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

// Mock function to fetch project data
const fetchProjectData = async () => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return {
    id: 'PROJ-KTAOVAF9Q',
    status: 'In Progress',
    progress: 65,
    type: 'Residential Building',
    location: '123 Main St, Anytown, USA',
    budget: '$100,000 - $250,000',
    timeline: '6 months',
    description: 'Construction of a new family home with 3 bedrooms and 2 bathrooms.',
    engineers: [
      { 
        id: 1, 
        name: 'Jane Doe', 
        avatar: '/placeholder.svg?height=40&width=40', 
        portfolioUrl: 'https://example.com/jane-doe',
        messages: [
          { text: "I'm interested in your project. Can you provide more details about the specific requirements?", timestamp: '2023-05-15T10:30:00Z' },
        ]
      },
      { 
        id: 2, 
        name: 'John Smith', 
        avatar: '/placeholder.svg?height=40&width=40', 
        portfolioUrl: 'https://example.com/john-smith',
        messages: [
          { text: "I have experience with similar projects. I'd like to submit a bid.", timestamp: '2023-05-15T11:45:00Z' },
        ]
      },
    ],
  }
}

export default function ProjectStatusPage() {
  const { id } = useParams()
  const router = useRouter()
  const [projectData, setProjectData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [replies, setReplies] = useState<{[key: number]: string}>({})
  const [activeChats, setActiveChats] = useState<{[key: number]: boolean}>({})
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const data = await fetchProjectData()
        setProjectData(data)
      } catch (error) {
        console.error('Error fetching project data:', error)
        setError('Failed to load project data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadProjectData()
  }, [])

  const handleReply = (engineerId: number) => {
    if (replies[engineerId]) {
      console.log(`Replying to engineer ${engineerId}: ${replies[engineerId]}`)
      // In a real application, this would send the reply to the backend
      // and update the messages for the engineer
      setProjectData(prevData => ({
        ...prevData,
        engineers: prevData.engineers.map((eng: any) => 
          eng.id === engineerId 
            ? { ...eng, messages: [...eng.messages, { text: replies[engineerId], timestamp: new Date().toISOString(), isUser: true }] }
            : eng
        )
      }))
      setReplies(prevReplies => ({ ...prevReplies, [engineerId]: '' }))
    }
  }

  const initiateChat = (engineerId: number) => {
    setActiveChats(prevActiveChats => ({ ...prevActiveChats, [engineerId]: true }))
  }

  const handleRemoveProject = () => {
    console.log('Removing project:', id)
    // In a real application, this would call an API to remove the project
    // and then redirect the user to a projects list or home page
    router.push('/') // Redirect to home page after project removal
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading project data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!projectData) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Project not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Status</h1>
        <p className="text-muted-foreground">Project ID: {projectData.id}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Current status and key information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant={projectData.status === 'In Progress' ? 'default' : 'secondary'}>
                  {projectData.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{projectData.progress}% Complete</span>
              </div>
              <Progress value={projectData.progress} className="w-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Building2Icon className="h-5 w-5 text-muted-foreground" />
                  <span>{projectData.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                  <span>{projectData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
                  <span>{projectData.budget}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <span>{projectData.timeline}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{projectData.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Engineers Interested</CardTitle>
              <CardDescription>Professionals ready to work on your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectData.engineers.map((engineer: any) => (
                  <div key={engineer.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={engineer.avatar} alt={engineer.name} />
                        <AvatarFallback>{engineer.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{engineer.name}</p>
                        <a href={engineer.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          View Portfolio
                        </a>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">Start Chat</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Start conversation with {engineer.name}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will initiate a chat with the engineer. You'll be able to discuss your project details and requirements.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => initiateChat(engineer.id)}>Start Chat</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Project Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Update Project Details</Button>
              <Button className="w-full" variant="outline">View Project Timeline</Button>
              <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Remove Project
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to remove this project?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your project and remove all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemoveProject}>Remove Project</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Engineer Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={projectData.engineers[0].id.toString()}>
                <TabsList className="w-full">
                  {projectData.engineers.map((engineer: any) => (
                    <TabsTrigger key={engineer.id} value={engineer.id.toString()} className="flex-1">
                      {engineer.name.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {projectData.engineers.map((engineer: any) => (
                  <TabsContent key={engineer.id} value={engineer.id.toString()}>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      {engineer.messages.map((message: any, index: number) => (
                        <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : ''}`}>
                          <div className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {message.text}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(message.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <div className="mt-4">
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replies[engineer.id] || ''}
                        onChange={(e) => setReplies(prev => ({ ...prev, [engineer.id]: e.target.value }))}
                        className="mb-2"
                      />
                      <Button onClick={() => handleReply(engineer.id)} className="w-full">Send Reply</Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

