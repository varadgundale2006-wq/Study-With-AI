"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const isAuthPage = pathname === "/login" || pathname === "/register";

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Quiz", href: "/Quiz" },
    { name: "About", href: "/About" },
    { name: "Contact", href: "/Contact" },
  ];

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="StudyWith AI Logo"
            width={40}
            height={40}
            className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition">
            StudyWith AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition hover:text-blue-400 ${
                pathname === link.href ? "text-blue-400" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Auth Buttons — Desktop */}
          {!isAuthPage && (
            <div className="flex items-center gap-3 ml-4">
              {status === "loading" ? (
                // Loading skeleton
                <div className="w-20 h-8 bg-slate-800 rounded-lg animate-pulse" />
              ) : isLoggedIn ? (
                // Logged in — show user info + logout
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm text-slate-300 max-w-[100px] truncate">
                      {session?.user?.name || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600/20 hover:bg-red-600 border border-red-600/50 hover:border-red-500 text-red-400 hover:text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Not logged in — show Sign In / Sign Up
                <>
                  <Link
                    href="/login"
                    className="text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 px-4 py-1.5 rounded-lg text-sm font-semibold transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950 border-t border-slate-800 px-6 py-6 space-y-5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-lg transition ${
                  pathname === link.href
                    ? "text-blue-400"
                    : "text-slate-300 hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {!isAuthPage && (
              <div className="flex flex-col gap-3 pt-2 border-t border-slate-800">
                {isLoggedIn ? (
                  <>
                    {/* User info */}
                    <div className="flex items-center gap-2 px-1">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <span className="text-slate-300 text-sm">
                        {session?.user?.name || "User"}
                      </span>
                    </div>
                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-center bg-red-600/20 hover:bg-red-600 border border-red-600/50 text-red-400 hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}