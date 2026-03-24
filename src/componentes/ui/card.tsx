import type { LucideIcon } from "lucide-react"

type CardProps = {
    icone: LucideIcon;
    titulo: string;
    texto: string;
    className: string;
}

export function Card({ icone: Icone, titulo, texto, className }: CardProps) {
    return (
        <div className={`
            w-full
            min-h-28 xxs:min-h-65 md:min-h-75 lg:min-h-85
            rounded-3xl shadow-[0_12px_30px_rgba(76,154,228,0.35)]
            grid grid-cols-5 grid-rows-5 text-white
            ${className}
        `}>
            <div className="col-span-1 row-span-5 p-6 "><Icone className="text-purple-950 h-3 w-3 xxs:h-7 xxs:w-7 lg:h-10 lg:w-10" /></div>
            <h2 className="col-span-4 row-span-2 p-6 font-bold text-xs xxs:text-lg md:text-2xl lg:text-4xl">{titulo}</h2>
            <h2 className="col-span-4 row-span-3 p-6 font-normal text-xs xxs:text-sm md:text-lg lg:text-3xl">{texto}</h2>
        </div>
    )
}