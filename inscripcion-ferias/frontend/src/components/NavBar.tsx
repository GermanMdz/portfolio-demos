import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BotonesAuth from "./BotonesAuth";
import { authService } from "@/services/authService";
import { Usuario } from "@/types/RegisterDto";
import { usePathname } from "next/navigation";

export default function Navbar({
  isActive,
}: {
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Usuario>();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.me();
        setUser(userData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  }, [pathname]);

  const menuItems = [
    { label: "INICIO", href: "/" },
    { label: "FERIAS", href: "/feria" },
    ...(user?.role === "admin" ? [{ label: "CREAR", href: "/feria/crear" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative">
  {/* Logo */}
  <div className="flex-shrink-0">
    <Link href="/">
      <Image
        src="/logo-mvl.png"
        alt="Vivamos Vicente López"
        width={150}
        height={50}
        className="h-auto"
      />
    </Link>
  </div>

  {/* Menú desktop - CENTRADO ABSOLUTO */}
  <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 justify-center gap-10 items-center">
    {menuItems.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          className={`font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ${
            isActive(item.href)
              ? "text-green-700"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>

        {/* Botones desktop */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <BotonesAuth />
        </div>

        {/* Hamburger mobile */}
        <div className="flex md:hidden items-center ml-auto">
          <button
            className="flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Abrir menú</span>
            {open ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Panel mobile */}
      <div
        className={`fixed inset-0 my-20 md:hidden transition-all duration-300 ease-out 
          ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setOpen(false)}
      >
        <div
          className={`bg-white border-t border-gray-200 shadow-sm transform transition-transform duration-300 ease-out
            ${open ? "translate-y-0" : "-translate-y-6"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center px-4 py-4">
            {/* Links */}
            <ul className="flex flex-col gap-4 w-full items-center">
              {menuItems.map((item) => (
                <li key={item.href} className="w-full text-center">
                  <Link
                    href={item.href}
                    className="font-semibold text-gray-700 hover:text-green-700 px-5 py-2 inline-block"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Separador */}
            <div className="w-full border-t border-gray-300 my-3"></div>

            {/* Botones Auth */}
            <div className="w-full flex flex-col items-center">
              <BotonesAuth onAction={() => setOpen(false)} />
            </div>
          </div>
        </div>
      </div>

      {/* Barra multicolor */}
      <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-green-400 via-teal-500 to-blue-600"></div>
    </header>
  );
}