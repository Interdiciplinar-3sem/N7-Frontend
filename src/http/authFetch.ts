import { checkCookies } from "../hooks/useCheckCookies";

const getToken = () => localStorage.getItem("accessToken");

export async function authFecth(
    input: RequestInfo,
    options: RequestInit = {}
): Promise<Response> {

    const cookiesWork = checkCookies();

    const token = !cookiesWork
        ? getToken()
        : null;

    const headers = new Headers(options.headers);

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    return fetch(input, {
        ...options,
        headers,
        credentials: cookiesWork
            ? "include"
            : "omit",
    });
}