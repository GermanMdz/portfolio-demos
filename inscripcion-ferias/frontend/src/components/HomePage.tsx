"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ferias de Emprendedores
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
            Inscríbete en las ferias municipales y conecta con emprendedores, comerciantes y servicios de Vicente López
          </p>
          <Link
            href="/feria"
            className="inline-block px-8 py-4 bg-purple-700 text-white font-semibold text-lg rounded-lg hover:bg-purple-900 transition-colors shadow-lg hover:shadow-xl"
          >
            Ver próximas ferias
          </Link>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-700 text-center mb-12">
            ¿Por qué participar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-purple-700 mb-4">
                Inscripción Digital
              </h3>
              <p className="text-gray-700">
                Registrate de manera rápida y sencilla en nuestro plataforma digital. Sin trámites complicados.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-purple-700 mb-4">
                Conecta con la Comunidad
              </h3>
              <p className="text-gray-700">
                Conoce emprendedores, comerciantes y servicios municipales en un mismo lugar.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-purple-700 mb-4">
                Respuesta asegurada
              </h3>
              <p className="text-gray-700">
                Recibe confirmación de tu inscripción y accede a toda la información de la feria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-750 to-blue-300 bg-brand-diagonal py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para participar?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Explora las próximas ferias y crea tu cuenta para inscribirte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/feria"
              className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explorar ferias
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors shadow-lg "
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-700 text-center mb-12">
            Información Importante
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-purple-700 mb-4 relative -translate-x-15">📋Requisitos</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Contar con un emprendimiento</li>
                <li>✓ Proporcionar datos completos</li>
                <li>✓ Comprometerse con las ferias</li>
                <li>✓ Respetar las normas de convivencia</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-purple-700 mb-4 relative -translate-x-18">⚙️Proceso</h3>
              <ol className="space-y-3 text-gray-700">
                <li>1. Registrarse o iniciar sesion</li>
                <li>2. Seleccionar una feria</li>
                <li>3. Completar la inscripción</li>
                <li>4. Esperar confirmación de asistencia</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 text-lg mb-6">
            ¿Preguntas? Contáctanos a través de nuestros canales de atención
          </p>
          <Link
            href="/"
            className="text-purple-700 font-semibold hover:text-purple-900 text-lg"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}