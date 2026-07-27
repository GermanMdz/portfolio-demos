import { Feria } from "@/types/feria";
import { authFetch } from "./authFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const feriaService = {
  getAll: async () => {
    const res = await authFetch(`${API_URL}/feria`, "GET");
    return setResponce(res);
  },

  getUpcoming: async () => {
    const res = await authFetch(`${API_URL}/feria/proximas`, "GET");
    return setResponce(res);
  },

  getById: async (id: number) => {
    const res = await authFetch(`${API_URL}/feria/${id}`, "GET");
    return setResponce(res);
  },

  create: async (feria: Feria) => {
    const token = obtenerToken();
    const res = await authFetch(`${API_URL}/feria`, "POST", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(feria)
    });
    return setResponce(res);
  },

  update: async (id: number, feria: Feria) => {
    const res = await authFetch(`${API_URL}/feria/${id}`, "PUT", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feria)
    });
    return setResponce(res);
  },

  delete: async (id: number) => {
    const res = await authFetch(`${API_URL}/feria/${id}`, "DELETE");
    return setResponce(res);
  },

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

