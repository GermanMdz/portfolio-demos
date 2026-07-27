import { RegisterDto } from "@/types/RegisterDto";
import { authFetch } from "./authFetch";

export const authService = {
    login: async (email: string, password: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/;`;
        return data;
    },

    logout: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Error al cerrar sesión: ${data.error}`);
        }
        document.cookie = "token=; Max-Age=0; path=/";
        return data;
    },

    register: async (userData: RegisterDto) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/;`;
        return data;
    },

    refresh: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al refrescar token: ${errorData.error}`);
        }
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/;`;
        return data;
    },

    me: async () => {
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

        const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, "POST", {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error("Primero debes iniciar sesion");
        }
        const data = await res.json();
        return data;
    }
}