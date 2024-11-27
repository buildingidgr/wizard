"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectTypeSelector } from "@/components/project-type-selector"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  projectType: z.enum(["residential", "commercial", "industrial", "infrastructure"]),
  // Add more fields here as we implement them
})

type FormValues = z.infer<typeof formSchema>

export function CivilEngineeringForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: "residential",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      // TODO: Implement form submission logic
      console.log(data)
      toast({
        title: "Form submitted",
        description: "Your project details have been submitted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>Please provide information about your civil engineering project.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ProjectTypeSelector control={form.control} />
            {/* Add more form fields here as we implement them */}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

