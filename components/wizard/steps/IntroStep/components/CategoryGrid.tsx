// components/wizard/steps/CategoryStep/components/CategoryGrid.tsx
"use client"

import { DrawerSelect, DrawerSelectItem } from "@/components/ui/drawer-select"

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
  >
    {categories.map((category, index) => (
      <DrawerSelectItem 
        key={index} 
        value={category.title} 
        imageSrc={category.imageSrc}
      >
        {category.title}
      </DrawerSelectItem>
    ))}
  </DrawerSelect>
)