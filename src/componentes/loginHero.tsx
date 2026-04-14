import { FormLogin } from "./formLogin";

export function LoginHero() {
    return (
        <section className="
            relative overflow-visible
            flex flex-col-reverse
            bg-[radial-gradient(circle_at_30%_40%,#6BAFEF_0%,#4C9AE4_40%,#3F86D1_100%)]
            min-h-[34rem]
            sm:min-h-[50svh]
            max-[720px]:min-h-0
            max-[720px]:flex-col
            max-[720px]:gap-4
            max-[720px]:py-4
            shadow-[0_12px_30px_rgba(76,154,228,0.35)]
            sm:flex-row
        ">
            <div className="
                flex flex-col flex-1 justify-center items-center p-2
                sm:pl-4
                md:gap-2
                lg:p-2
                max-[720px]:justify-start
                max-[720px]:gap-3
                max-[720px]:p-4
                xl:flex-col xl:items-center xl:justify-end xl:pr-20 xl:p-0 xl:gap-0
            ">

                <h1 className="
                    text-xs text-center leading-tight
                    w-full flex items-center justify-center text-balance font-bold
                    xxs:text-lg
                    md:text-2xl
                    max-[720px]:text-base
                    xl:text-3xl
                ">
                    Plataforma de Gestão Acadêmica
                </h1>

                <p className=" 
                    hidden text-center
                    max-w-1/2 font-normal text-xs leading-snug justify-center
                    xxs:flex
                    xs:text-sm
                    sm:hidden
                    md:flex md:text-md
                    lg:text-lg
                    max-[720px]:text-sm
                    lg:justify-center
                ">
                    Organize seus estudos, acompanhe seu progresso e gerencie sua jornada universitária em um só lugar.
                </p>
                <FormLogin />
            </div>

            <div className="
                flex flex-1 justify-center items-center overflow-visible
                sm:pr-4 sm:justify-end sm:items-end
                max-[720px]:items-center
                xl:justify-center xl:items-center
            ">
                <div className="
                    relative z-10 h-auto w-42 aspect-4/3 shrink-0 max-w-md
                    bg-contain bg-center bg-no-repeat
                    bg-[url('/login_img.png')]
                    xxs:w-70
                    xs:h-full
                    sm:h-2/3 sm:w-90 sm:translate-y-8
                    md:translate-y-4
                    max-[720px]:w-56
                    max-[720px]:translate-y-0
                    xl:max-w-lg xl:w-130 xl:h-full
                "
                />
            </div>
        </section>
    )
}