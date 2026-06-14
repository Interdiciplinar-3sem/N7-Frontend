const GA_ID = "G-BT6XGVJRCN";

let initialized = false;

export function initAnalytics() {
    if (initialized || typeof window === "undefined") return;
    initialized = true;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
        window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_ID, { 
        send_page_view: true,
    });
}

export function trackPageView(path: string) {
    if (!window.gtag) return;
    window.gtag("event", "page_view", {
        page_path: path,
    });
}

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}