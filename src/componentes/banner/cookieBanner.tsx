import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initAnalytics } from "../../hooks/useAnalytcs";
import { AlertTriangle, Cookie } from "lucide-react";

const STORAGE_KEY = "resumify_cookie_consent";

export type ConsentStatus = "accepted" | "declined" | null;

export function CookieBanner() {
    const [status, setStatus] = useState<ConsentStatus>(() => {
        return (localStorage.getItem(STORAGE_KEY) as ConsentStatus) ?? null;
    });

    const [visible, setVisible] = useState(false);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        if (status === null) {
            const t = setTimeout(() => setVisible(true), 120);
            return () => clearTimeout(t);
        }
    }, [status]);

    const dismiss = (chosen: "accepted" | "declined") => {
        setHiding(true);
        setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, chosen);
            setStatus(chosen);
        }, 350);
    };

    const handleAccept = () => {
        initAnalytics();
        dismiss("accepted");
    };

    const handleDecline = () => dismiss("declined");

    if (status !== null) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4"
            style={{
                transform: hiding ? "translateY(110%)" : visible ? "translateY(0)" : "translateY(110%)",
                opacity: hiding ? 0 : visible ? 1 : 0,
                transition: "transform 0.4s cubic-bezier(0.34,1.26,0.64,1), opacity 0.35s ease",
            }}
        >
            <div className="max-w-2xl mx-auto bg-[#0f1b3d]/90 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-4 sm:px-5 shadow-2xl">
                <div className="flex flex-col gap-3">

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            <AlertTriangle size={10} strokeWidth={2.5} />
                            BETA
                        </span>
                        <span className="text-white/55 text-[10px]">
                            Plataforma em fase de testes · Bugs podem ocorrer, especialmente no iPhone
                        </span>
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-white text-sm font-semibold leading-snug flex items-center gap-1.5">
                            <Cookie size={14} strokeWidth={2} />
                            Cookies & Privacidade
                        </p>
                        <p className="text-white/75 text-[11px] sm:text-xs leading-relaxed">
                            Usamos cookies para manter sua sessão autenticada com segurança.
                            Em dispositivos que bloqueiam cookies (como alguns iPhones), usamos um método alternativo —{" "}
                            <span className="text-amber-300 font-medium">nesse modo o nível de segurança é menor e não é recomendado</span>.
                            Recomendamos usar um navegador que suporte cookies para maior proteção.
                        </p>
                        <p className="text-white/75 text-[11px] sm:text-xs leading-relaxed">
                            Também usamos o <span className="text-white font-medium">Google Analytics</span> (IP anonimizado) para entender como a plataforma é utilizada. Nenhum dado pessoal é vendido ou compartilhado.
                        </p>
                        <Link
                            to="/termos"
                            className="inline-block text-[#7aaef8] text-[11px] sm:text-xs underline underline-offset-2 hover:text-white transition-colors mt-0.5"
                        >
                            Termos de Uso & Política de Privacidade →
                        </Link>
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2 xs:justify-end">
                        <button
                            onClick={handleDecline}
                            className="w-full xs:w-auto text-white/70 text-xs px-4 py-2 rounded-xl border border-white/25 hover:bg-white/10 hover:text-white transition-all duration-200 text-center"
                        >
                            Recusar Analytics
                        </button>
                        <button
                            onClick={handleAccept}
                            className="w-full xs:w-auto bg-white text-[#2d5be3] font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all duration-200 shadow text-center"
                        >
                            Aceitar tudo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}