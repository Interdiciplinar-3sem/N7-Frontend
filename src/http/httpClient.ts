import { authFecth } from "./authFetch";
import { extractError } from "./ExtratorError";
import { parseResponse } from "./parser";

type RequestConfig = {
    throwOnError?: boolean;
};

export async function request<T>(
    url: string,
    options?: RequestInit,
    config?: RequestConfig
): Promise<T> {

    const response =
        await authFecth(url, options);

    if (!response.ok && config?.throwOnError !== false) {
        throw await extractError(response);
    }   

    return parseResponse<T>(response);
}