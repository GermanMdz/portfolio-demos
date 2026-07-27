import { Feria } from "@/types/feria";
import { mapearFechaCorta } from "@/utils/mapearFecha";
import Link from "next/link";

interface FeriaCardProps {
  feria: Feria;
}

export default function FeriaCard({ feria }: FeriaCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      
      <div>
        <h2 className="text-2xl font-bold text-purple-700 mb-2">
          {feria.nombre}
        </h2>
        <p className="text-gray-600 mb-1">
          📍 {feria.direccion}
        </p>
        <p className="text-gray-600">
          📆 {mapearFechaCorta(feria.fecha)}
        </p>
      </div>

      <Link
        href={`/feria/${feria.id}`}
        className="self-start sm:self-auto px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors shadow-md"
      >
        Ver detalles
      </Link>
    </div>
  );
}
