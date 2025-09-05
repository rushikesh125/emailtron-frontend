"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/components/ReduxProvider";
import NavBar from "@/components/Navbar";
import DashNav from "@/components/DashNav"; // Added import for DashNav

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current route

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {/* Render DashNav for /dashboard routes, NavBar for others */}
          {pathname.startsWith('/dashboard') ? <DashNav /> : <NavBar />}
          <div className="py-20">
            {children}
          </div>
        </ReduxProvider>

        <Toaster />
      </body>
    </html>
  );
}