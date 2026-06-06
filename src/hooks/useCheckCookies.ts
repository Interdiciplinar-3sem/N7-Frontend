export const checkCookies = (): boolean => {
    try {
        document.cookie = "cookie_test=1; SameSite=Strict";
        const enabled = document.cookie.indexOf("cookie_test=") !== -1;
        document.cookie = "cookie_test=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        return enabled;
    } catch {
        return false;
    }
};