"use client";

import { usuarioService } from "@/services/usuarioService";
import { Feria } from "@/types/feria";
import { DatosUsuarioIncripcion } from "@/types/RegisterDto";
import { ArrowUp, ArrowDown } from "lucide-react";

type ResultadoListas = {
  aprobados: DatosUsuarioIncripcion[];
  listaEspera: DatosUsuarioIncripcion[];
  rechazados: DatosUsuarioIncripcion[];
  proximos: DatosUsuarioIncripcion[];
};
type ListaKey = keyof ResultadoListas;

export default function ModalResultadoListados({
  open,
  onClose,
  resultado,
  setResultado,
  feria,
}: {
  open: boolean;
  onClose: () => void;
  resultado: {
    aprobados: DatosUsuarioIncripcion[];
    listaEspera: DatosUsuarioIncripcion[];
    rechazados: DatosUsuarioIncripcion[];
    proximos: DatosUsuarioIncripcion[];
  } | null;
  setResultado: (r: ResultadoListas) => void;
  feria: Feria;
}) {
  if (!open || !resultado) return null;

  const data = {
    aprobados: resultado.aprobados ?? [],
    listaEspera: resultado.listaEspera ?? [],
    rechazados: resultado.rechazados ?? [],
    proximos: resultado.proximos ?? [],
  };

  const { aprobados, listaEspera, rechazados, proximos } = data;

  function mover(
    usuario: DatosUsuarioIncripcion,
    desde: ListaKey,
    hacia: ListaKey
  ) {
    const nuevo = {
      aprobados: [...aprobados],
      listaEspera: [...listaEspera],
      rechazados: [...rechazados],
      proximos: [...proximos],
    };
    nuevo[desde] = nuevo[desde].filter((u) => u.id !== usuario.id);
    nuevo[hacia].push(usuario);
    setResultado(nuevo);
  }

  function renderUsuario(
    usuario: DatosUsuarioIncripcion,
    estado: "aprobados" | "listaEspera" | "rechazados"
  ) {
    return (
      <li
        key={usuario.id}
        className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{usuario.nombre}</p>
          <p className="text-gray-600 text-sm truncate">{usuario.email}</p>
        </div>

        <div className="flex gap-2 ml-4 flex-shrink-0">
          {/* FLECHA ARRIBA */}
          {estado !== "aprobados" && (
            <button
              className="p-2 hover:bg-purple-100 text-purple-700 rounded cursor-pointer transition-colors"
              onClick={() =>
                mover(
                  usuario,
                  estado,
                  estado === "listaEspera" ? "aprobados" : "listaEspera"
                )
              }
              title="Mover arriba"
            >
              <ArrowUp size={18} />
            </button>
          )}

          {/* FLECHA ABAJO */}
          {estado !== "rechazados" && (
            <button
              className="p-2 hover:bg-red-100 text-red-700 rounded cursor-pointer transition-colors"
              onClick={() =>
                mover(
                  usuario,
                  estado,
                  estado === "listaEspera" ? "rechazados" : "listaEspera"
                )
              }
              title="Mover abajo"
            >
              <ArrowDown size={18} />
            </button>
          )}
        </div>
      </li>
    );
  }

  function agruparPorRubro(usuarios: DatosUsuarioIncripcion[]) {
    return {
      general: usuarios.filter((u) => u.rubro === "general"),
      gastronomico: usuarios.filter((u) => u.rubro === "gastronomico"),
    };
  }

  async function guardarListados() {
    if (!resultado) return;

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const marginX = 10;
    let y = 15;

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Listado de Inscripciones", marginX, y);
    y += 8;
    doc.setFontSize(15);
    doc.setFont("helvetica", "normal");
    doc.text(feria.nombre, marginX, y);
    y += 12;

    // Separador inicial
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, 195, y);
    y += 12;

    const imprimirUsuarios = (lista: DatosUsuarioIncripcion[]) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      if (lista.length === 0) {
        doc.setTextColor(120);
        doc.text("— Ninguno —", marginX + 5, y);
        doc.setTextColor(0);
        y += 10;
        return;
      }

      lista.forEach((u) => {
        doc.text(u.nombre, marginX + 5, y);
        doc.text(`tel: ${u.telefono} — ${u.email}`, marginX + 80, y);
        y += 8;

        if (y > 280) {
          doc.addPage();
          y = 15;
        }
      });

      y += 6;
    };

    // ORDEN
    aprobados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    listaEspera.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // ========= CONFIRMADOS (con rubro) =========
    const { general, gastronomico } = agruparPorRubro(resultado.aprobados);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Confirmados (${aprobados.length})`, marginX, y);
    y += 10;

    imprimirUsuarios(general);

    if (gastronomico.length) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Gastronómicos", marginX + 5, y);
      y += 8;

      imprimirUsuarios(gastronomico);
    }
    doc.setLineWidth(0.3);
    doc.line(marginX, y, 195, y);
    y += 12;

    // ========= SUPLENTES (sin rubro) =========
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Suplentes (${listaEspera.length})`, marginX, y);
    y += 10;

    imprimirUsuarios(resultado.listaEspera);
    doc.line(marginX, y, 195, y);
    y += 12;
    doc.save("listados.pdf");

    // ========= UPDATE =========
    try {
      const actualizar = (users: DatosUsuarioIncripcion[], estado: string) =>
        Promise.all(
          users.map((u) =>
            usuarioService.actualizar(
              u.id,
              "ultimaInscripcion",
              estado,
              feria.id
            )
          )
        );

      await actualizar(aprobados, "confirmado");
      await actualizar(listaEspera, "suplente");
      await actualizar(rechazados, "rechazado");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="flex flex-col max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
            <h2 className="text-3xl font-bold text-purple-700">
              Resultado de listados
            </h2>

            <div className="flex items-center gap-2 text-gray-700">
              {/* Tooltip */}
              <div className="flex items-center gap-2 text-gray-600">
                <span>Cupo máximo: {feria.cupo}</span>
                <span className="relative group">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-bold cursor-default">
                    !
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-full mt-2 w-56 text-xs text-white bg-gray-800 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                    La cantidad de confirmados puede ser excedida
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* CONFIRMADOS */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              Confirmados ({aprobados.length})
            </h3>

            {aprobados.length === 0 ? (
              <p className="text-gray-500 italic">Ninguno</p>
            ) : (
              <ul className="space-y-3">
                {(() => {
                  const { general, gastronomico } = agruparPorRubro(aprobados);

                  return (
                    <>
                      {general.map((u) => renderUsuario(u, "aprobados"))}

                      {gastronomico.length > 0 && (
                        <>
                          <li className="mt-4 text-sm font-semibold text-gray-600">
                            Gastronómicos
                          </li>
                          {gastronomico.map((u) =>
                            renderUsuario(u, "aprobados")
                          )}
                        </>
                      )}
                    </>
                  );
                })()}
              </ul>
            )}
          </section>

          {/* SUPLENTES */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-yellow-700 mb-4">
              Suplentes ({listaEspera.length})
            </h3>

            {listaEspera.length === 0 ? (
              <p className="text-gray-500 italic">Ninguno</p>
            ) : (
              <ul className="space-y-3">
                {(() => {
                  const { general, gastronomico } =
                    agruparPorRubro(listaEspera);

                  return (
                    <>
                      {general.map((u) => renderUsuario(u, "listaEspera"))}

                      {gastronomico.length > 0 && (
                        <>
                          <li className="mt-4 text-sm font-semibold text-gray-600">
                            Gastronómicos
                          </li>
                          {gastronomico.map((u) =>
                            renderUsuario(u, "listaEspera")
                          )}
                        </>
                      )}
                    </>
                  );
                })()}
              </ul>
            )}
          </section>

          {/* RECHAZADOS */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-red-700 mb-4">
              Rechazados ({rechazados.length})
            </h3>

            {rechazados.length === 0 ? (
              <p className="text-gray-500 italic">Ninguno</p>
            ) : (
              <ul className="space-y-3">
                {(() => {
                  const { general, gastronomico } = agruparPorRubro(rechazados);

                  return (
                    <>
                      {general.map((u) => renderUsuario(u, "rechazados"))}

                      {gastronomico.length > 0 && (
                        <>
                          <li className="mt-4 text-sm font-semibold text-gray-600">
                            Gastronómicos
                          </li>
                          {gastronomico.map((u) =>
                            renderUsuario(u, "rechazados")
                          )}
                        </>
                      )}
                    </>
                  );
                })()}
              </ul>
            )}
          </section>

          {/* PROXIMO / PENALIZADOS */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Penalizaciones ({proximos.length})
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              No participan en esta feria quienes hayan faltado a la anterior
              feria sin justificación.
            </p>

            {proximos.length === 0 ? (
              <p className="text-gray-500 italic">Ninguno</p>
            ) : (
              <ul className="space-y-3">
                {proximos.map((u) => (
                  <li
                    key={u.id}
                    className="bg-gray-100 border border-gray-300 rounded-lg p-4"
                  >
                    <p className="font-semibold text-gray-900">{u.nombre}</p>
                    <p className="text-gray-600 text-sm">{u.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white rounded-lg border border-gray-300 text-black font-semibold hover:bg-gray-200 cursor-pointer transition-colors"
          >
            Cerrar
          </button>
          {resultado && (
            <button
              onClick={guardarListados}
              className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 cursor-pointer transition-colors shadow-md"
            >
              Guardar PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
