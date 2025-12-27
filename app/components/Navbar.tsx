"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold tracking-tight text-neutral-900 hover:opacity-70 transition-opacity">
            Lúmina
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/templates" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Plantillas
            </Link>
            <a href="/#features" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Características
            </a>
            <a href="/#testimonials" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Reseñas
            </a>
            <a href="/#faq" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Preguntas
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-neutral-700 hover:text-neutral-900 transition-colors relative">
              <FiShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </button>
            <Link
              href="/templates"
              className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
            >
              Comenzar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/templates"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Plantillas
            </Link>
            <a
              href="/#features"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Características
            </a>
            <a
              href="/#testimonials"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Reseñas
            </a>
            <a
              href="/#faq"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Preguntas
            </a>
            <Link
              href="/templates"
              className="block text-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Comenzar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
