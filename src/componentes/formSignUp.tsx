import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";
import { useSignUp } from "../http/useSignUp";

export function FormSignUp() {

    const {mutateAsync: signUp} = useSignUp();

    const formSchema = z.object({
        nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
        email: z.string().email("Email inválido"),
        senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
        senhaConfirmacao: z.string(),
        semestre: z.string()
    }).refine(data => data.senha === data.senhaConfirmacao, {
        message: "Senhas não conferem",
        path: ["senha"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
            senhaConfirmacao: "",
            semestre: "1",
        },
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        reValidateMode: "onChange"
    })

    const handdlerSignUp = async (data: z.infer<typeof formSchema>) => {
        try {

            if(data.senha != data.senhaConfirmacao){
                form.setError("senha", {
                    type: "manual",
                    message: "As senhas não coincidem"
                })
            }

            await signUp({
                nome: data.nome,
                email: data.email,
                senha: data.senha,
                senhaConfirmacao: data.senhaConfirmacao,
                semestre: Number(data.semestre)
            })
            
        } catch (error) {
            const parsed = JSON.parse((error as Error).message)
            if (parsed.status === 409) {
                form.setError("email", {
                    type: "manual",
                    message: parsed.message
                })
            }
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handdlerSignUp)}
        className="
            w-full max-w-lg p-4 m-1 flex flex-col gap-2 
            rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.06)]
            xs:bg-[#F1F5F9]
            sm:m-0
            max-[720px]:max-w-md
            max-[720px]:translate-y-0
            xl:translate-y-16
        ">
            <h1 className="text-2xl text-black font-bold xxs:text-4xl">Cadastro</h1>
            <label className="text-black font-semibold">Nome </label>
            {form.formState.errors.nome && (
                <p className="text-red-500 text-sm">
                    {form.formState.errors.nome?.message}
                </p>
            )}
            <input className="p-1 bg-white rounded-sm shadow-sm" type="text" id="" placeholder="Nome"  {...form.register("nome")} required/>
            <label className="text-black font-semibold">Email </label>
            {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                    {form.formState.errors.email.message}
                </p>
            )}
            <input className="p-1 bg-white rounded-sm shadow-sm" type="text" id="" placeholder="Email"  {...form.register("email")} required/>
            <label className="text-black font-semibold">Senha </label>
            <input className="p-1 bg-white rounded-sm shadow-sm" type="password" id="" placeholder="Senha"  {...form.register("senha")} required/>
            <input className="p-1 bg-white rounded-sm shadow-sm" type="password" id="" placeholder="Confirme a senha"  {...form.register("senhaConfirmacao")} required/>
            {form.formState.errors.senha && (
                <p className="text-red-500 text-sm">
                    {form.formState.errors.senha?.message}
                </p>
            )}
             <select className="bg-white text-black text-center font-semibold shadow-sm"  {...form.register("semestre")}>
                <option value="" disabled selected hidden>
                    Semestre
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <button type="submit" className="px-1 text-black font-semibold bg-[#2CD76E]">Criar</button>
            <Link className="text-xs lg:text-sm xs:text-blue-600 cursor-pointer text-center" to="/login">Já é cadastrado?</Link>
        </form>
    )
}