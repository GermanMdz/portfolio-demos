"use client";

import { authService } from "@/services/authService";
import { LoginDto } from "@/types/RegisterDto";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState("");
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const newUser: LoginDto = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await authService.login(newUser.email,newUser.password);
      router.push("/");
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
      <div className="relative z-10 ">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
          ¡Bienvenido nuevamente!
        </h1>

        <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8">
          Aquí puedes iniciar sesión y realizar tus inscripciones de manera rápida y sencilla.
        </p>
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

        <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2 text-center">
          Iniciar sesión
        </h2>

        <p className="text-gray-500 text-center mb-6 md:mb-8 text-sm">
          Ingresá tus credenciales para acceder
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:border-purple-700 
              focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 
              transition-all placeholder:text-gray-400 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:border-purple-700 
              focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 
              transition-all placeholder:text-gray-400 text-gray-900"
            />

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-purple-700 hover:text-purple-900 text-sm font-medium"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-3 rounded-lg 
            hover:bg-purple-900 transition-all duration-300 
            shadow-md hover:shadow-lg mt-4"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tenés cuenta?{" "}
          <a
            href="/auth/register"
            className="text-purple-700 font-semibold hover:text-purple-900"
          >
            Registrate aquí
          </a>
        </p>
      </div>
    </div>
  </div>
);


}
