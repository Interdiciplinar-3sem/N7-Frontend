import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";
import { useEmailValidation } from "../../http/auth/useEmailValidation";

type FormSignUpProps = {
    setIsEmailValid: React.Dispatch<React.SetStateAction<null | string>>;
}

export function FormSignUp({ setIsEmailValid }: FormSignUpProps) {
    const { mutateAsync: signUp, isPending  } = useEmailValidation();

    const DOMINIOS_PERMITIDOS = [
        "@aluno.cps.sp.gov.br",
        "@fatec.sp.gov.br",
        "@cps.sp.gov.br"
    ];

    const formSchema = z.object({
        nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
        email: z.string()
            .email("Email inválido")
            .refine((email) => {
                return DOMINIOS_PERMITIDOS.some(dominio => email.endsWith(dominio));
            }, {
                message: "O email deve ser institucional (@fatec, @aluno.cps ou @cps)"
            }),
        senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
        senhaConfirmacao: z.string(),
        semestre: z.string(),
    }).refine(
        data => data.senha === data.senhaConfirmacao,
        {
            message: "Senhas não conferem",
            path: ["senha"], 
        }
);


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
        reValidateMode: "onChange",
    });

    const handdlerSignUp = async (formData: z.infer<typeof formSchema>) => {
        try {
            if (formData.senha !== formData.senhaConfirmacao) {
                form.setError("senha", {
                    type: "manual",
                    message: "As senhas não coincidem",
                });
                return;
            }

            await signUp({
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                semestre: Number(formData.semestre),
            });

            setIsEmailValid(formData.email);

        } catch (error) {
            try {
                const parsed = JSON.parse((error as Error).message);

                if (parsed.status === 409 || parsed.status === 400) {
                    form.setError("email", {
                        type: "manual",
                        message: parsed.message,
                    });
                }
            } catch {
                form.setError("email", {
                    type: "manual",
                    message: "Erro ao realizar cadastro. Tente novamente.",
                });
            }
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(handdlerSignUp)}
            className="space-y-4"
        >
            <h1 className="text-2xl font-semibold text-white mb-6">
                Criar conta
            </h1>
            <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Nome
                </label>

                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                    <svg
                        className="w-4 h-4 text-white/50 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>

                    <input
                        {...form.register("nome")}
                        type="text"
                        placeholder="Seu nome"
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                    />
                </div>

                {form.formState.errors.nome && (
                    <p className="text-red-300 text-xs mt-1">
                        {form.formState.errors.nome.message}
                    </p>
                )}
            </div>
            <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    E-mail
                </label>

                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                    <svg
                        className="w-4 h-4 text-white/50 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>

                    <input
                        {...form.register("email")}
                        type="email"
                        placeholder="seu@email.com"
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                    />
                </div>

                {form.formState.errors.email && (
                    <p className="text-red-300 text-xs mt-1">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>
            <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Senha
                </label>

                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                    <svg
                        className="w-4 h-4 text-white/50 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>

                    <input
                        {...form.register("senha")}
                        type="password"
                        placeholder="••••••••"
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Confirmar senha
                </label>

                <div className="flex items-center gap-3 bg-white/15 border border-white/25 rounded-xl px-4 focus-within:border-white/60 focus-within:bg-white/20 transition-all duration-200">
                    <svg
                        className="w-4 h-4 text-white/50 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    </svg>

                    <input
                        {...form.register("senhaConfirmacao")}
                        type="password"
                        placeholder="••••••••"
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm py-3"
                    />
                </div>

                {form.formState.errors.senha && (
                    <p className="text-red-300 text-xs mt-1">
                        {form.formState.errors.senha.message}
                    </p>
                )}
            </div>
            <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Semestre
                </label>

                <select
                    {...form.register("semestre")}
                    className="
                        w-full
                        bg-white/15
                        border
                        border-white/25
                        rounded-xl
                        px-4
                        py-3
                        text-white
                        outline-none
                    "
                >
                    <option value="1" className="text-black">
                        1º Semestre
                    </option>
                    <option value="2" className="text-black">
                        2º Semestre
                    </option>
                    <option value="3" className="text-black">
                        3º Semestre
                    </option>
                    <option value="4" className="text-black">
                        4º Semestre
                    </option>
                    <option value="5" className="text-black">
                        5º Semestre
                    </option>
                    <option value="6" className="text-black">
                        6º Semestre
                    </option>
                </select>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="
                    w-full
                    bg-white
                    text-[#2d5be3]
                    font-bold
                    text-sm
                    py-3.5
                    rounded-xl
                    mt-2
                    hover:bg-white/90
                    active:scale-[0.98]
                    transition-all
                    duration-200
                    shadow-lg
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    disabled:active:scale-100
                "
            >
                {isPending ? "Enviando..." : "Cadastrar-se"}
            </button>
            <p className="text-center text-xs text-white/50 pt-1">
                Já tem uma conta?{" "}
                <Link
                    to="/login"
                    className="text-[#aac9f7] font-semibold hover:text-white transition-colors"
                >
                    Entrar
                </Link>
            </p>
        </form>
    );
}