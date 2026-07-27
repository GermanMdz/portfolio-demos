import { authService } from "./authService";

export const authFetch = async (url: string, method: string, options: RequestInit = {}) => {
  const newReq: RequestInit = {
    ...options,
    method,
    headers: {
      "ngrok-skip-browser-warning": "69420",
      ...(options.headers || {})
    },
    credentials: "include"
  };

  // primera solicitud
  let res: Response;
  try {
    res = await fetch(url, newReq);
  } catch (err) {
    // fallo de red
    console.error("authFetch: network error", err, { url, method, options: newReq });
    throw err;
  }
  if (res.status === 401) {
    console.warn("authFetch: got 401, trying refresh", { url, method });
    try {
      const refreshResult = await authService.refresh();
      // authService.refresh should return an object containing `token`
      const token = refreshResult.token;
      if (!token) {
        console.error("authFetch: refresh succeeded but no token returned", refreshResult);
        return res; // devolver original 401
      }

      // Reintentar la solicitud original con Authorization
      const retryReq: RequestInit = {
        ...newReq,
        headers: {
          ...(newReq.headers as Record<string, string>),
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const retryRes = await fetch(url, retryReq);
        return retryRes;
      } catch (retryErr) {
        console.error("authFetch: retry fetch failed", retryErr);
        return res; // devolver original 401
      }
    } catch (refreshErr) {
      // refresh falló (por ejemplo no hay refreshToken cookie)
      console.warn("authFetch: refresh failed", refreshErr);
      return res;
    }
  }

  return res;
};


