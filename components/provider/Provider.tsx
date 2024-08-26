'use client'

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { ReactNode } from "react";

export default function Provider({
  children,
  session,
}: {
  children: ReactNode;
  session?: SessionProviderProps["session"];
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
