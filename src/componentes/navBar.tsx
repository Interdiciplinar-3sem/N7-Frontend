import { Menu, X } from "lucide-react";
import { useState } from "react";

export function NavBar(){
    const [toggle, setToggle] = useState(false);

    const handdleToggle = () => {
        setToggle(!toggle)
        document.documentElement.style.overflow = !toggle ? "hidden" : "auto";
    }

    return (
         <header>
            <section className={`h-max bg-[#4C9AE4] text-white
            ${toggle ? "hidden" : "block"} w-screen`}>
            <nav className="flex p-3 justify-between 
            xxs:grid xxs:grid-cols-2">
                <div className="flex gap-2 text-center">
                    <div className="bg-white p-2 text-black font-semibold">Logo</div>
                    <ul className="hidden items-center
                        xxs:flex gap-2 ">
                        <li>Text</li>
                        <li>Text</li>
                        <li>Text</li>
                    </ul>
                </div>
               
                <section className=" hidden
                    xxs:flex gap-2 justify-end">
                    <button className="px-1 md:px-2 border border-white ">Login</button>
                    <button className="px-1 text-black font-semibold bg-[#2CD76E]">Cadastro</button>
                </section>
                <button className="flex xxs:hidden"
                onClick={() => handdleToggle()}>
                    <Menu/>
                </button>
            </nav>
        </section>
         { toggle && (
                <section className={` bg-white w-screen h-screen flex flex-col items-center text-black`}>
                    <button className="p-2 w-full justify-end flex "
                    onClick={() => setToggle(!toggle)}>
                        <X/>
                    </button>
                    <ul className="flex flex-col flex-1
                        gap-8 ">
                        <li>Text</li>
                        <li>Text</li>
                        <li>Text</li>
                    </ul>
                </section>
                )
            }
         </header>
    )
}