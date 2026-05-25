interface FecthOptions extends RequestInit {
    headers?: Record<string, string>;
}

export async function authFecth(input: RequestInfo, options: FecthOptions = {}): Promise<Response> {
    const headers: Record<string, string> = options.headers ? { ...options.headers } : {}

    if (options.body && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(input, {
        ...options,
        headers,
        credentials: "include"
    })

    return response
}