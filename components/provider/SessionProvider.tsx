'use client'

import {
  SessionProvider as AuthSessionProvider,
  SessionProviderProps,
} from 'next-auth/react'
import { ReactNode } from 'react'

export default function SessionProvider({
  children,
  session,
}: {
  children: ReactNode
  session?: SessionProviderProps['session']
}) {
  return <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
}
