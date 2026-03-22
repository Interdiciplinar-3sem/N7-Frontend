export function LoginHero() {
    return (
        <section className="relative overflow-visible h-[50vh] flex flex-col sm:flex-row bg-[#4C9AE4]">
            <div className="flex flex-1 justify-center sm:justify-start sm:pl-4 items-center ">
                <form className="w-full max-w-2xl p-4 flex flex-col gap-2">
                    <h1 className="text-2xl xxs:text-4xl text-white font-bold">Entrar</h1>
                    <label className="text-white font-semibold">Email </label>
                    <input className="p-1 bg-white rounded-sm" type="text" name="" id="" placeholder="Email"/>
                    <label className="text-white font-semibold">Senha </label>
                    <input className="p-1 bg-white rounded-sm" type="text" name="" id="" placeholder="Senha"/>
                    <select className="bg-white text-black text-center font-semibold">
                        <option value="" disabled selected hidden>
                            Entrar Como
                        </option>
                        <option value="Aluno">Aluno</option>
                        <option value="Professor">Professor</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    <button className="px-1 text-black font-semibold bg-[#2CD76E]">Entrar</button>
                </form>
            </div>
            <div className="flex justify-center items-center sm:pr-4 sm:justify-end sm:items-end flex-1 overflow-visible">
                <div className="
                    relative z-10 h-full w-36 xxs:w-70 aspect-4/3 shrink-0 
                    translate-y-4 sm:h-2/3 sm:w-90 sm:translate-y-8 max-w-md bg-[url('/login_img.png')] 
                    bg-contain bg-center bg-no-repeat" 
                />
            </div>
        </section>
    )
}