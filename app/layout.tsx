import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Promptly",
  description: "Search & Share AI Prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/assets/images/logo.ico" sizes="any" /> */}
        <link
          rel="icon"
          href="/assets/images/logo.svg"
          type="image/svg"
          sizes="32x32"
        />
      </head>
      <body className="bg-white dark:bg-slate-950">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
