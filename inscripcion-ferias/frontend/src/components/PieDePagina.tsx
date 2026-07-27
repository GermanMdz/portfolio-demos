'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PieDePagina() {
  const pathname = usePathname();

  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <footer className="bg-gray-100 border-t-2 border-gray-200 py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-purple-700 mb-4">Contacto</h4>
            <p className="text-gray-600 text-sm">
              Municipalidad de Vicente López
            </p>
          </div>
          <div>
            <h4 className="font-bold text-purple-700 mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-purple-700">
                  Trámites
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-700">
                  Servicios
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-700 mb-4">Redes</h4>
            <p className="text-gray-600 text-sm">Síguenos en nuestras redes</p>
          </div>
        </div>
      </div>
    </footer>
  );
}