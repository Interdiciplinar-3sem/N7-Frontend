import React, { useState } from "react";
import { Bookmark, FilePlusIcon, HomeIcon, Search, ToolCase, User } from "lucide-react";
import { useNavigate } from "react-router-dom"

type LinkItem = {
    key?: string;
    label?: string;
    to?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    position?: "top" | "bottom";
}

type SideBarProps = {
    role?: string;
    setIsOptionsFormOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    isOptionsFormOpen?: boolean,
    links?: LinkItem[]
}

export function SideBar({role, setIsOptionsFormOpen, isOptionsFormOpen, links}: SideBarProps){
    console.log("role:", role)
    const [sideBar, setSideBar] = useState(false);
    const [searchBar, setSearchBar] = useState(false);

    const navigate = useNavigate()

    const handdleNavigate = (path: string) => {
        navigate(path);
    }

    const handdleMouseEnter = () => {
        if(window.innerWidth >= 640) setSideBar(true)
    }

    const handdleSearchBar = () => {
        if(window.innerWidth >= 640) { setSearchBar(!searchBar); }
        else if (window.innerWidth < 640) { 
            handdleNavigate("/busca");
        }
    }

    const defaultLinks: LinkItem[] = [  
        { key: "search", label: "Pesquisar...", icon: <Search className="h-4 w-4 xxs:h-auto xxs:w-auto"/>, onClick: handdleSearchBar, position: "top" },
        { key: "home", label: "Pagina ", to: "/", icon: <HomeIcon className="h-4 w-4 xxs:h-auto xxs:w-auto"/>, position: "top" },
        { key: "create", label: "Criar resumo", icon: <FilePlusIcon className="h-4 w-4 xxs:h-auto xxs:w-auto"/>, onClick: () => setIsOptionsFormOpen?.(!(isOptionsFormOpen ?? false)), position: "top" },
        { key: "feed", label: "Feed", to: "/feed", icon: <Bookmark className="h-4 w-4 xxs:h-auto xxs:w-auto"/>, position: "top" },
        { key: "profile", label: "User", to: "/perfil", icon: <User className="h-4 w-4 xxs:h-auto xxs:w-auto"/>, position: "bottom" }
    ];

    const allLinks = links ?? defaultLinks;
    const topLinks = allLinks.filter(l => l.position !== "bottom");
    const bottomLinks = allLinks.filter(l => l.position === "bottom");

    return (
         <header 
            className={` bg-white
                z-80 hover:z-90
                fixed bottom-0 left-0 right-0 sm:top-0 sm:bottom-0 sm:right-auto sm:h-screen md:bg-transparent
            `}>
            <section 
                onMouseEnter={() => handdleMouseEnter()}
                onMouseLeave={() => setSideBar(false)}
                className={`
                    w-full 
                    sm:h-full sm:w-20 text-black
                    p-1 xxs:p-2 shadow-[0_-6px_18px_rgba(0,0,0,0.18)] 
                    ${sideBar && "sm:w-64"}
                    shadow-2xl                    
            `}>
                <nav className=" bg-white
                    w-full
                    h-full
                    flex sm:flex-col p-1 justify-between
                    md:p-3
                ">
                    <div className={`flex sm:flex-col gap-2 xxs:gap-6 md:gap-8 ${sideBar ? "pl-2" : "items-center"}`}>
                        <div className="text-black font-bold h-[2vh] max-w-[2vh] xxs:h-auto xxs:max-w-[6vh] flex justify-center items-center">
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
                            {topLinks.map((item) => (
                                <li
                                    key={item.key ?? item.label}
                                    onClick={item.key !== "search" ? () => { item.onClick?.(); if(item.to) handdleNavigate(item.to); } : undefined}
                                    className={`flex gap-2 py-1 grou
                                    ${!(item.key === "search" && searchBar) && "sm:hover:bg-[#DAE8FF] sm:hover:p-2 sm:hover:text-black sm:hover:scale-105 sm:hover:font-bold transform cursor-pointer sm:hover:shadow-lg sm:hover:w-full transition-all"}
                                `}
                                >
                                    {item.key === "search" ? (
                                        <button className="cursor-pointer" onClick={() => { item.onClick?.(); if(item.to) handdleNavigate(item.to); }}>
                                            {item.icon}
                                        </button>
                                    ) : (
                                        <div className="cursor-pointer">
                                            {item.icon}
                                        </div>
                                    )}

                                    {item.key === "search" && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Pesquisar..."
                                                className={`text-sm bg-[#F8F8F6] border-white/50 shadow-sm placeholder-white/60 text-black rounded-md px-2 py-1 outline-none w-full transition-opacity duration-200 ${
                                                    searchBar && sideBar ? "block opacity-100 delay-100" : " hidden opacity-0"
                                                }`}
                                            />

                                            <button type="button" className={` border border-white/50 shadow-sm text-xs bg-[#F8F8F6] text-black rounded-md p-2 max-w-15 flex items-center justify-center transition-opacity duration-200
                                                ${ searchBar && sideBar ? "block opacity-100 delay-100" : " hidden opacity-0"}
                                            `}>
                                                Pesquisar
                                            </button>

                                            {sideBar && !searchBar &&
                                                <button className="cursor-pointer" onClick={() => handdleSearchBar()}>
                                                    <h3>{item.label ?? ""}</h3>
                                                </button>
                                            }
                                        </>
                                    )}

                                    {item.key !== "search" && sideBar && item.label && (
                                        <h3>{item.label}</h3>
                                    )}
                                </li>
                            ))}
                            {role === "ADM" && (
                                <li
        
                                    onClick={() => handdleNavigate("/painel")}
                                    className={`flex gap-2 py-1 group sm:hover:bg-[#DAE8FF] sm:hover:p-2 sm:hover:text-black sm:hover:scale-105 sm:hover:font-bold transform cursor-pointer sm:hover:shadow-lg sm:hover:w-full transition-all"}
                                `}
                                >
                                     <div className="cursor-pointer">
                                        {<ToolCase />}
                                    </div>

                                    {sideBar && !searchBar &&
                                        <button className="cursor-pointer" onClick={() => handdleSearchBar()}>
                                            <h3>Painel ADM</h3>
                                        </button>
                                    }

                                </li>  
                            )}
                        </ul>
                    </div>
                    
                    <section className={`
                        gap-2
                        flex  ${sideBar ? "sm:flex sm:items-center" : "sm:flex-col"}
                        lg:pr-4
                        ${sideBar ? "items-start p-0 gap-4" : "items-center justify-center p-2"}
                        sm:hover:bg-[#DAE8FF] sm:hover:p-2 sm:hover:text-black sm:hover:scale-105 sm:hover:font-bold transform transition-transform cursor-pointer sm:hover:shadow-lg sm:hover:w-full
                    `}
                    onClick={() => {
                        const profile = bottomLinks[0];
                        if(profile){ profile.onClick?.(); if(profile.to) handdleNavigate(profile.to); }
                    }}
                    >
                        <div className="bg-white p-2 text-black font-semibold rounded-[100%] xxs:w-10 flex items-center justify-center sm:hover:scale-105 sm:hover:font-bold transform cursor-pointer">
                                {bottomLinks[0]?.icon ?? <User className="h-4 w-4 xxs:h-auto xxs:w-auto"/>}
                        </div>
                        {sideBar &&
                            <h3>{bottomLinks[0]?.label ?? "User"}</h3>
                        } 
                    </section>
                    
                </nav>
            </section>
        </header>
    )
}