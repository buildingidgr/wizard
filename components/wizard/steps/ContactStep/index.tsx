"use client"

import { useState } from 'react'
import { StepContainer } from "../shared/StepContainer"
import { ProgressBar } from "../shared/ProgressBar"
import { StepHeader } from "../shared/StepHeader"
import { StepNavigation } from "../shared/StepNavigation"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import PhoneInput from "@/components/ui/phone-input"
import { cn } from "@/lib/utils"
import { User, Mail, Phone, Shield, CheckCircle2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import 'react-phone-number-input/style.css'

interface ContactStepProps {
  contactDetails: {
    fullName: string
    email: string
    phone: string
    countryCode: string
  }
  onContactDetailsChange: (details: {
    fullName: string
    email: string
    phone: string
    countryCode: string
  }) => void
  onContinue: () => void
  onBack: () => void
}

interface LocalDetails {
  fullName: string
  email: string
  phone: string
  countryCode: string
}

interface Errors {
  fullName: string
  email: string
  phone: string
}

export const ContactStep = ({
  contactDetails,
  onContactDetailsChange,
  onContinue,
  onBack
}: ContactStepProps) => {
  const [localDetails, setLocalDetails] = useState<LocalDetails>(contactDetails)
  const [errors, setErrors] = useState<Errors>({
    fullName: '',
    email: '',
    phone: ''
  })
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [isEmailTouched, setIsEmailTouched] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    if (!email) return 'Το email είναι υποχρεωτικό'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Μη έγκυρη διεύθυνση email'
    }
    return ''
  }

  const handleInputChange = (field: keyof typeof localDetails) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setLocalDetails(prev => ({ ...prev, [field]: value }))
    
    if (field === 'email') {
      if (!isEmailTouched) setIsEmailTouched(true)
      const emailError = validateEmail(value)
      setErrors(prev => ({ ...prev, email: emailError }))
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePhoneChange = (value: string, isValid: boolean, error?: string) => {
    setLocalDetails(prev => ({ 
      ...prev, 
      phone: value || '',
      countryCode: value ? value.split(' ')[0] : '+30'
    }))
    setIsPhoneValid(isValid)
    setErrors(prev => ({ 
      ...prev, 
      phone: error || ''
    }))
  }

  const handleSubmit = () => {
    const newErrors = {
      fullName: !localDetails.fullName.trim() ? 'Το όνομα είναι υποχρεωτικό' : '',
      email: validateEmail(localDetails.email),
      phone: !isPhoneValid ? errors.phone || 'Μη έγκυρος αριθμός τηλεφώνου' : ''
    }

    setErrors(newErrors)
    setIsEmailTouched(true)

    if (!Object.values(newErrors).some(error => error)) {
      onContactDetailsChange(localDetails)
      onContinue()
    }
  }

  const renderFieldStatus = (field: 'fullName' | 'email' | 'phone') => {
    const value = localDetails[field]
    const error = errors[field]
    const isFocused = focusedField === field

    if (!value || isFocused) return null
    
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-sm"
      >
        {error ? (
          <AlertCircle className="h-4 w-4 text-destructive" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-primary" />
        )}
      </motion.div>
    )
  }

  return (
    <StepContainer>
      <ProgressBar currentStep={3} />
      <div className="space-y-8">
        <StepHeader 
          step={4} 
          title="Στοιχεία επικοινωνίας"
          subtitle="Προσωπικά στοιχεία"
        />
        
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Shield size={20} />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-medium text-base">
                  Ασφαλής επικοινωνία
                </h3>
                <p className="text-sm text-muted-foreground">
                  Τα στοιχεία σας θα χρησιμοποιηθούν μόνο για επικοινωνία σχετικά με το έργο σας
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5">
              <div className="p-2 rounded-lg bg-background text-primary">
                <Phone size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-base flex items-center gap-2">
                  Επαλήθευση κινητού τηλεφώνου
                  <CheckCircle2 size={16} className="text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Στο επόμενο βήμα θα λάβετε έναν κωδικό επαλήθευσης μέσω SMS. Αυτό μας βοηθά να:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Εξασφαλίσουμε την ποιότητα των αιτημάτων</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Προστατέψουμε τα στοιχεία σας</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Επικοινωνήσουμε άμεσα μαζί σας για το έργο σας</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid gap-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User size={18} />
                  </div>
                  <Input
                    placeholder="Ονοματεπώνυμο"
                    value={localDetails.fullName}
                    onChange={handleInputChange('fullName')}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "pl-10 pr-10",
                      errors.fullName && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {renderFieldStatus('fullName')}
                  </div>
                </div>
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-sm text-destructive"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Mail size={18} />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={localDetails.email}
                    onChange={handleInputChange('email')}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => {
                      setFocusedField(null)
                      setIsEmailTouched(true)
                    }}
                    className={cn(
                      "pl-10 pr-10",
                      isEmailTouched && errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {renderFieldStatus('email')}
                  </div>
                </div>
                <AnimatePresence>
                  {isEmailTouched && errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-sm text-destructive"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
                    <Phone size={18} />
                  </div>
                  <PhoneInput
                    value={localDetails.phone}
                    onChange={handlePhoneChange}
                    defaultCountry="GR"
                    international
                    aria-label="Κινητό τηλέφωνο"
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "pl-10",
                      errors.phone && "[&>*]:border-destructive [&>*]:focus-visible:ring-destructive"
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {renderFieldStatus('phone')}
                  </div>
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-sm text-destructive"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </Card>

        <StepNavigation
          onContinue={handleSubmit}
          onBack={onBack}
          disabled={!localDetails.fullName || !localDetails.email || !localDetails.phone || !isPhoneValid || Boolean(errors.email)}
        />
      </div>
    </StepContainer>
  )
} 