"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Control } from "react-hook-form"

interface ProjectTypeSelectorProps {
  control: Control<any>
}

export function ProjectTypeSelector({ control }: ProjectTypeSelectorProps) {
  return (
    <FormField
      control={control}
      name="projectType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Project Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="residential" />
                </FormControl>
                <FormLabel className="font-normal">Residential</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="commercial" />
                </FormControl>
                <FormLabel className="font-normal">Commercial</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="industrial" />
                </FormControl>
                <FormLabel className="font-normal">Industrial</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="infrastructure" />
                </FormControl>
                <FormLabel className="font-normal">Infrastructure</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

