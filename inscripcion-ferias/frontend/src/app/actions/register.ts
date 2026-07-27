"use server";

import { authService } from "@/services/authService";
import { RegisterDto } from "@/types/RegisterDto";

export async function registerAction(formData: FormData) {
    const data = formDataToRegisterDto();
    try {
        const result = await authService.register(data);
        return { ok: true, result };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, message: e.message };
        }
        return { ok: false, message: "Error desconocido" };
    }


    function formDataToRegisterDto(): RegisterDto {
        return {
            nombre: formData.get("nombre") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            rubro: formData.get("rubro") as string,
            telefono: formData.get("telefono") as string,
        };
    }
}
