import { Bookmark, FilePlusIcon, HomeIcon, Search, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SideBar(){
    const [sideBar, setSideBar] = useState(false);

    const navigate = useNavigate()

    const handdleNavigate = (path: string) => {
        navigate(path);
    }

    const handdleMouseEnter = () => {
        if(window.innerWidth >= 640) setSideBar(true)
    }

    return (
         <header 
            className={`
                fixed bottom-0 left-0 right-0 z-50 sm:h-screen
            `}>
            <section 
            onMouseEnter={() => handdleMouseEnter()}
            onMouseLeave={() => setSideBar(false)}
            className={`
                w-full 
                sm:h-full sm:max-w-[10vh] bg-[#4C9AE4] text-white
                p-1 xxs:p-2 shadow-[0_-6px_18px_rgba(0,0,0,0.18)] sm:shadow-none
                ${sideBar && "sm:max-w-full sm:w-[25vh]"}
            `}>
                <nav className="
                    h-full
                    flex sm:flex-col p-1 justify-between
                    md:p-3 
                ">
                    <div className={`flex sm:flex-col xxs:gap-6 md:gap-8 ${sideBar ? "items-start" : "items-center"}`}>
                        <div className="text-white font-bold h-[2vh] max-w-[2vh] xxs:h-auto xxs:max-w-[6vh] flex justify-center items-center">
                            <button className="sm:hidden text-xs xxs:text-sm" onClick={() => handdleNavigate("/")}>Fy</button>
                            <button className="hidden sm:block text-xs xxs:text-sm" onClick={() => handdleNavigate("/")}>ResumiFy</button>
                        </div>
                        <ul className={`
                            w-full
                            ${sideBar ? "sm:items-start sm:pl-1" : "items-center justify-center "}
                            gap-4 text-xs
                            flex sm:flex-col
                            sm:text-sm 
                            `}>
                            <li className="hover:w-full">
                                <button className="hidden xxs:flex gap-2 hover:bg-white hover:p-2 hover:text-black hover:scale-105 hover:font-bold transform transition-transform cursor-pointer hover:shadow-lg hover:w-full" onClick={() => handdleNavigate("/")}>
                                    <HomeIcon className="h-4 w-4 xxs:h-auto xxs:w-auto"/>
                                    {sideBar &&
                                        <h3>Pagina Inicial</h3>
                                    }
                                </button>
                            </li>
                            <li className="hover:w-full">
                                <button className="flex gap-2 hover:bg-white hover:p-2 hover:text-black  hover:scale-105 hover:font-bold transform cursor-pointer hover:shadow-lg hover:w-full" onClick={() => handdleNavigate("/criacao/resumo")}>
                                    <FilePlusIcon className="h-4 w-4 xxs:h-auto xxs:w-auto"/>
                                    {sideBar &&
                                        <h3>Criar resumo</h3>
                                    }
                                </button>
                            </li>
                            <li className="hover:w-full">
                                <button className="flex gap-2 hover:bg-white hover:p-2 hover:text-black hover:scale-105 hover:font-bold transform cursor-pointer hover:shadow-lg hover:w-full" onClick={() => handdleNavigate("/feed")}>
                                    <Search className="h-4 w-4 xxs:h-auto xxs:w-auto"/>
                                    {sideBar &&
                                        <h3>Procurar</h3>
                                    }
                                </button>
                            </li>
                            <li className="hover:w-full">
                                <button className="flex gap-2 hover:bg-white hover:p-2 hover:text-black hover:scale-105 hover:font-bold transform cursor-pointer hover:shadow-lg hover:w-full" onClick={() => handdleNavigate("/feed")}>
                                    <Bookmark className="h-4 w-4 xxs:h-auto xxs:w-auto"/>
                                    {sideBar &&
                                        <h3>Feed</h3>
                                    }
                                </button>
                            </li>
                        </ul>
                    </div>
                    
                    <section className={`
                        gap-2
                        flex  ${sideBar ? "sm:flex sm:items-center" : "sm:flex-col"}
                        lg:pr-4
                          ${sideBar ? "items-start p-0" : "items-center justify-center "}
                    `}>
                        <div className="bg-white p-2 text-black font-semibold rounded-[100%] xxs:w-10 flex items-center justify-center hover:scale-105 hover:font-bold transform cursor-pointer">
                            <button onClick={() => handdleNavigate("/perfil")}>
                                <User className="h-4 w-4 xxs:h-auto xxs:w-auto"/>
                            </button>
                        </div>
                        {sideBar &&
                            <h3>User</h3>
                        }
                    </section>
                    
                </nav>
            </section>
        </header>
    )
}