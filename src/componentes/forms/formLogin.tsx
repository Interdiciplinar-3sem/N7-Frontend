import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useLogin } from "../../http/auth/useAuth";
import { HomeIcon } from "lucide-react";

export function FormLogin() {
    const navigate = useNavigate()
    


    const handdleNavigate = (path: string) => {
        navigate(path);
    }

    const { mutateAsync: login } = useLogin();

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
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70 relative overflow-hidden">
            <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-white opacity-3" />
            <div className="absolute bottom-[-60px] left-[-40px] w-56 h-56 rounded-full bg-white opacity-4" />
            <div className="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 shadow-2xl">

                <section className="w-full flex items-start justify-between mb-10">
                    <div className="mb-8">
                        <span className="text-2xl font-bold text-white">
                            Resumi
                        </span>
                        <span className="text-2xl font-bold text-[#aac9f7]">
                            FY
                        </span>
                    </div>
                   <button className="hidden sm:block text-xs xxs:text-sm" onClick={() => handdleNavigate("/")}>
                        <HomeIcon className="text-white cursor-pointer w-5 h-5 inline-block mr-1 transition transition-colors duration-300 hover:text-[#aac9f7]" />
                   </button>
                </section>

                <h1 className="text-2xl font-semibold text-white mb-6">Entrar</h1>

                <form onSubmit={form.handleSubmit(handdlerLogin)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                            E-mail
                        </label>
                        <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                            <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                                {...form.register("email")}
                            />
                        </div>
                        {form.formState.errors.email && (
                            
                            <p className="text-red-300 text-xs mt-1.5 pl-1">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                            Senha
                        </label>
                        <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                            <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                                {...form.register("senha")}
                            />
                        </div>
                        {form.formState.errors.senha && (
                            <p className="text-red-300 text-xs mt-1.5 pl-1">
                                {form.formState.errors.senha.message}
                            </p>
                        )}
                    </div>

                    {form.formState.errors.root && (
                        <div className="bg-red-500/20 border border-red-400/40 rounded-xl px-4 py-3">
                            <p className="text-red-200 text-sm">{form.formState.errors.root.message}</p>
                        </div>
                    )}

                  
                    <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-white text-[#2d5be3] font-bold text-sm py-3.5 rounded-xl mt-2
                       hover:bg-white/90 active:scale-[0.98] transition-all duration-200
                       disabled:opa city-60 disabled:cursor-not-allowed shadow-lg"
                    >
                        {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
                    </button>

                    <p className="text-center text-xs text-white/50 pt-1">
                        Não tem conta?{" "}
                        <Link to="/cadastro" className="text-[#aac9f7] font-semibold hover:text-white transition-colors">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}