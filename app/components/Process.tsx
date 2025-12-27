export default function Process() {
  const steps = [
    {
      number: "1",
      title: "ELIGE TU PLANTILLA",
      description: "¡Puedes personalizar completamente cada plantilla en nuestro editor en línea fácil de usar! ¡No necesitas ninguna aplicación!",
      icon: "🎨"
    },
    {
      number: "2",
      title: "SUBE TUS FOTOS",
      description: "Organizaremos instantáneamente tus fotos en una historia cohesiva y bien diseñada. ¡También puedes usar Creación Automática para cargas más rápidas!",
      icon: "📤"
    },
    {
      number: "3",
      title: "PERSONALIZA TU LIBRO",
      description: "¡Cambia fácilmente fuentes, fondos, colores, formas, stickers y más para hacerlo verdaderamente tuyo y memorable!",
      icon: "✨"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            es tan fácil como <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">1, 2, 3</span> crear
            <br />
            tu fotolibro
          </h2>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Con Lúmina Prints, puedes transformar fácilmente tus fotos de vacaciones en un fotolibro impresionante 
            que captura la esencia de tu viaje.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Number Badge */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="text-6xl mb-6 mt-4">
                {step.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-sm font-bold text-gray-500 mb-3 tracking-wider">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
