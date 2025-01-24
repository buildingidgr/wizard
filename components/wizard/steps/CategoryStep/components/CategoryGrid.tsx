"use client"

import { DrawerSelect, DrawerSelectItem } from "@/components/ui/drawer-select"
import { cn } from "@/lib/utils"
import { Check, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from 'next/image'

interface Category {
  title: string
  description: string
  imageSrc: string
}

interface CategoryGridProps {
  categories: Category[]
  selectedCategory: string
  onSelect: (value: string) => void
}

export const CategoryGrid = ({ 
  categories, 
  selectedCategory, 
  onSelect 
}: CategoryGridProps) => (
  <DrawerSelect 
    onValueChange={onSelect} 
    value={selectedCategory} 
    placeholder="Επιλέξτε κατηγορία"
    title="Επιλέξτε κατηγορία έργου"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <DrawerSelectItem 
            value={category.title}
            className={cn(
              "group relative flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border",
              "transition-all duration-200 ease-out",
              "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
              selectedCategory === category.title 
                ? "border-primary/50 bg-primary/5 hover:bg-primary/10" 
                : "border-border/40 hover:border-border hover:bg-accent/5"
            )}
          >
            <div className="relative w-full h-24 sm:h-32 rounded-lg overflow-hidden bg-muted/50">
              <Image
                src={category.imageSrc}
                alt={category.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 sm:space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground/90 text-base sm:text-sm">
                    {category.title}
                  </h3>
                  <ChevronRight 
                    size={16} 
                    className={cn(
                      "text-muted-foreground/50 transition-all duration-300",
                      "group-hover:translate-x-0.5 group-hover:text-foreground/70"
                    )} 
                  />
                </div>
                <p className="text-sm sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>
              <div className={cn(
                "w-5 h-5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0",
                "transition-all duration-300",
                selectedCategory === category.title 
                  ? "border-primary bg-primary text-primary-foreground scale-110" 
                  : "border-border group-hover:border-foreground/30"
              )}>
                {selectedCategory === category.title && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Check size={12} className="sm:w-[10px] sm:h-[10px]" />
                  </motion.div>
                )}
              </div>
            </div>
          </DrawerSelectItem>
        </motion.div>
      ))}
    </div>
  </DrawerSelect>
) 