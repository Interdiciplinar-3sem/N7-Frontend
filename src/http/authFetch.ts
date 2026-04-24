interface FecthOptions extends RequestInit {
    headers?: Record<string, string>;
}

export function authFecth(input: RequestInfo, options: FecthOptions = {}): Promise<Response>{

    const headers: Record<string, string> = options.headers ? {...options.headers} : {}

    if(options.body && !headers["Content-Type"]){
        headers["Content-Type"] = "application/json";
    }

    return fetch(input, {
        ...options,
        headers: headers,
        credentials: "include"
    })

}