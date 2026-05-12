import { useEffect, useState } from "react";

export function PaginaCadastro() {
    const [atual, setAtual] = useState(0);
    const imagens = ["login_img_xl.png", "login_img.png"];
    useEffect(() => {
        const intervalo = setInterval(() => {
            setAtual(prev => (prev + 1) % imagens.length);
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <main className="bg-sky-200 min-h-screen flex items-center justify-center relative">




            {/* Card */}
            <div className="bg-blue-500 w-[900px] p-8 rounded-3xl text-white flex gap-8 items-center">
                {/* carrosel */}
                <div className="flex-1 flex items-center justify-center ">
                    <img
                        key={atual}
                        className="w-full max-w-sm rounded-2xl object-cover fade-in"
                        src={imagens[atual]}
                    />
                </div>

                <div>
                    <form className="space-y-5 w-[350px] justify-self-end ">

                        <div>
                            <label className="block text-sm mb-1">E-mail</label>
                            <input type="email" className="w-full p-2 rounded bg-white text-black outline-none" />
                        </div>



                        <div>
                            <label className="block text-sm mb-1">Nome de usuário</label>
                            <input type="text" className="w-full p-2 rounded bg-white text-black outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Senha</label>
                            <input type="password" className="w-full p-2 rounded bg-white text-black outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Confirmar s enha</label>
                            <input type="password" className="w-full p-2 rounded bg-white text-black outline-none" />
                        </div>

                        <button className="w-full bg-blue-200 text-black py-2 rounded-lg  hover:inset-ring-2 inset-ring-white duration-300">
                            Cadastrar-se
                        </button>

                    </form>
                </div>
            </div>

        </main>
    )
}