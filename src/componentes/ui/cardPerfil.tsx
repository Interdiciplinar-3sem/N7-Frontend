import { twMerge } from "tailwind-merge"

type CardPerfilProps = {
    foto?: string; // url
    nome: string;
    semestre: number;
    seguidores: number;
    className?: string;
}

export function CardPerfil({nome, semestre, seguidores, className}: CardPerfilProps) {

    return (
         <div className={twMerge("max-w-72 max-h-10 flex gap-4 relative z-51 hover:bg-white hover:p-2 hover:text-black hover:scale-105 hover:font-bold transform transition-transform cursor-pointer hover:shadow-lg hover:w-full", className)}>
            <div className="flex justify-center items-center">
                <div className="h-5 w-5 rounded-full bg-gray-300 p-2"></div>
            </div>
            <div className="flex flex-col justify-center flex-1">
                <h2 className="">{nome}</h2>
                <h2 className="text-xs">semestre: {semestre}</h2>
            </div>
            <div className="flex justify-end items-end p-2 text-xs">{seguidores}</div>
        </div>
    )
}