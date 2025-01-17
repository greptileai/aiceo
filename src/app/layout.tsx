import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Your CEO",
  description: "This is you CEO, get to work.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <SidebarProvider>
            <div className="flex h-screen w-screen">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto">
                <SidebarTrigger className="absolute top-4 left-4 z-50 md:hidden" />
                {children}
              </main>
            </div>
          </SidebarProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
