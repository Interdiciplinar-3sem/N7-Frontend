import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge"

type CardPerfilProps = {
    onSelectUser?: () => void;
    studentId: number;
    nome: string;
    semestre: number;
    seguidores: number;
    url?: string;
    className?: string;
}

export function CardPerfil({studentId, nome, semestre, seguidores, url, className, onSelectUser}: CardPerfilProps) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/perfil/${studentId}`);
        onSelectUser?.();
    }

    return (
         <div 
            onClick={handleRedirect}
            className={twMerge("group bg-[#F8FAFC] opacity-90 shadow-lg max-w-72 max-h-20 flex gap-4 relative z-51 p-4 rounded-lg hover:bg-[#DAE8FF] hover:scale-105 overflow-hidden transform transition-transform cursor-pointer hover:shadow-lg", className)}
        >
            <div className="flex justify-center items-center">
                 <div
                    className="
                        min-w-10
                        min-h-10
                        rounded-full
                        bg-cover
                        bg-center
                        bg-zinc-300
                        pointer-events-none
                    "
                    style={{
                        backgroundImage: url ? `url(${url})` : 'none'
                    }}
                />
            </div>
            <div className="flex flex-col justify-center flex-1">
                <h2 className="group-hover:font-bold">{nome}</h2>
                <h2 className="text-xs">semestre: {semestre}</h2>
            </div>
            <div className="flex justify-end items-end p-2 text-xs">{seguidores}</div>
        </div>
    )
}