"use client"

import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  className?: string
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value

      // Keep the country code if it exists, otherwise add it
      if (!newValue.startsWith('+30')) {
        newValue = '+30' + newValue.replace(/[^0-9]/g, "")
      } else {
        // If it starts with +30, only clean the rest
        const countryCode = newValue.slice(0, 3)
        const rest = newValue.slice(3).replace(/[^0-9]/g, "")
        newValue = countryCode + rest
      }

      onChange(newValue)
    }

    // Ensure the value always has the country code
    const displayValue = value.startsWith('+30') ? value : '+30' + value

    return (
      <Input
        type="tel"
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        className={cn("", className)}
        placeholder="+30 XXXXXXXXXX"
        {...props}
      />
    )
  }
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
