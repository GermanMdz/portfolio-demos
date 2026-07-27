import { authFetch } from "./authFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const inscripcionService = {
  subscribe: async (usuarioId: number, feriaId: number) => {
    const token = obtenerToken();
    const res = await authFetch(`${API_URL}/feria/inscribir`, "POST", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ usuarioId, feriaId }),
    });
    return setResponce(res);
  },

  getSubscriptions: async (id: number) => {
    const token = obtenerToken();
    const res = await authFetch(`${API_URL}/feria/${id}/inscripciones`, "GET", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return setResponce(res);
  },

  generarListados: async (id: number, criterio: string) => {
    const token = obtenerToken();
    const res = await authFetch(`${API_URL}/feria/${id}/inscripciones/${criterio}`, "GET", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return setResponce(res);
  }
};

function obtenerToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}
async function setResponce(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
}