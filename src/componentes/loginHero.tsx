import { Form } from "./ui/form";

export function LoginHero() {
    return (
        <section className="
            relative overflow-visible  sm:h-[50vh] 
            flex flex-col-reverse sm:flex-row bg-[radial-gradient(circle_at_30%_40%,#6BAFEF_0%,#4C9AE4_40%,#3F86D1_100%)]
        ">
            <div className="flex flex-col flex-1 justify-center items-center p-1 
                sm:pl-4 
                md:gap-2
                lg:justify-between lg:p-2 
                xl:flex-col xl:items-center xl:justify-end xl:pr-20 xl:p-0 xl:gap-0">

                <h1 className="
                    text-xs text-center
                    w-full flex xxs:text-lg items-center justify-center text-wrap font-bold
                    lg:flex lg:justify-center md:text-2xl  xl:text-3xl
                ">
                    Plataforma de Gestão Acadêmica
                </h1>

                <h1 className="  hidden text-center
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
            <div className="flex justify-center items-center xs:items-center sm:pr-4 sm:justify-end sm:items-end flex-1 overflow-visible xl:justify-center xl:items-center">
                <div className="
                    relative z-10 h-auto xs:h-full w-42 xxs:w-70 aspect-4/3 shrink-0 
                    md:translate-y-4 sm:h-2/3 sm:w-90 sm:translate-y-8 max-w-md bg-[url('/login_img.png')] xl:translate-0 xl:bg-[url('/login_img_xl.png')] xl:max-w-lg xl:w-130 xl:h-full
                    bg-contain bg-center bg-no-repeat
                    " 
                />
            </div>
        </section>
    )
}