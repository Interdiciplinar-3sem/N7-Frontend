import { Link } from "react-router";

export function FormSignUp() {
    return (
        <form className="
            w-full max-w-lg p-4 m-1 flex flex-col gap-2 
            rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.06)]
            xs:bg-[#F1F5F9]
            sm:m-0
            max-[720px]:max-w-md
            max-[720px]:translate-y-0
            xl:translate-y-16
        ">
            <h1 className="text-2xl text-black font-bold xxs:text-4xl">Cadastro</h1>
            <label className="text-black font-semibold">Email </label>
            <input className="p-1 bg-white rounded-sm shadow-sm" type="text" name="" id="" placeholder="Email" />
            <label className="text-black font-semibold">Senha </label>
            <input className="p-1 bg-white rounded-sm shadow-sm" type="text" name="" id="" placeholder="Senha" />
            <input className="p-1 bg-white rounded-sm shadow-sm" type="text" name="" id="" placeholder="Confirme a senha" />
            <button className="px-1 text-black font-semibold bg-[#2CD76E]">Criar</button>
            <Link className="text-xs lg:text-sm xs:text-blue-600 cursor-pointer text-center" to="/login">Já é cadastrado?</Link>
        </form>
    )
}