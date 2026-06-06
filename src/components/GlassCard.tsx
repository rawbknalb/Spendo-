import type { HTMLAttributes, ReactNode } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Brighter, more opaque variant for hero surfaces. */
  strong?: boolean
  className?: string
}

function cn(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function GlassCard({
  children,
  strong = false,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'glass-sheen',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export { cn }
