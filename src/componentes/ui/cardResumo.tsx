import {tv, type VariantProps} from "tailwind-variants"

const cardStyle = tv({
    base: "p-6 rounded-3xl shadow-xl text-white flex flex-col justify-between transition-all hover:scale-[1.02] relative z-51",
    variants: {
        formato: {
            quadrado: "col-span-1 row-span-1",
            horizontal: 'col-span-2 row-span-1',
            vertical: 'col-span-1 row-span-2',
        },
        cor: {
            verde: 'bg-[#7BE6A4] text-black',
            salmao: 'bg-[#FED9D9] text-black',
            rosa: 'bg-[#FFCCEE] text-black',
            azul: 'bg-[#AAC7FE] text-black',
            }
    },
    defaultVariants: {
        formato: "quadrado",
    }
})


type CardProps = VariantProps<typeof cardStyle> & {
    titulo: string;
    texto: string;
    className?: string;
}

export function CardResumo({titulo, texto, className, formato, cor }: CardProps) {
    return (
        <div className={cardStyle({formato, cor, className})}>
            <div className="h-full flex flex-col ">
                <h2 className="text-lg font-medium opacity-90">{titulo}</h2>
                <p className="text-2xl mt-1 ">{texto}</p>
            </div>
        </div>
    )
}