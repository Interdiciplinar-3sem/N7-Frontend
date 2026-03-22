import { LoginHero } from "../componentes/loginHero";
import { NavBar } from "../componentes/navBar";


export function PaginaInicial() {
    

    return (
        <main className="flex flex-col
        w-screen h-screen bg-[#F5F5F5]">
           <NavBar />
           <LoginHero />
          
        </main>
    )
}