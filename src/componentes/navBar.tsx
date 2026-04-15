import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function NavBar(){
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate()

    const handdleToggle = () => {
        setToggle(!toggle)
        document.documentElement.style.overflow = !toggle ? "hidden" : "auto";
    }

    const handdleNavigate = (path: string) => {
        navigate(path);
        if(toggle){
            setToggle(false);
            document.documentElement.style.overflow = "auto";
        }
    }

    return (
         <header>
            <section className={`
                h-max bg-[#4C9AE4] text-white w-screen
                p-2
                ${toggle ? "hidden" : "block"}
            `}>
            <nav className="
                flex p-1 justify-between
                xxs:grid xxs:grid-cols-2
                md:p-3
            ">
                <div className="flex gap-2 md:gap-8 text-center">
                    <div className="text-white font-bold">Resumify</div>
                    <ul className="hidden items-center
                        gap-2 text-xs
                        xxs:flex
                        xs:text-sm
                        sm:text-lg
                        lg:ml-4 lg:gap-16">
                        <li><button onClick={() => handdleNavigate("/")}>Home</button></li>
                        <li><button onClick={() => handdleNavigate("/feed")}>feed</button></li>
                        <li><button onClick={() => handdleNavigate("/perfil")}>perfil</button></li>
                    </ul>
                </div>
               
                <section className="
                    hidden gap-2 justify-end
                    xxs:flex
                    lg:pr-4
                ">
                    <button onClick={() => handdleNavigate("/login")} className="px-1 md:px-2 border border-white ">Login</button>
                    <button onClick={() => handdleNavigate("/cadastro")} className="px-1 text-black font-semibold bg-[#2CD76E]">Cadastro</button>
                </section>
                <button className="flex items-center xxs:hidden"
                onClick={() => handdleToggle()}>
                    <Menu/>
                </button>
            </nav>
        </section>
         { toggle && (
                <section className={`bg-[#4C9AE4] w-screen h-screen flex flex-col items-center text-black`}>
                    <button className="p-2 w-full justify-end flex "
                    onClick={() => setToggle(!toggle)}>
                        <X/>
                    </button>
                    <ul className="flex flex-col flex-1 gap-8 text-white font-semibold text-center">
                        <li><button onClick={() => handdleNavigate("/")}>Home</button></li>
                        <li><button onClick={() => handdleNavigate("/feed")}>feed</button></li>
                        <li><button onClick={() => handdleNavigate("/perfil")}>perfil</button></li>
                    </ul>
                </section>
                )
            }
         </header>
    )
}