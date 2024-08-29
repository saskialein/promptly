import Nav from '@components/ui/Nav'
import '@styles/globals.css'
import { inter, syne } from '@/app/ui/fonts'
import { ReactNode } from 'react'
import { Providers } from './providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: { template: '%s | Promptly', default: 'Promptly' },
  description: 'Search & Share AI Prompts',
  metadataBase: new URL('https://promptly.saskia.dev'),
  openGraph: {
    title: "Promptly",
    description: "Search & Share AI Prompts",
    url: "https://promptly.saskia.dev"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/images/logo.svg"
          type="image/svg"
          sizes="32x32"
        />
      </head>
      <body
        className={`bg-white dark:bg-slate-950 ${inter.variable} ${syne.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Providers>
        {/* <!-- Cloudflare Web Analytics --> */}
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7231d7e4bb754cf8b529b0ed341b7e10"}'></script>
        {/* <!-- End Cloudflare Web Analytics --> */}
      </body>
    </html>
  )
}
