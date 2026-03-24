import { Bookmark, FilePlusIcon, House, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SideBar(){
    const [sideBar, setSideBar] = useState(false);

    const navigate = useNavigate()

    const handdleNavigate = (path: string) => {
        navigate(path);
    }

    return (
         <header className="fixed bottom-0 left-0 right-0 z-50 sm:static sm:h-screen">
            <section 
            onMouseEnter={() => setSideBar(true)}
            onMouseLeave={() => setSideBar(false)}
            className={`
                w-full 
                sm:h-full sm:max-w-[10vh] bg-[#4C9AE4] text-white
                p-2 shadow-[0_-6px_18px_rgba(0,0,0,0.18)] sm:shadow-none
                ${sideBar && "sm:max-w-[20vh] sm:w-[20vh]"}
            `}>
                <nav className="
                    h-full
                    flex sm:flex-col p-1 justify-between
                    md:p-3 
                ">
                    <div className="flex sm:flex-col gap-2 md:gap-8">
                        <div className="bg-white p-2 text-black font-semibold max-w-[6vh] text-center">
                            <button onClick={() => handdleNavigate("/")}>Logo</button>
                        </div>
                        <ul className={`
                            w-full
                            hidden 
                            ${sideBar ? "items-start pl-1" : "items-center justify-center "}
                            gap-2 text-xs
                            xxs:flex sm:flex-col
                            xs:text-sm
                            sm:text-lg
                            `}>
                            <li>
                                <button className=" flex gap-2" onClick={() => handdleNavigate("/criacao/resumo")}>
                                    <FilePlusIcon/>
                                     {sideBar &&
                                        <h3>Criar resumo</h3>
                                    }
                                </button>
                               
                            </li>
                            <li>
                                <button className="flex gap-2" onClick={() => handdleNavigate("/feed")}>
                                    <Bookmark/>
                                    {sideBar &&
                                        <h3>Feed</h3>
                                    }
                                </button>
                                 
                            </li>
                        </ul>
                    </div>
                    
                    <section className={`
                        hidden gap-2
                        xxs:flex  ${sideBar ? "sm:flex sm:items-center" : "sm:flex-col"}
                        lg:pr-4
                          ${sideBar ? "items-start p-0" : "items-center justify-center "}
                    `}>
                        <div className="bg-white p-2 text-black font-semibold rounded-[100%] w-10 flex items-center justify-center"><button onClick={() => handdleNavigate("/perfil")}><User /></button></div>
                        {sideBar &&
                            <h3>User</h3>
                        }
                    </section>
                    
                </nav>
            </section>
        </header>
    )
}