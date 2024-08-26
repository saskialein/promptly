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
    <div className="flex-center fixed inset-0 z-50 flex bg-black/50">
      <div className="glassmorphism relative z-10 w-2/3 max-w-full p-6">
        <button
          className="absolute right-3 top-3 text-gray-500 outline-none hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          ✕
        </button>
        
        <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
