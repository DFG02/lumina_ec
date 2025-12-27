"use client";

import { useState } from "react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  pages: number;
}

export default function TemplatesPage() {
  const templates: Template[] = [
    {
      id: "travel-classic",
      name: "Viaje Clásico",
      description: "Perfecto para documentar tus aventuras con un diseño atemporal",
      thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop",
      price: 29.99,
      pages: 24
    },
    {
      id: "modern-minimal",
      name: "Moderno Minimalista",
      description: "Diseño limpio y elegante para narrativas contemporáneas",
      thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
      price: 34.99,
      pages: 32
    },
    {
      id: "vintage-memories",
      name: "Recuerdos Vintage",
      description: "Diseño nostálgico con tonos cálidos y diseños clásicos",
      thumbnail: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=400&h=500&fit=crop",
      price: 32.99,
      pages: 28
    },
    {
      id: "adventure-bold",
      name: "Aventura Audaz",
      description: "Diseños dinámicos para tus viajes más emocionantes",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
      price: 36.99,
      pages: 36
    },
    {
      id: "family-moments",
      name: "Momentos Familiares",
      description: "Diseño cálido y acogedor para los recuerdos familiares más preciados",
      thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=500&fit=crop",
      price: 31.99,
      pages: 30
    },
    {
      id: "luxury-premium",
      name: "Lujo Premium",
      description: "Diseño sofisticado con acabados premium",
      thumbnail: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400&h=500&fit=crop",
      price: 44.99,
      pages: 40
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold tracking-tight text-neutral-900 hover:opacity-70 transition-opacity">
            Lúmina
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
              <span>Elige Plantilla</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">2</div>
              <span>Sube Fotos</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">3</div>
              <span>Diseña</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Elige Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Plantilla</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona un diseño que coincida con tu estilo. <strong className="text-gray-900">100% personalizable</strong> en nuestro editor.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-4 ${
                selectedTemplate === template.id ? 'border-blue-600' : 'border-transparent'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Thumbnail */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                    ✓ Seleccionado
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{template.pages} páginas</span>
                  <span className="text-2xl font-bold text-gray-900">${template.price}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template.id);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Seleccionar Plantilla
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedTemplate && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <Link
              href={`/upload?template=${selectedTemplate}`}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Continuar a Subir Fotos
              <span className="text-2xl">→</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
