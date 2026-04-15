import { Heart } from "lucide-react";


export function 
Hero() {
    return (
        <section className="
            relative overflow-visible
            flex flex-col-reverse
            bg-[#4C9AE4]
            min-h-136
            sm:min-h-[65vh]
            shadow-[0_12px_30px_rgba(76,154,228,0.35)]
            sm:flex-row
        ">
           
            <div className="absolute hidden md:block w-96 h-96 bg-[#1d77cc] rounded-full blur-3xl opacity-85 top-0 left-0 pointer-events-none" />
            <div className="absolute hidden md:block w-96 h-96 bg-[#1d77cc] rounded-full blur-3xl opacity-85 bottom-20 right-20 pointer-events-none" />

            <div className=" relative
                flex flex-col flex-1 justify-center items-center p-2 gap-1
                sm:pl-4
                md:gap-2
                lg:p-2
                xl:flex-col xl:items-center xl:justify-center xl:pr-20 xl:p-0 xl:gap-6
            ">

                <h1 className="
                    text-white text-xs leading-tight
                    flex text-center text-balance font-bold
                    sm:w-full p-2 sm:text-start
                    md:max-w-2/3
                    xxs:text-lg
                    md:text-2xl
                    xl:text-5xl
                ">
                    Aprenda mais com resumos universitários
                </h1>

                <p className=" 
                    text-white text-center
                    p-2 sm:w-full
                    md:max-w-2/3 md:p-0 font-normal text-xs justify-center
                    xxs:flex
                    xs:text-sm 
                    sm:text-start
                    md:text-lg      
                    xl:text-2xl
                ">
                    Compartilhe e acesse resumos criados por estudantes da Fatec. Conhecimento de quem estuda para quem estuda.
                </p>

                <div className=" flex justify-center sm:justify-start
                    w-full p-2
                    md:max-w-2/3 md:p-0
                    ">
                    <button className="text-start p-2 text-white border hover:bg-white hover:text-green-900 cursor-pointer transition-all
                        text-xs
                        sm:text-sm
                    ">Explorar Resumos</button>
                </div>
            </div>

            <div className=" relative
                flex flex-1 justify-center items-center overflow-visible
                sm:pr-4 sm:justify-center sm:items-center
            ">
                <div className="
                    relative w-full aspect-4/3
                    max-w-[18rem]
                    xxs:max-w-88
                    sm:max-w-[24rem]
                    md:max-w-108
                    lg:max-w-120
                    xl:max-w-136
                ">
                    <div className=" hidden
                        xs:flex absolute flex-col gap-2 
                        top-2 left-0 -translate-x-[10%]
                        md:top-6 md:translate-x-0
                        xl:-top-7 xl:p-4
                        p-2
                        bg-white rounded-2xl shadow-2xl z-49
                    ">
                        <h2 className=" font-light     
                            text-xs
                            lg:text-sm
                            xl:text-lg
                        ">Novo resumo</h2>
                        <p className=" font-bold text-balance
                            text-xs
                            lg:text-sm
                            xl:text-lg
                        ">Redes de Computadores <br/> - Camada de Transporte</p>
                        <div className="bg-blue-300 p-1 rounded-lg 
                            text-xs max-w-25
                            lg:text-sm
                            xl:text-lg xl:max-w-32
                        ">
                            DSM - 3° sem
                        </div>
                    </div>

                    <div className="
                        absolute inset-0
                        bg-contain bg-center bg-no-repeat
                        bg-[url('/login_img.png')]
                        z-50
                    "/>

                    <div className=" hidden
                        xs:flex absolute flex-col
                        bottom-2 left-0 translate-x-0
                        md:bottom-6 md:translate-x-0
                        xl:bottom-20
                        bg-white rounded-2xl shadow-2xl z-51 p-2
                        xl:p-4
                    ">
                        <h2 className="text-blue-500 font-bold
                            text-xs
                            lg:text-sm
                            xl:text-lg 
                        ">100</h2>
                        <p className="font-semibold text-balance
                            text-xs
                            lg:text-sm
                            xl:text-lg
                        ">Resumos publicados</p>
                    </div>

                    <div className=" hidden
                        xs:flex absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-2xl z-51
                        translate-x-0
                        md:translate-x-0
                        xl:top-10 xl:translate-y-40 xl:translate-x-0
                            
                        flex-col gap-2 rounded-2xl
                        p-2
                        md:p-2
                        xl:p-4
                    ">
                        <h2 className="font-bold flex 
                        text-xs
                        lg:text-sm
                        xl:text-lg lg:gap-1
                        
                        ">
                            <Heart className="text-red-900
                                h-4
                                lg:h-5
                                xl:h-6
                            "/>
                            Curta resumos!
                        </h2>
                    </div>
                </div>
            </div>

        </section>
    )
}