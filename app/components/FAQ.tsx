"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo Hago un Pedido?",
      answer: "Simplemente elige tu plantilla, sube tus fotos, personaliza tu diseño y procede al pago. Nuestro editor en línea fácil de usar te guía en cada paso."
    },
    {
      question: "¿Cuánto Tiempo Tardará en Llegar Mi Pedido?",
      answer: "El envío estándar tarda 7-10 días hábiles. El envío exprés está disponible para entrega en 3-5 días hábiles."
    },
    {
      question: "¿Realizan Envíos Internacionales?",
      answer: "¡Sí! Enviamos a la mayoría de los países del mundo. Los tiempos y costos de envío varían según la ubicación."
    },
    {
      question: "¿Cuánto Puedo Personalizar Mi Diseño?",
      answer: "¡Tienes control creativo completo! Cambia diseños, fuentes, fondos, colores, agrega texto, stickers y más. Cada elemento es personalizable."
    },
    {
      question: "¿Cuáles Son las Dimensiones de Sus Libros?",
      answer: "Ofrecemos múltiples tamaños: Pequeño (20x20cm), Mediano (25x25cm) y Grande (30x30cm). Todos los libros tienen formato cuadrado para un aspecto moderno."
    },
    {
      question: "¿Cómo Me Pongo en Contacto?",
      answer: "Envíanos un correo a soporte@luminaprints.com o usa nuestro formulario de contacto. Respondemos dentro de 24 horas en días hábiles."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            preguntas frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Encuentra respuestas a las preguntas más comunes sobre los fotolibros de Lúmina Prints
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span className={`text-2xl transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6 text-gray-600 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
