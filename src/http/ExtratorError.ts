import { ApiError } from "./apiError";
import { parseResponse } from "./parser";

export async function extractError(
    response: Response
): Promise<ApiError> {
    try {
        const body = await parseResponse<any>(response);
       
        if (typeof body === "string") {
            return new ApiError(
                response.status,
                body    
            );
        }

        return new ApiError(
            response.status,
            body?.message ??
            body?.error ??
            "Erro inesperado",
            body
        );
    } catch {
        return new ApiError(
            response.status,
            response.statusText
        );
    }
}