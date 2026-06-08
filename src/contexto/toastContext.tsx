import React, { createContext, useContext, useState, useEffect } from "react";

type ToastContextType = {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    confirm: (options: ConfirmOptions) => Promise<boolean>;
};

type ConfirmOptions = {
    title: string;
    message: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState<"Erro" | "Sucesso" | "">("");
    const [message, setMessage] = useState("");

    const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    const showSuccess = (msg: string) => {
        setMessage(msg);
        setIsVisible("Sucesso");

        setTimeout(() => setIsVisible(""), 3000);
    };

    const showError = (msg: string) => {
        setMessage(msg);
        setIsVisible("Erro");

        setTimeout(() => setIsVisible(""), 3000);
    };

    const confirm = (options: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => {
            setConfirmOptions(options);
            setResolver(() => resolve);
        });
    };

    const handleConfirm = (value: boolean) => {
        if (resolver) {
            resolver(value);
        }
        setResolver(null);
        setConfirmOptions(null);
    };

    useEffect(() => {
        return () => {
            if (resolver) {
                resolver(false);
            }
        };
    }, [resolver]);

    return (
        <ToastContext.Provider value={{ showSuccess, showError, confirm }}>
            {children}

            {isVisible && (
                <div
                    className={`fixed bottom-6 right-6 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-9999
                        ${isVisible === "Erro" ? "bg-red-500" : "bg-green-500"}
                    `}
                >
                    {message}
                </div>
            )}

            {confirmOptions && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                        <h2 className="text-xl font-bold">
                            {confirmOptions.title}
                        </h2>

                        <p className="mt-3 text-slate-600">
                            {confirmOptions.message}
                        </p>

                        {confirmOptions.description && (
                            <p className="text-sm font-thin mt-2 text-slate-500">
                                {confirmOptions.description}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                onClick={() => handleConfirm(false)}
                                className="rounded-xl border px-4 py-2"
                            >
                                {confirmOptions.cancelText ?? "Cancelar"}
                            </button>

                            <button
                                onClick={() => handleConfirm(true)}
                                className="rounded-xl bg-red-600 px-4 py-2 text-white"
                            >
                                {confirmOptions.confirmText ?? "Confirmar"}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast deve ser usado dentro de ToastProvider");
    }
    return context;
}