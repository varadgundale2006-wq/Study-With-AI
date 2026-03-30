"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-t border-slate-800">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12"
      >

        {/* BRAND */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-500 mb-4">
            StudyWith AI
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
            Smart learning powered by artificial intelligence.
            Transforming notes into clear summaries, key concepts,
            and interactive quizzes for deeper understanding.
          </p>

          <p className="text-blue-400 text-xs mt-4">
            Supporting SDG-4: Quality Education 🌍
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold mb-4 text-base sm:text-lg text-white">
            Navigation
          </h3>

          <div className="flex flex-col gap-3 text-slate-400 text-sm">
            <Link href="/dashboard" className="hover:text-blue-400 transition">
              Dashboard
            </Link>
            <Link href="/Quiz" className="hover:text-blue-400 transition">
              Quiz Generator
            </Link>
            <Link href="/About" className="hover:text-blue-400 transition">
              About
            </Link>
            <Link href="/Contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
          </div>
        </div>

        {/* FEATURES */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold mb-4 text-base sm:text-lg text-white">
            Features
          </h3>

          <ul className="text-slate-400 space-y-3 text-sm">
            <li className="hover:text-blue-400 transition">
              AI Summarization
            </li>
            <li className="hover:text-blue-400 transition">
              Quiz Generation
            </li>
            <li className="hover:text-blue-400 transition">
              Key Concept Extraction
            </li>
            <li className="hover:text-blue-400 transition">
              Smart Study Assistant
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold mb-4 text-base sm:text-lg text-white">
            Contact
          </h3>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 text-sm mb-3">
            <MapPin size={16} className="text-blue-500" />
            Pune, India
          </div>

          <div className="text-slate-400 text-sm space-y-2 mb-6 break-words">
            <p className="truncate sm:whitespace-normal">
              om.pawar24@pccoepune.org
            </p>
            <p className="truncate sm:whitespace-normal">
              sarthak.gaikwad24@pccoepune.org
            </p>
            <p className="truncate sm:whitespace-normal">
              prem.admane24@pccoepune.org
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex justify-center sm:justify-start gap-4">
            <a
              href="https://github.com/HariomGundale/Study-with-Ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Github size={18} />
            </a>

            <a
              href="mailto:hariomgundale21@gmail.com"
              className="bg-slate-800 p-3 rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

      </motion.div>

      {/* Bottom Strip */}
      <div className="border-t border-slate-800 text-center py-4 sm:py-6 text-xs sm:text-sm text-slate-500 px-4">
        © 2026 StudyWith AI. Built for smarter learning.
      </div>

    </footer>
  );
}
