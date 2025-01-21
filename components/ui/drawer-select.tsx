"use client"

import * as React from "react"
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DrawerSelectContextValue {
  value?: string
  onValueChange?: (value: string) => void
  setOpen: (open: boolean) => void
}

const DrawerSelectContext = React.createContext<DrawerSelectContextValue | null>(null)

export interface DrawerSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  children?: React.ReactNode
  title?: string
}

export interface DrawerSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children?: React.ReactNode
}

export const DrawerSelect = React.forwardRef<HTMLDivElement, DrawerSelectProps>(
  ({ value, onValueChange, placeholder = "Select...", title, className, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <DrawerSelectContext.Provider value={{ value, onValueChange, setOpen }}>
        <div ref={ref} className={className} {...props}>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal"
              >
                <span className="truncate">
                  {value || placeholder}
                </span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[96vh] pt-4">
              <div className="mx-auto w-full max-w-5xl px-6">
                <DrawerHeader className="text-left px-0 pb-6">
                  <DrawerTitle className="text-2xl font-semibold tracking-tight">
                    {title || placeholder}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="pb-8">
                  {children}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </DrawerSelectContext.Provider>
    )
  }
)
DrawerSelect.displayName = "DrawerSelect"

export const DrawerSelectItem = React.forwardRef<HTMLDivElement, DrawerSelectItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = React.useContext(DrawerSelectContext)
    if (!context) {
      throw new Error("DrawerSelectItem must be used within DrawerSelect")
    }

    return (
      <div
        ref={ref}
        role="button"
        onClick={() => {
          context.onValueChange?.(value)
          context.setOpen(false)
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DrawerSelectItem.displayName = "DrawerSelectItem"