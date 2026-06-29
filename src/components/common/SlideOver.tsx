import { useEffect } from 'react'

interface SlideOverProps {
  children: React.ReactNode
  onClose: () => void
}

export default function SlideOver({ children, onClose }: SlideOverProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className="bg-background fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col overflow-hidden border-l shadow-xl"
      >
        {children}
      </div>
    </>
  )
}
