"use server";

import { authService } from "@/services/authService";

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        console.log(email)
        console.log(password)
        const data = await authService.login(email, password);
        return { ok: true, data };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, message: e.message };
        }
        return { ok: false, message: "Error desconocido" };
    }

}
