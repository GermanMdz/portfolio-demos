"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { Usuario } from "@/types/RegisterDto";
import { useRouter } from "next/navigation";

export default function PerfilUsuario() {
  const router = useRouter();
  const [user, setUser] = useState<Usuario>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const usuario = await authService.me();
        setUser(usuario);
      } catch {
        setUser(undefined);
        router.push("/auth/login");
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Skeleton simple */
  if (!user) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-10"></div>
        <div className="bg-white rounded-2xl shadow p-8 space-y-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="h-5 bg-gray-200 rounded"></div>
            <div className="h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  const inicial = user.nombre?.charAt(0).toUpperCase();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-purple-700 mb-10">
        Mi Perfil
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-700 transition group-hover:bg-purple-200">
              {inicial}
            </div>
            <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-purple-400 transition" />
          </div>

          {/* Nombre */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.nombre}
            </h2>
            <p className="text-gray-500">{user.email}</p>

            {/* Acciones */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                className="px-5 py-2 rounded-lg bg-purple-700 text-white font-semibold text-sm hover:bg-purple-900 transition"
              >
                Editar perfil
              </button>

              <button
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition"
              >
                Cambiar contraseña
              </button>

              <button
                onClick={async () => {
                  await authService.logout();
                  router.push("/auth/login");
                }}
                className="px-5 py-2 rounded-lg border border-red-300 text-red-600 font-semibold text-sm hover:bg-red-50 transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="text-lg font-medium text-gray-800">
              {user.telefono || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Rubro</p>
            <p className="text-lg font-medium text-gray-800">
              {user.rubro || "—"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
