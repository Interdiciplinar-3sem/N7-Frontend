import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
    const navigate = useNavigate()

    return (
        <section className="
            relative overflow-visible
            flex flex-col-reverse
            bg-[linear-gradient(135deg,#4C9AE4_0%,#4A8FE0_45%,#2E6FB5_100%)]
            min-h-136
            pt-8
            sm:min-h-[65vh]
            shadow-[0_12px_30px_rgba(76,154,228,0.35)]
            sm:flex-row
        ">
            <div className="absolute hidden md:block w-96 h-96 bg-[#1d77cc] rounded-full blur-3xl opacity-85 top-0 left-0 pointer-events-none" />
            <div className="absolute hidden md:block w-96 h-96 bg-[#1d77cc] rounded-full blur-3xl opacity-85 bottom-20 right-20 pointer-events-none" />

            <div className="relative flex flex-col flex-1 justify-center items-center p-2 gap-1 sm:pl-4 md:gap-2 lg:p-2 xl:flex-col xl:items-center xl:justify-center xl:pr-20 xl:p-0 xl:gap-6">
                <h1 className="
                    flex text-center font-bold leading-tight text-white
                    sm:w-full p-2 sm:text-start
                    md:max-w-2/3
                    xxs:text-3xl
                    md:text-4xl
                    xl:text-6xl
                ">
                    A plataforma que deixa o estudo mais divertido.
                </h1>

                <p className="
                    text-white text-center
                    p-2 sm:w-full
                    md:max-w-2/3 md:p-0 font-normal text-sm justify-center
                    xxs:flex
                    sm:text-start
                    md:text-xl
                    xl:text-2xl
                ">
                    Compartilhe e acesse resumos criados por estudantes da Fatec. Conhecimento de quem estuda para quem estuda.
                </p>

                <div className="flex w-full flex-col gap-3 p-2 md:max-w-2/3 md:flex-row md:p-0">
                    <button onClick={() => navigate("/feed")} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#23517e] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#f7fbff]">
                        Explorar resumos
                        <ArrowRight className="h-4 w-4" />
                    </button>

                    <button onClick={() => navigate("/cadastro")} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                        Criar conta
                    </button>
                </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-visible sm:pr-4 sm:items-center sm:justify-center">
                <div className="relative aspect-4/3 w-full max-w-[20rem] xxs:max-w-92 sm:max-w-104 md:max-w-116 lg:max-w-124 xl:max-w-140">
                    <div className="hidden animate-float [animation-delay:0s] [animation-duration:4s] md:absolute md:-top-7 md:left-0 md:flex md:flex-col md:gap-2 xl:p-4 p-2 bg-white rounded-2xl shadow-2xl z-49">
                        <h2 className="font-light text-xs lg:text-sm xl:text-lg">Novo resumo</h2>
                        <p className="font-bold text-balance text-xs lg:text-sm xl:text-lg">Redes de Computadores <br /> - Camada de Transporte</p>
                        <div className="bg-blue-300 p-1 rounded-lg text-xs max-w-25 lg:text-sm xl:text-lg xl:max-w-32">
                            DSM - 3° sem
                        </div>
                    </div>

                    <div className="absolute inset-0 z-50 bg-contain bg-center bg-no-repeat bg-[url('/login_img.png')]" />

                    <div className="hidden animate-float [animation-delay:0.2s] [animation-duration:6s] md:absolute md:bottom-2 md:left-0 md:flex md:flex-col bg-white rounded-2xl shadow-2xl z-51 p-2 xl:p-4">
                        <h2 className="text-blue-500 font-bold text-xs lg:text-sm xl:text-lg">100</h2>
                        <p className="font-semibold text-balance text-xs lg:text-sm xl:text-lg">Resumos publicados</p>
                    </div>

                    <div className="hidden animate-float [animation-delay:2.4s] [animation-duration:3.5s] md:absolute md:top-1/2 md:right-0 md:flex md:-translate-y-1/2 md:flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl z-51 md:translate-x-0 xl:top-10 xl:translate-y-40 xl:p-4">
                        <h2 className="font-bold flex text-xs lg:text-sm xl:text-lg lg:gap-1">
                            <Heart className="h-4 lg:h-5 xl:h-6 text-red-900" />
                            Curta resumos!
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    )
}