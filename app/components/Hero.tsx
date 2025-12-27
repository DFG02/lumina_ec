"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-50 px-6 py-32 pt-32">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700 tracking-wide uppercase">
            <span className="w-2 h-2 bg-neutral-900 rounded-full"></span>
            Los mejores fotolibros de 2025
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
            Tus recuerdos
            <br />
            merecen
            <br />
            <span className="text-gradient italic block relative z-10">
              arte
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-neutral-600 max-w-xl leading-relaxed font-light">
            Fotolibros de alta calidad que transforman momentos en tesoros permanentes.
            <span className="block mt-2 font-medium text-neutral-900">Diseño profesional. Entrega garantizada. Calidad premium.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Link href="/templates" className="group px-10 py-4 bg-neutral-900 text-white rounded-full font-medium text-base hover:bg-neutral-800 transition-all duration-300 text-center inline-flex items-center justify-center gap-2">
              Comenzar ahora
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a href="#testimonials" className="px-10 py-4 bg-white border border-neutral-300 text-neutral-900 rounded-full font-medium text-base hover:border-neutral-900 transition-all duration-300 text-center">
              Ver ejemplos
            </a>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-6 border-t border-neutral-200 mt-8">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></div>
              <span className="font-medium">Envío gratis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></div>
              <span className="font-medium">Pago seguro</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></div>
              <span className="font-medium">Garantía 30 días</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-12 justify-center lg:justify-start pt-4">
            <div className="text-center lg:text-left">
              <div className="text-4xl font-bold text-neutral-900 tracking-tight">10,000+</div>
              <div className="text-sm text-neutral-500 font-light mt-1">clientes felices</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-4xl font-bold text-neutral-900 tracking-tight">4.9★</div>
              <div className="text-sm text-neutral-500 font-light mt-1">calificación</div>
            </div>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="relative h-[600px] lg:h-[750px] animate-scale-in">
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop&q=80"
              alt="Ejemplo de fotolibro hermoso"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
