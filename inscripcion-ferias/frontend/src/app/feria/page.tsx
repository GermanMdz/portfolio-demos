"use client";

import { useEffect, useState } from "react";
import { Feria } from "@/types/feria";
import { feriaService } from "@/services/feriaServices";
import FeriaCard from "@/components/FeriaCard";
import { authService } from "@/services/authService";

export default function Ferias() {
  const [ferias, setFerias] = useState<Feria[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await feriaService.getUpcoming();
        setFerias(data);
      } catch (e) {
        console.error(e);
      }
    }

    loadData();
  }, []);

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Próximas ferias
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl">
            Explorá las ferias disponibles e inscribite para participar
          </p>
        </div>
      </section>

      {/* LISTADO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid gap-6">
          {ferias.map((feria) => (
            <FeriaCard key={feria.id} feria={feria} />
          ))}
        </div>
      </section>
    </div>
  );
}
