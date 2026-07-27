"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { feriaService } from "@/services/feriaServices";
import { inscripcionService } from "@/services/inscripcionService";
import { Feria } from "@/types/feria";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Usuario } from "@/types/RegisterDto";
import { mapearFecha } from "@/utils/mapearFecha";

export default function GetFeria() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const [feria, setFeria] = useState<Feria>();
  const [user, setUser] = useState<Usuario>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({
    type: null,
    message: null,
  });

  // TODO: agregar url de imagen en la base de datos
  const imagen =
    "https://instagram.faep6-1.fna.fbcdn.net/v/t51.82787-15/583048393_17866480173493255_86627275770999194_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&cb=8438d1d6-0aee74db&ig_cache_key=Mzc2OTMzODU0MjM1MTYwODUxNA%3D%3D.3-ccb7-5-cb8438d1d6-0aee74db&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0MDR4MTc1My5zZHIuQzMifQ%3D%3D&_nc_ohc=ME4t3MXskLkQ7kNvwGclYpR&_nc_oc=AdnOhuLJalbtTlP9_7U_-3-jVT_YEzqjNH5awMS9xDXLxhSPcaJA1j4N2iyQ53I0Tp8PfqxbciOurqgCeL_SQH-H&_nc_zt=23&_nc_ht=instagram.faep6-1.fna&_nc_gid=diq2WaKgZCFG3MLqo_zL1Q&oh=00_Afk6CXOVl-cz85lge2ZswX4E8daxexEbjnzR_hfhKwF6gQ&oe=693E1629";
  useEffect(() => {
    const fetchFeria = async () => {
      try {
        const data = await feriaService.getById(id);
        setFeria(data);
        const me = await authService.me();
        setUser(me);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchFeria();
  }, [id]);

  const handleSubscribe = async () => {
    if (status.type === "success") {
      return; // ya hubo éxito, no cambiamos el mensaje
    }
    setStatus({ type: null, message: null });
    try {
      const usuario = await authService.me();
      console.log("Respuesta del servicio:", usuario);
      await inscripcionService.subscribe(usuario.id, feria!.id!);
      setStatus({ type: "success", message: "Inscripción exitosa" });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Error desconocido, intenta mas tarde";
      setStatus({ type: "error", message: message });
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-purple-700">Cargando...</h1>
      </main>
    );
  }

  if (!feria) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-purple-700">
          Feria no encontrada
        </h1>
      </main>
    );
  }

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{feria.nombre}</h1>
          <p className="text-blue-100 text-xl">📍 {feria.direccion}</p>
        </div>
      </section>

      {/* INFO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Detalles */}
          <div className="bg-transparent rounded-xl shadow-none overflow-visible">
            {imagen ? (
              /* CON IMAGEN */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-2">
                <div className="w-full h-125 bg-white shadow-md flex items-center justify-center rounded-lg overflow-hidden relative">
                  <Image
                    src={imagen}
                    alt={`Imagen de ${feria.nombre}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <Info feria={feria} />
              </div>
            ) : (
              /* SIN IMAGEN */
              <Info feria={feria} horizontal />
            )}
          </div>

          {/* Mensaje de Exito o Error */}
            <div
              className={`mx-auto mt-4 px-4 py-3 rounded text-sm text-center transition-all duration-500 ease-out
                ${ status.message
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }
                ${ status.type === "error"
                    ? "bg-red-50 border border-red-200 text-red-700 font-medium"
                    : "bg-green-50 border border-green-200 text-green-700 font-medium"
                }`}>
              {status.message}
            </div>

          {/* CTA */}
          <div className="bg-white rounded-xl shadow p-8 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center justify-center items-center">
            <p className="text-gray-700 text-lg">
              {user?.role === "admin"
                ? "¿Querés ver las inscripciones actuales?"
                : "¿Querés participar de esta feria?"}
            </p>

            <div className="flex gap-4">
              {user?.role !== "admin" && (
                <button
                  onClick={handleSubscribe}
                  className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors shadow-md"
                >
                  Inscribirse
                </button>
              )}

              {user?.role === "admin" && (
                <Link
                  href={`/feria/${feria.id}/inscripciones`}
                  className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Ver inscripciones
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({
  feria,
  horizontal = false,
}: {
  feria: Feria;
  horizontal?: boolean;
}) {
  return (
    <div
      className={`
        bg-white shadow-md rounded-lg
        ${
          horizontal
            ? "flex flex-col sm:flex-row sm:flex-wrap sm:justify-around sm:items-center gap-6 px-6 py-4"
            : "flex flex-col justify-center space-y-15 p-6 lg:p-8"
        }
      `}
    >
      <Item icon="📅" label="Fecha" value={mapearFecha(feria.fecha)} />
      <Item
        icon="🕐"
        label="Horario"
        value={`${feria.horaInicio} - ${feria.horaFin}`}
      />
      <Item icon="📍" label="Dirección" value={feria.direccion} />
      {/* <Item icon="👥" label="Cupo disponible" value={feria.cupo} /> */}
    </div>
  );
}
function Item({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800 text-sm">{value}</p>
      </div>
    </div>
  );
}

