import React, { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-center bg-black/50">
      <div className="glassmorphism w-full max-w-xl min-w-lg p-6 relative z-10">
        <button
          className="absolute top-3 right-3 outline-none focus:outline-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
