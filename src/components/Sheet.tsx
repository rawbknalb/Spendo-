import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface SheetProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

/** Centered glass modal on desktop, bottom sheet on mobile. */
export function Sheet({ open, title, onClose, children }: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="glass-strong glass-sheen relative z-10 w-full max-w-md animate-slide-up rounded-b-none rounded-t-5xl p-6 sm:animate-scale-in sm:rounded-4xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="pressable grid h-9 w-9 place-items-center rounded-full bg-black/[0.06] text-gray-500 hover:bg-black/[0.10]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
