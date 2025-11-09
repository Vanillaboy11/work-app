import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniEmpleos",
  description: "By students, for students.",
};

import { NextAuthProvider } from "@/providers/NextAuthProvider";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import AuthWrapper from "@/components/AuthWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const isAuthPage = ['/login', '/register', '/', '/about'].some(path => 
    typeof window !== 'undefined' && window.location.pathname === path
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <NextAuthProvider>
          <AuthWrapper>
            {!isAuthPage && session && <Header />}
            <main className={!isAuthPage && session ? "pt-16" : ""}>
              {children}
            </main>
          </AuthWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
