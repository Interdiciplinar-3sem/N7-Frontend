import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SetStateAction } from "react";
import { useCreateAdm } from "../../http/auth/useCreateAdm";

type FormProps = {
    setUserRole: React.Dispatch<SetStateAction<"" | "ADM" | "ALUNO" | "PROFESSOR">>,
    setIsPostForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export function ADMform({setUserRole, setIsPostForm}: FormProps) {

     const {mutateAsync: createAdm} = useCreateAdm();
    
        const formSchema = z.object({
            username: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
            email: z.email("Email inválido"),
            senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
            senhaConfirmacao: z.string(),
        }).refine(data => data.senha === data.senhaConfirmacao, {
            message: "Senhas não conferem",
            path: ["senha"]
        })
    
        const form = useForm<z.infer<typeof formSchema>>({
            defaultValues: {
                username: "",
                email: "",
                senha: "",
                senhaConfirmacao: "",
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
    
                await createAdm({
                    email: data.email,
                    senha: data.senha,
                    username: data.username,
                })

                setUserRole("");
                setIsPostForm(false);
                
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
        <form onSubmit={form.handleSubmit(handdlerSignUp)} className="w-full bg-white p-6 rounded-lg flex flex-col gap-5">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Cadastro de ADM</h2>
                <p className="text-sm text-gray-500">Preencha os dados abaixo para criar um novo adm</p>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Username</label>
                <input 
                    className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text" 
                    placeholder="Digite o username"  
                    {...form.register("username")} 
                    required
                />
                {form.formState.errors.username && <span className="text-xs text-red-500">{form.formState.errors.username.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input 
                    className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email" 
                    placeholder="Digite o email"  
                    {...form.register("email")} 
                    required
                />
                {form.formState.errors.email && <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Senha</label>
                <input 
                    className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password" 
                    placeholder="Digite a senha"  
                    {...form.register("senha")} 
                    required
                />
                {form.formState.errors.senha && <span className="text-xs text-red-500">{form.formState.errors.senha.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Confirmar Senha</label>
                <input 
                    className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password" 
                    placeholder="Confirme a senha"  
                    {...form.register("senhaConfirmacao")} 
                    required
                />
                {form.formState.errors.senhaConfirmacao && <span className="text-xs text-red-500">{form.formState.errors.senhaConfirmacao.message}</span>}
            </div>

            <button 
                type="submit" 
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
                Criar Adm
            </button>
        </form>
    )
}