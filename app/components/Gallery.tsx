"use client";

export default function Gallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80",
      alt: "Mountain landscape"
    },
    {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=800&fit=crop&q=80",
      alt: "Lake sunset"
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop&q=80",
      alt: "Forest path"
    },
    {
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=800&fit=crop&q=80",
      alt: "Coastal view"
    }
  ];

  return (
    <section className="py-32 bg-neutral-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
            Momentos convertidos
            <br />
            en <span className="text-gradient italic">obras de arte</span>
          </h2>
          <p className="text-lg text-neutral-500 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            Cada fotolibro es una pieza única creada con dedicación.
            Papel premium, impresión de alta resolución y acabados impecables.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl text-neutral-900">★</span>
              ))}
            </div>
            <p className="text-sm text-neutral-600 font-medium">
              4.9/5 — Más de 10,000 clientes satisfechos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
