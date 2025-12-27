export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 pb-20 border-b border-neutral-800">
          <div className="text-center">
            <div className="text-5xl mb-4 opacity-80">🚀</div>
            <h3 className="font-semibold mb-2 text-lg">Envío rápido</h3>
            <p className="text-neutral-400 text-sm font-light">
              Producción en 2-3 días
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl mb-4 opacity-80">✅</div>
            <h3 className="font-semibold mb-2 text-lg">Garantía total</h3>
            <p className="text-neutral-400 text-sm font-light">
              100% satisfacción garantizada
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl mb-4 opacity-80">⭐</div>
            <h3 className="font-semibold mb-2 text-lg">10,000+ clientes</h3>
            <p className="text-neutral-400 text-sm font-light">
              Confianza y calidad comprobada
            </p>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Lúmina</h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Transforma tus momentos en obras de arte que duran para siempre.
            </p>
          </div>
          
          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Tienda</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors font-light">Plantillas</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Precios</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Ejemplos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Soporte</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors font-light">Contáctanos</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Preguntas frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Envíos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Empresa</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors font-light">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Términos</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-500 text-sm font-light">
            © 2025 Lúmina. Todos los derechos reservados.
          </div>
          
          {/* Payment Methods */}
          <div className="flex gap-3 items-center">
            <span className="text-neutral-500 text-xs font-light">Pagos seguros</span>
            <div className="flex gap-2">
              <div className="w-10 h-7 bg-neutral-800 rounded flex items-center justify-center text-xs">💳</div>
              <div className="w-10 h-7 bg-neutral-800 rounded flex items-center justify-center text-xs">💳</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
