"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChevronDown, Phone } from "lucide-react"
import React, { forwardRef } from "react"
import PhoneNumberInput, { Props } from 'react-phone-number-input'
import { isPossiblePhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js'
import flags from "react-phone-number-input/flags"

interface CustomPhoneInputProps extends Omit<Props<typeof PhoneNumberInput>, 'onChange'> {
  onChange: (value: string, isValid: boolean, error?: string) => void
  className?: string
}

const PhoneInput = forwardRef<HTMLInputElement, CustomPhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const handleChange = (newValue: string | undefined) => {
      const formattedValue = newValue || ''
      let error: string | undefined
      let isValid = false

      if (formattedValue) {
        try {
          isValid = isPossiblePhoneNumber(formattedValue)
          if (!isValid) {
            const validationResult = validatePhoneNumberLength(formattedValue)
            if (validationResult === 'TOO_SHORT') {
              error = 'Ο αριθμός είναι πολύ μικρός'
            } else if (validationResult === 'TOO_LONG') {
              error = 'Ο αριθμός είναι πολύ μεγάλος'
            } else if (validationResult === 'INVALID_LENGTH') {
              error = 'Μη έγκυρο μήκος αριθμού'
            } else {
              error = 'Μη έγκυρος αριθμός τηλεφώνου'
            }
          }
        } catch {
          error = 'Μη έγκυρος αριθμός τηλεφώνου'
          isValid = false
        }
      }

      onChange(formattedValue, isValid, error)
    }

    // TODO: The ref type is complex due to the library's component structure.
    // We've tried several approaches including:
    // - React.Ref<typeof PhoneNumberInput>
    // - React.Ref<PhoneNumberInput>
    // - React.LegacyRef<typeof PhoneNumberInput>
    // None of these work correctly with the component's internal types.
    // Using 'any' for now until we can find a better solution or the library improves its TypeScript support.
    return (
      <PhoneNumberInput
        ref={ref as React.Ref<any>}
        className={cn("flex rounded-lg", className)}
        international
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={PhoneInputField}
        onChange={handleChange}
        value={value}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = "PhoneInput"

const PhoneInputField = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn("-ms-px rounded-s-none shadow-none focus-visible:z-10", className)}
        ref={ref}
        {...props}
      />
    )
  }
)

PhoneInputField.displayName = "PhoneInputField"

type CountrySelectProps = {
  disabled?: boolean
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className="relative inline-flex items-center self-stretch rounded-s-lg border border-input bg-background py-2 pe-2 ps-3 text-muted-foreground transition-shadow focus-within:z-10 focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 hover:bg-accent hover:text-foreground has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

const FlagComponent = ({ country, countryName }: { country: string; countryName: string }) => {
  const Flag = flags[country as keyof typeof flags]

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? <Flag title={countryName} /> : <Phone size={16} aria-hidden="true" />}
    </span>
  )
}

export default PhoneInput
