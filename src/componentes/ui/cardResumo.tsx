import { Clock3, Heart, User } from "lucide-react";
import {tv, type VariantProps} from "tailwind-variants"

const cardStyle = tv({
    base: "group relative z-51 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/60 p-5 sm:p-6 text-slate-900 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_-18px_rgba(15,23,42,0.55)]",
    variants: {
        formato: {
            quadrado: "col-span-1 row-span-1",
            horizontal: 'col-span-2 row-span-1',
            vertical: 'col-span-1 row-span-2',
        },
        cor: {
            verde: 'bg-[#D8FBE4]',
            salmao: 'bg-[#FFE6E0]',
            rosa: 'bg-[#FFE2F4]',
            azul: 'bg-[#DAE8FF]',
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

            <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-700">
                        resumo
                    </span>

                    <button
                        className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-white"
                        aria-label="Curtir resumo"
                    >
                        <Heart size={16} className="group-hover:scale-110 transition-transform" />
                        <span>30</span>
                    </button>
                </div>

                <h2 className="mt-3 line-clamp-2 text-[1.35rem] font-semibold leading-tight text-slate-900">
                    {titulo}
                </h2>

                <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    {texto}
                </p>
            </div>

            <div className="relative mt-4 w-full min-h-10">
                <hr className="border-slate-800/15" />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[13px] text-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <Clock3 size={15} />
                            <span className="font-medium">3 dias</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User size={15} />
                            <span className="font-medium">usuario</span>
                        </div>
                    </div>
                    <span className="rounded-md bg-white/60 px-2 py-1 text-xs font-semibold text-slate-800">
                        leitura rapida
                    </span>
                </div>
            </div>
        </div>
    )
}