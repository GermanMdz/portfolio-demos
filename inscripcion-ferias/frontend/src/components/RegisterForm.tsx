"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { RegisterDto } from "@/types/RegisterDto";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const newUser: RegisterDto = {
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rubro: formData.get("rubro") as string,
      telefono: formData.get("telefono") as string,
    };

    try {
      await authService.register(newUser);
      router.push("/feria");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error desconocido";
      setError(message);
    }
  }

  return (
  <div className="flex flex-col md:flex-row bg-white min-h-screen">

    {/* --- LADO IZQUIERDO --- */}
    <div
      className="
        w-full 
        md:w-1/2 
        bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800
        flex flex-col items-center justify-center text-center
        p-8 md:p-12
        relative overflow-hidden
        min-h-[350px] md:min-h-screen
      "
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
          ¡Unete a nosotros!
        </h1>

        <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8">
          Creá tu cuenta para acceder a las siguientes caracteristicas:
        </p>

        {/* Lista de beneficios */}
        <ul className="space-y-3 md:space-y-4 text-blue-50 text-left mx-auto w-max">
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Visualizacion de proximas ferias 
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Gestion ágil de inscripciones
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Seguimiento de tus solicitudes
          </li>
        </ul>
      </div>
    </div>

    {/* --- LADO DERECHO (Formulario) --- */}
    <div
      className="
        w-full 
        md:w-1/2 
        flex flex-col justify-center items-center
        px-6 sm:px-12 
        py-10 md:py-0
      "
    >
      <div className="w-full max-w-sm">

        <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2 text-center mb-6 md:mb-8">
          Crear cuenta
        </h2>

        {/* <p className="text-gray-500 text-center mb-6 md:mb-8 text-sm">
          Completá el formulario para registrarte
        </p> */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de tu emprendimiento"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:border-purple-700 
              focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 
              transition-all placeholder:text-gray-400 text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:border-purple-700 
              focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 
              transition-all placeholder:text-gray-400 text-gray-900"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              placeholder="+54 11 1234-5678"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:border-purple-700 
              focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 
              transition-all placeholder:text-gray-400 text-gray-900"
            />
          </div>

          {/* Rubro */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Rubro
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rubro"
                  value="general"
                  required
                  className="w-4 h-4 accent-purple-700"
                />
                <span className="text-gray-700">General</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rubro"
                  value="gastronomico"
                  required
                  className="w-4 h-4 accent-purple-700"
                />
                <span className="text-gray-700">Gastronómico</span>
              </label>
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:border-purple-700 
              focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 
              transition-all placeholder:text-gray-400 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-3 rounded-lg 
            hover:bg-purple-900 transition-all duration-300 
            shadow-md hover:shadow-lg mt-4"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿Ya tenés cuenta?{" "}
          <a href="/auth/login" className="text-purple-700 font-semibold hover:text-purple-900">
            Iniciá sesión aquí
          </a>
        </p>
      </div>
    </div>
  </div>
);

}
