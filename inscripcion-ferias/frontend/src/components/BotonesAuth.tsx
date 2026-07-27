"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { Usuario } from "@/types/RegisterDto";
import { usePathname } from "next/navigation";
import Perfil from "./Perfil";

type BotonesAuthProps = {
  onAction?: () => void;
};

export default function BotonesAuth({ onAction }: BotonesAuthProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<Usuario>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const me = await authService.me();
        setUser(me);
      } catch {
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [pathname]);

  if (loading) {
  return (
    <div className="flex items-center gap-4 animate-pulse">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="h-5 w-32 bg-gray-200 rounded"></div>
    </div>
  );
}

  if (user) {
    return <Perfil nombre={user.nombre} onAction={onAction} />;
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/auth/login"
        onClick={onAction}
        className="px-6 py-2 text-purple-700 font-semibold text-sm hover:text-purple-900 transition-colors duration-300"
      >
        Iniciar sesión
      </Link>

      <Link
        href="/auth/register"
        onClick={onAction}
        className="px-6 py-2 bg-purple-700 text-white font-semibold text-sm rounded hover:bg-purple-900 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Registrarse
      </Link>
    </div>
  );
}
