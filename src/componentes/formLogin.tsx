import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";
import { useLogin } from "../http/auth/useLogin";

export function FormLogin() {

    const {mutateAsync: login} = useLogin();

    const formSchema = z.object({
        email: z.email("Email válido"),
        senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            senha: "",
        },
        resolver: zodResolver(formSchema)
    })

    const handdlerLogin = async (data: z.infer<typeof formSchema>) => {
        try {

            await login({
                email: data.email,
                senha: data.senha
            })


        } catch (error) {
            let parsed: { message: string }

            try {
                parsed = JSON.parse((error as Error).message)
            } catch {
                parsed = { message: "Erro ao tentar fazer login." }
            }

            form.setError("root", {
                type: "manual",
                message: parsed.message
            })
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handdlerLogin)}
        className="
            w-full max-w-lg p-4 m-1 flex flex-col gap-2 
            rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.06)]
            xs:bg-[#F1F5F9]
            sm:m-0
            max-[720px]:max-w-md
            max-[720px]:translate-y-0
            xl:translate-y-16
        ">
            <h1 className="text-2xl text-black font-bold xxs:text-4xl">Entrar</h1>
            <label className="text-black font-semibold">Email </label>
            { form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                    {form.formState.errors.email?.message}
                </p>
            )}
            <input className="p-1 bg-white rounded-sm shadow-sm" type="text" placeholder="Email" {...form.register("email")} required/>
            <label className="text-black font-semibold">Senha </label>
            {form.formState.errors.senha && (
                <p className="text-red-500 text-sm">
                    {form.formState.errors.senha.message}
                </p>
            )}
            <input className="p-1 bg-white rounded-sm shadow-sm" type="password" placeholder="Senha" {...form.register("senha")} required/>

             {form.formState.errors.root && (
                <p className="text-red-500 text-sm">
                    {form.formState.errors.root?.message}
                </p>
            )}

            <button type="submit" className="px-1 text-black font-semibold bg-[#2CD76E]">Entrar</button>
            <Link className="text-xs lg:text-sm xs:text-blue-600 cursor-pointer text-center" to="/cadastro">Ainda não tem cadastro?</Link>
        </form>
    )
}