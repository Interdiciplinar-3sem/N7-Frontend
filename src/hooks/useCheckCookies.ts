let cachedResult: boolean | null = null;

export const checkCookies = (): boolean => {
    if (cachedResult !== null) return cachedResult;
    try {
        const testKey = "cookie_test";
        document.cookie = `${testKey}=1; Path=/; SameSite=Strict`;
        const enabled = document.cookie.indexOf(`${testKey}=`) !== -1;
        document.cookie = `${testKey}=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        cachedResult = enabled;
        return cachedResult;
    } catch {
        cachedResult = false;
        return false;
    }
};