export const checkCookies = (): boolean => {
    try {
        const testKey = "cookie_test";
        document.cookie = `${testKey}=1; Path=/; SameSite=Strict`;
        const enabled = document.cookie.indexOf(`${testKey}=`) !== -1;
        document.cookie = `${testKey}=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        return enabled;
    } catch {
        return false;
    }
};