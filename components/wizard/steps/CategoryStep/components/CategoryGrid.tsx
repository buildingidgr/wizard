"use client"

import { DrawerSelect, DrawerSelectItem } from "@/components/ui/drawer-select"
import { cn } from "@/lib/utils"
import { Check, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              "group relative flex flex-col gap-3 p-3 rounded-lg border",
              "transition-all duration-200 ease-out",
              "hover:shadow-md hover:scale-[1.02]",
              selectedCategory === category.title 
                ? "border-primary/50 bg-primary/5 hover:bg-primary/10" 
                : "border-border/40 hover:border-border hover:bg-accent/5"
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-background/50">
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
              <img 
                src={category.imageSrc} 
                alt={category.title}
                className={cn(
                  "w-full h-full object-cover",
                  "transition-all duration-500 ease-out",
                  "group-hover:scale-[1.03]",
                  selectedCategory === category.title && "saturate-[1.1]"
                )}
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground/90 text-sm">
                    {category.title}
                  </h3>
                  <ChevronRight 
                    size={14} 
                    className={cn(
                      "text-muted-foreground/50 transition-all duration-300",
                      "group-hover:translate-x-0.5 group-hover:text-foreground/70"
                    )} 
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>
              <div className={cn(
                "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
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
                    <Check size={10} />
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