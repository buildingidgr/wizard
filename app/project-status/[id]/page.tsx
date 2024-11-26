"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

type ProjectStatus = "In Progress" | "Completed"

export default function ProjectStatusPage({ params }: { params: { id: string } }) {
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>("In Progress")
  const [messages, setMessages] = useState([
    { sender: "John Doe", content: "Hello, I'm interested in your project. Can you provide more details?", timestamp: "2023-06-01 10:00 AM" },
    { sender: "You", content: "The project involves designing a bridge over a small river. What specific details would you like to know?", timestamp: "2023-06-01 10:15 AM" },
    { sender: "John Doe", content: "What's the expected traffic volume and weight limit for the bridge?", timestamp: "2023-06-01 10:30 AM" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", content: newMessage, timestamp: new Date().toLocaleString() }])
      setNewMessage("")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Status: {params.id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Project Overview</h2>
                  <p>This is a brief description of the project, including its goals and main features.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Current Status</h3>
                  <Badge variant={projectStatus === "Completed" ? "success" : "default"}>{projectStatus}</Badge>
                </div>
                <Progress value={33} className="w-full" />
                <div>
                  <h3 className="text-lg font-semibold">Key Information</h3>
                  <ul className="list-disc list-inside">
                    <li>Project Type: Bridge Construction</li>
                    <li>Location: River City, State</li>
                    <li>Estimated Completion: December 2023</li>
                    <li>Budget: $5,000,000</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="timeline">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Project Timeline</h2>
                <ul className="space-y-2">
                  <li>Project Initiation: January 2023</li>
                  <li>Design Phase: February 2023 - April 2023</li>
                  <li>Permitting: May 2023 - July 2023</li>
                  <li>Construction Start: August 2023</li>
                  <li>Estimated Completion: December 2023</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Project Documents</h2>
                <ul className="space-y-2">
                  <li><a href="#" className="text-blue-600 hover:underline">Project Proposal</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Environmental Impact Assessment</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Engineering Drawings</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Budget Breakdown</a></li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Engineer Conversations</h2>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{message.sender}</span>
                </div>
                <p className="bg-gray-100 rounded-lg p-2">{message.content}</p>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4">
            <Textarea
              placeholder="Type your message here"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleSendMessage}>Send Message</Button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Project Actions</h2>
        <div className="space-x-2">
          <Button onClick={() => setProjectStatus("In Progress")}>Mark as In Progress</Button>
          <Button onClick={() => setProjectStatus("Completed")}>Mark as Completed</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your project and remove all associated data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete Project</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

