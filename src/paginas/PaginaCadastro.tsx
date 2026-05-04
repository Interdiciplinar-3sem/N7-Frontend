import { FormSignUp } from "../componentes/forms/formUserStudent";

export function PaginaCadastro() {
    return (
        <main className="bg-gray-300 min-h-screen flex items-center justify-center relative">

            
            

            {/* Card */}
            <div className="bg-blue-500 w-[380px] p-8 rounded-3xl shadow-xl  text-white ">
                <form className="space-y-5">

                    <div>
                        <label className="block text-sm mb-1">E-mail</label>
                        <input type="email" className="w-full p-2 rounded bg-white text-black outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Nome exibido</label>
                        <input type="text" className="w-full p-2 rounded bg-white text-black outline-none" />
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
                        <label className="block text-sm mb-2">Data de Nascimento</label>
                        <div className="flex gap-3">
                            <input placeholder="Dia" className="w-1/3 p-2 rounded bg-white text-black text-center outline-none" />
                            <input placeholder="Mês" className="w-1/3 p-2 rounded bg-white text-black text-center outline-none" />
                            <input placeholder="Ano" className="w-1/3 p-2 rounded bg-white text-black text-center outline-none" />
                        </div>
                    </div>

                    <button className="w-full bg-blue-200 text-black py-2 rounded-lg  hover:inset-ring-2 inset-ring-white duration-300">
                        Cadastrar-se
                    </button>

                </form>
            </div>

        </main>
    )
}