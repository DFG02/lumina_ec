"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Christine",
      review: "La calidad del papel y la encuadernación superaron mis expectativas. Es un tesoro que guardaré por siempre.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
    },
    {
      name: "Ella S",
      review: "El proceso de diseño fue intuitivo y el resultado final es simplemente hermoso. Mis recuerdos nunca se vieron tan bien.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80"
    },
    {
      name: "Sienna",
      review: "La atención al detalle es notable. Cada página refleja el cuidado y la calidad que prometen. Totalmente recomendado.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
            Lo que dicen
            <br />
            nuestros <span className="text-gradient italic">clientes</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-neutral-900 text-xl">★</span>
                ))}
              </div>
              
              {/* Review */}
              <p className="text-neutral-700 leading-relaxed mb-8 text-base font-light">
                &ldquo;{testimonial.review}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div>
                  <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">Cliente verificado</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
