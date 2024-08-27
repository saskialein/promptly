'use client'

import SessionProvider from '@components/provider/SessionProvider'
import { PromptProvider } from '@context/PromptContext'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <PromptProvider>{children}</PromptProvider>
    </SessionProvider>
  )
}
