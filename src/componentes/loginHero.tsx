import { Form } from "./ui/form";

export function LoginHero() {
    return (
        <section className="
            relative overflow-visible
            flex flex-col-reverse
            bg-[radial-gradient(circle_at_30%_40%,#6BAFEF_0%,#4C9AE4_40%,#3F86D1_100%)]
            sm:h-[50vh]
            shadow-[0_12px_30px_rgba(76,154,228,0.35)]
            sm:flex-row
        ">
            <div className="
                flex flex-col flex-1 justify-center items-center p-1
                sm:pl-4
                md:gap-2
                lg:justify-between lg:p-2
                xl:flex-col xl:items-center xl:justify-end xl:pr-20 xl:p-0 xl:gap-0
            ">

                <h1 className="
                    text-xs text-center
                    w-full flex items-center justify-center text-wrap font-bold
                    xxs:text-lg
                    md:text-2xl
                    xl:text-3xl
                ">
                    Plataforma de Gestão Acadêmica
                </h1>

                <h1 className="
                    hidden text-center
                    w-full font-normal text-xs justify-center
                    xxs:flex
                    xs:text-sm
                    sm:hidden
                    md:flex md:text-md
                    lg:text-lg
                    lg:justify-center
                ">
                    Organize seus estudos, acompanhe seu progresso e <br /> gerencie sua jornada universitária em um só lugar.
                </h1>
                <Form />
            </div>
            <div className="
                flex flex-1 justify-center items-center overflow-visible
                sm:pr-4 sm:justify-end sm:items-end
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
                    xl:translate-0 xl:bg-[url('/login_img_xl.png')] xl:max-w-lg xl:w-130 xl:h-full
                "
                />
            </div>
        </section>
    )
}