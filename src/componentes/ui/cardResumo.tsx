import { Heart } from "lucide-react";
import {tv, type VariantProps} from "tailwind-variants"

const cardStyle = tv({
    base: "group relative z-51 flex flex-col overflow-hidden rounded-3xl border border-white/60 p-5 sm:p-6 text-slate-900 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_-18px_rgba(15,23,42,0.55)]",
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
            invisivel: 'bg-transparent border-transparent shadow-none pointer-events-none opacity-0',
        },
        invisivel: {
            true: "border-transparent bg-transparent shadow-none pointer-events-none opacity-0",
        }
    },
    defaultVariants: {
        formato: "quadrado",
    }
})


type CardProps = VariantProps<typeof cardStyle> & {
    summaryId: string;
    titulo: string;
    texto: string;
    imageUrl?: string;
    studentName?: string;
    className?: string;
    curtidas?: number;
    setViewSummary?: (id: string) => void;
}

export function CardResumo({summaryId, titulo, texto, imageUrl, studentName, className, formato, cor, curtidas, setViewSummary }: CardProps) {
    const isVertical = formato === "vertical";

    return (
        <div onClick={() => setViewSummary && setViewSummary(summaryId)} className={cardStyle({formato, cor, className})}>

            <div className={`relative flex h-full flex-col ${isVertical ? "gap-4" : "justify-between"}`}>
                <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-700">
                        resumo
                    </span>

                    <button
                        className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-white"
                        aria-label="Curtir resumo"
                    >
                        <Heart size={16} className="group-hover:scale-110 transition-transform" />
                        <span>{curtidas ?? 0}</span>
                    </button>
                </div>

                <h2 className={`mt-3 line-clamp-2 font-semibold leading-tight text-slate-900 ${isVertical ? "text-[1.45rem]" : "text-[1.35rem]"}`}>
                    {titulo}
                </h2>

                <p className={`${isVertical ? "line-clamp-10" : "line-clamp-4"} mt-2 text-sm leading-relaxed text-slate-700 sm:text-[15px]`}>
                    {texto}
                </p>
            </div>

            <div className={`relative w-full min-h-10 ${isVertical ? "mt-5" : "mt-4"}`}>
                <hr className="border-slate-800/15" />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[13px] text-slate-700">
                    <div className="flex items-center gap-3">
                       
                        <div className="flex items-center gap-1.5">
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
                                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
                                }}
                            />
                            <span className="font-medium">{studentName || "usuario"}</span>
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