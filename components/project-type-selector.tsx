"use client"

import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProjectType } from "@/lib/form-schema"

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
              {Object.values(ProjectType).map((type) => (
                <FormItem key={type} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={type} />
                  </FormControl>
                  <FormLabel className="font-normal">{type}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

