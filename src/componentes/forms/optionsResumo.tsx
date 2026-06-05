import { Copy, FileText, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

type OptionsResumoProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOptionsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function OptionsResumo({setIsFormOpen, setIsOptionsFormOpen}: OptionsResumoProps){
    const navigate = useNavigate();
    const handleOptionCopiaEColaClick = () => {
        setIsFormOpen(true);
        setIsOptionsFormOpen(false);
    }
    const handleOptionEscrevaResumoClick = () => {
        navigate("/resumo");
        setIsOptionsFormOpen(false);
    }

    const CardOption = ({ 
        icon: Icon, 
        title, 
        description, 
        onClick, 
        disabled = false 
    }: {
        icon: React.ComponentType<{size?: number; className?: string}>;
        title: string;
        description: string;
        onClick?: () => void;
        disabled?: boolean;
    }) => (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`
                col-span-1 row-span-1 flex flex-col justify-center items-center text-center rounded-2xl 
                border-2 p-6 gap-3 transition-all duration-300
                ${disabled 
                    ? 'bg-gray-50 border-gray-300 cursor-not-allowed opacity-60 hover:opacity-70' 
                    : 'bg-[#F8F8F6] border-blue-200 cursor-pointer hover:border-blue-400 hover:shadow-lg hover:scale-105 active:scale-95'
                }
            `}
        >
            <Icon size={48} className={disabled ? 'text-gray-400' : 'text-blue-500'} />
            <h2 className="font-bold text-xs xs:text-sm sm:text-lg">
                {title}
            </h2>
            <p className="max-w-2/3 hidden xl:flex text-xs xl:text-sm text-gray-600">
                {description}
            </p>
            {disabled && <span className="text-xs text-gray-400">Em breve</span>}
        </button>
    );

    return (
        <main className="fixed top-1/2 left-1/2 z-100 -translate-x-1/2 -translate-y-1/2 min-w-2/3 sm:min-w-auto lg:min-w-1/2 lg:min-h-2/3 flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 p-4 gap-4">            
            <CardOption 
                icon={Copy}
                title="Copia e Cola"
                description="Crie seus resumos rapidamente apenas copiando e colando o conteúdo desejado."
                onClick={handleOptionCopiaEColaClick}
            />
            <CardOption 
                icon={FileText}
                title="Escreva seu resumo - BETA"
                description="Crie seus resumos escrevendo diretamente no campo de texto."
                onClick={handleOptionEscrevaResumoClick}
            />
            <CardOption 
                icon={Upload}
                title="Upload de arquivo"
                description="Crie seus resumos enviando arquivos de texto ou PDF."
                disabled
            />
        </main>
    )
}