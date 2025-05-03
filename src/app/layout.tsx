import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from '@/components/base/header'
import "./globals.css";
import Footer from "@/components/base/footer";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner";


const inter = Inter({
  subsets: ["latin"]
})


export const metadata: Metadata = {
  title: "Next Vehiql",
  description: "Find your dream Vechicle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header/>
        <main className="min-h-screen"> {children} </main>
        <Toaster />
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
