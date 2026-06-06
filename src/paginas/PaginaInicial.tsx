import { ArrowRight } from "lucide-react";
import { Footer } from "../componentes/Static/footer";
import { HomeAbout } from "../componentes/homeAbout";
import { Hero } from "../componentes/Static/Hero";

export function PaginaInicial() {
    return (
        <>
            <main className="relative flex w-full flex-col overflow-hidden bg-[#F5F5F5] xxs:gap-14">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-168 bg-[radial-gradient(circle_at_top_left,rgba(76,154,228,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(245,185,47,0.12),transparent_28%),linear-gradient(180deg,#F5F5F5_0%,#F5F5F5_55%,rgba(245,245,245,0)_100%)]" />
                <Hero />

                <section className=" flex justify-center relative py-6 sm:py-10">
                    <div className="flex max-w-6xl flex-col gap-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-3xl space-y-3">
                                <h2 className="text-3xl font-black text-[#22486E] xs:text-4xl sm:text-5xl lg:text-6xl">
                                    O que você faz por aqui.
                                </h2>
                                <p className="max-w-2xl text-sm leading-7 text-[#4D667D] sm:text-base lg:text-lg">
                                    Experiência completa pensada em você: perfil com avatar, bio com mensagens prontas, criação de resumos e um feed dinâmico. Enquanto você estuda, alguem cuida de tudo por você.
                                </p>
                            </div>

                            <a href="/feed" className="inline-flex items-center gap-2 self-start rounded-full bg-[#22486E] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(34,72,110,0.24)] transition-transform hover:-translate-y-0.5">
                                Ver a plataforma em ação
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                        <HomeAbout />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}