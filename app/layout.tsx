// app/layout.tsx
import "./globals.css"; 
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";  // ← ADD THIS

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyWith AI",
  description: "AI-based note summarizer and quiz generator",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}>
        <SessionProvider>  {/* ← WRAP EVERYTHING */}
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #1e293b",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#3b82f6", secondary: "#fff" } },
              error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
            }}
          />
        </SessionProvider>  {/* ← CLOSE HERE */}
      </body>
    </html>
  );
}