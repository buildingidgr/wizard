import { Icons } from "@/components/ui/icons"

export function Spinner({ className }: { className?: string }) {
  return <Icons.spinner className={`animate-spin ${className}`} />
}

