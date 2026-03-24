import { Link } from "react-router";

export function Footer() {
    return (
         <footer className="w-full bg-[#F5F5F5] flex flex-col justify-center px-2">
            <div className="flex">
                <img
                    src="/foot.png"
                    alt="Rodape da plataforma"
                    className="block w-full max-w-114.25 h-auto"
                />
                <img
                    src="/foot.png"
                    alt="Rodape da plataforma"
                    className="block w-full max-w-114.25 h-auto"
                />
                <img
                    src="/foot.png"
                    alt="Rodape da plataforma"
                    className="block w-full max-w-114.25 h-auto"
                />
                <img
                    src="/foot.png"
                    alt="Rodape da plataforma"
                    className="block w-full max-w-114.25 h-auto"
                />  
            
            </div>
                <div className="w-full min-h-[25vh] bg-[#a2cce2] px-4 py-8 xs:px-6 sm:px-12 text-white">
                <div className="grid grid-cols-1 gap-8 text-center xxs:grid-cols-2 xxs:text-left md:grid-cols-3">
                    <div className="flex flex-col gap-1 font-semibold text-lg xs:text-xl sm:text-2xl">
                        <h3 className="text-xl xs:text-2xl sm:text-3xl mb-1">Paginas:</h3>
                        <Link className="hover:underline" to="/">Home</Link>
                        <Link className="hover:underline" to="/login">Login</Link>
                        <Link className="hover:underline" to="/cadastro">Cadastro</Link>
                        <Link className="hover:underline" to="/perfil">Perfil</Link>
                        <Link className="hover:underline" to="/feed">Feed</Link>
                    </div>

                    <div className="flex flex-col gap-1 font-semibold text-lg xs:text-xl sm:text-2xl wrap-break-word">
                        <h3 className="text-xl xs:text-2xl sm:text-3xl mb-1">Contatos:</h3>
                        <a className="hover:underline" href="mailto:contato@gmail.com">contato@gmail.com</a>
                        <a className="hover:underline" href="tel:+5511010100101">(11)-01010-0101</a>
                    </div>

                    <div className="flex flex-col gap-1 font-semibold text-lg xs:text-xl sm:text-2xl">
                        <h3 className="text-xl xs:text-2xl sm:text-3xl mb-1">Saiba mais:</h3>
                        <Link className="hover:underline" to="/painel">Sobre nos</Link>
                        <Link className="hover:underline" to="/criacao/resumo">Projeto</Link>
                    </div>
                </div>

                <p className="mt-10 text-center text-[#4C5C6D] text-lg xs:text-xl sm:text-3xl font-bold">
                    Copyright © 2026 Todos os direitos reservados
                </p>
                </div>
        </footer>
    )
}