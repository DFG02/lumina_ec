export default function Features() {
  const features = [
    {
      icon: "📷",
      title: "Calidad Premium",
      description: "Papel fotográfico profesional y encuadernación de lujo que perdura generaciones."
    },
    {
      icon: "✨",
      title: "Diseño Elegante",
      description: "Plantillas cuidadosamente diseñadas por artistas. Personalización sin límites."
    },
    {
      icon: "🚀",
      title: "Entrega Rápida",
      description: "Producción en 2-3 días. Envío gratuito en pedidos superiores a $50."
    }
  ];

  return (
    <section id="features" className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
            Por qué elegirnos
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-light">
            Cada detalle importa cuando se trata de tus recuerdos
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              <div className="text-7xl mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed font-light text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
