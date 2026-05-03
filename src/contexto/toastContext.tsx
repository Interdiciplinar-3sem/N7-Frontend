import React, { createContext, useContext, useState } from "react";

type ToastContextType = {
    showSuccess: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");

    const showSuccess = (msg: string) => {
        setMessage(msg);
        setIsVisible(true);
        
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showSuccess }}>
            {children}
            {isVisible && (
                <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-[9999]">
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
