import { checkCookies } from "../hooks/useCheckCookies";
const getToken = () => localStorage.getItem("accessToken");

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export async function authFecth(input: RequestInfo, options: FetchOptions = {}): Promise<Response> {
    const cookiesWork = checkCookies();
    const token = !cookiesWork ? getToken() : null;
    const headers: Record<string, string> = options.headers ? { ...options.headers } : {};

    if (options.body && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(input, {
        ...options,
        headers,
        credentials: cookiesWork ? "include" : "omit",
    });
}