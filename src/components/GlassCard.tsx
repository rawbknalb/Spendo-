import { memo } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Slightly stronger shadow for hero surfaces. */
  strong?: boolean
  className?: string
}

function cn(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export const GlassCard = memo(function GlassCard({
  children,
  strong = false,
  className,
  ...rest
}: CardProps) {
  return (
    <div className={cn(strong ? 'card-strong' : 'card', className)} {...rest}>
      {children}
    </div>
  )
})
