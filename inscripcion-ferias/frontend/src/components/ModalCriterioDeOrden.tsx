"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  criterio: "llegada" | "prioridad" | null;
  setCriterio: (c: "llegada" | "prioridad" | null) => void;
  onConfirm: () => void;
}

export default function ModalSeleccionCriterio({
  open,
  onClose,
  criterio,
  setCriterio,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Seleccionar criterio
        </h2>

        <div className="space-y-3 mb-8">
          <button
            onClick={() => setCriterio("llegada")}
            className={`w-full px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
              criterio === "llegada"
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white text-gray-900 border-gray-300 hover:border-purple-700"
            }`}
          >
            Orden de llegada
          </button>

          <button
            onClick={() => setCriterio("prioridad")}
            className={`w-full px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
              criterio === "prioridad"
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white text-gray-900 border-gray-300 hover:border-purple-700"
            }`}
          >
            Prioridades
          </button>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>

          <button
            disabled={!criterio}
            onClick={onConfirm}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              criterio
                ? "bg-purple-700 text-white hover:bg-purple-900 shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}