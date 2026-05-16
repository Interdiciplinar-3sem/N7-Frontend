import React, { createContext, useContext, useState } from "react";

type ToastContextType = {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState<"Erro" | "Sucesso" | "">("");
    const [message, setMessage] = useState("");

    const showSuccess = (msg: string) => {
        setMessage(msg);
        setIsVisible("Sucesso");
        
        setTimeout(() => {
            setIsVisible("");
        }, 3000);
    };

    const showError = (msg: string) => {
        setMessage(msg);
        setIsVisible("Erro");

        setTimeout(() => {
            setIsVisible("")
        }, 3000);

    }

    return (
        <ToastContext.Provider value={{ showSuccess, showError }}>
            {children}
            {isVisible != "" && (
                <div 
                    className={`fixed bottom-6 right-6 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-9999
                        ${isVisible == "Erro" ? "bg-red-500" : "bg-green-500"}
                    `}
                >
                    {message}
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
