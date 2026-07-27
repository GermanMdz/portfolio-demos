"use client";

import Link from "next/link";

type PerfilProps = {
  nombre?: string;
  onAction?: () => void;
};


export default function Perfil({ nombre = "Usuario", onAction }: PerfilProps) {
  const inicial = nombre.charAt(0).toUpperCase();

  return (
    <Link
      href="/usuario/perfil"
      onClick={onAction}
      className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-full transition-colors"
    >
      {/* Circulo con inicial */}
      <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-semibold">
        {inicial}
      </div>

      {/* Nombre (solo desktop) */}
      <span className="text-sm font-semibold text-purple-700">
        {nombre}
      </span>
    </Link>
  );
}
