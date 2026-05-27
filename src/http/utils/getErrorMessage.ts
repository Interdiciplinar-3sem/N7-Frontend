export const getErrorMessage = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
        try {
            const parsed = JSON.parse(error.message) as { message?: string }
            return parsed.message ?? fallback
        } catch {
            return error.message || fallback
        }
    }

    return fallback
}
