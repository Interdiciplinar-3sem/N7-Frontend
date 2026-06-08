export async function parseResponse<T>(response: Response): Promise<T> {
    const contentType =
        response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
        return await response.json();
    }

    const text = await response.text();

    return text as T;
}