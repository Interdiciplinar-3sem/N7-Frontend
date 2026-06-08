import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type SetStateAction } from "react";
import { Loader2 } from "lucide-react";
import { DOMINIOS_PERMITIDOS } from "../../types/DominiosPermitidosType";
import { EmailConfirmationStateAdm } from "../forms/EmailConfirmationStateAdm";
import { useGetCourseSubjectsSemester } from "../../http/course/useCourse";
import { useCreateProfessor } from "../../http/professor/useProfessor";

type FormProps = {
    setUserRole: React.Dispatch<SetStateAction<"" | "ADM" | "ALUNO" | "PROFESSOR">>,
    setIsPostForm: React.Dispatch<React.SetStateAction<boolean>>,
}

const formSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().refine(
        (email) => DOMINIOS_PERMITIDOS.some(d => email.endsWith(d)),
        { message: "O email deve ser institucional (@fatec, @aluno.cps ou @cps)" }
    ),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    senhaConfirmacao: z.string(),
    materiaId: z.number().min(1, "Selecione uma matéria"),
}).refine(data => data.senha === data.senhaConfirmacao, {
    message: "As senhas não coincidem",
    path: ["senhaConfirmacao"], 
});

type FormValues = z.infer<typeof formSchema>;

export function ProfessorForm({}: FormProps) {
    const [isEmailSent, setIsEmailSent] = useState<string | null>(null);
    const [semester, setSemester] = useState<number>(1);
    const { data: subjects, isPending, error } = useGetCourseSubjectsSemester(1, semester);
    const { mutateAsync: createProfessor } = useCreateProfessor();

    const form = useForm<FormValues>({
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
            senhaConfirmacao: "",
            materiaId: 0,
        },
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const handleSubmit = async (data: FormValues) => {
        try {
            await createProfessor({
                nome: data.nome,
                email: data.email,
                senha: data.senha,
                subjectId: data.materiaId,
            });

            setIsEmailSent(data.email);

        } catch (error: any) {
            if (error?.status === 409) {
                form.setError("email", {
                    type: "manual",
                    message: error.message ?? "Email já cadastrado.",
                });
                return;
            }

            form.setError("root", {
                type: "manual",
                message: error?.message ?? "Erro ao enviar convite. Tente novamente.",
            });
        }
    };

    return (
        <div>
            {isEmailSent ? (
                <EmailConfirmationStateAdm email={isEmailSent} />
            ) : (
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full bg-white p-6 rounded-lg flex flex-col gap-5"
                >
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Cadastro de Professor</h2>
                        <p className="text-sm text-gray-500">
                            Um convite de confirmação será enviado para o email informado.
                        </p>
                    </div>
                    {form.formState.errors.root && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Nome</label>
                        <input
                            className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Digite o nome completo"
                            {...form.register("nome")}
                        />
                        {form.formState.errors.nome && (
                            <span className="text-xs text-red-500">{form.formState.errors.nome.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                            className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Digite o email institucional"
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Senha</label>
                        <input
                            className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Digite a senha"
                            {...form.register("senha")}
                        />
                        {form.formState.errors.senha && (
                            <span className="text-xs text-red-500">{form.formState.errors.senha.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Confirmar Senha</label>
                        <input
                            className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Confirme a senha"
                            {...form.register("senhaConfirmacao")}
                        />
                        {form.formState.errors.senhaConfirmacao && (
                            <span className="text-xs text-red-500">{form.formState.errors.senhaConfirmacao.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between gap-4">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Filtrar por Período:
                            </span>
                            <select
                                value={semester}
                                onChange={(e) => setSemester(Number(e.target.value))}
                                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white font-medium text-gray-700 outline-hidden focus:border-emerald-500"
                            >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <option key={num} value={num}>{num}º Semestre</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Matérias Vinculadas ({subjects?.length ?? 0})
                            </h4>

                            {isPending && (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400 text-sm gap-2">
                                    <Loader2 className="animate-spin text-emerald-600" size={24} />
                                    <span>Buscando matérias do {semester}º semestre...</span>
                                </div>
                            )}

                            {!isPending && !error && subjects?.length === 0 && (
                                <div className="p-8 text-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
                                    Nenhuma matéria cadastrada neste semestre.
                                </div>
                            )}

                            {!isPending && !error && subjects && subjects.length > 0 && (
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg font-semibold text-[#22486E]" htmlFor="materia">
                                        Matéria
                                    </label>
                                    <select
                                        {...form.register("materiaId", { valueAsNumber: true })}
                                        id="materia"
                                        className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                                    >
                                        <option value={0}>Selecione uma matéria</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                    {form.formState.errors.materiaId && (
                                        <p className="text-red-500 text-sm">{form.formState.errors.materiaId.message}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {form.formState.isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin" size={16} />
                                Enviando convite...
                            </span>
                        ) : (
                            "Enviar Convite"
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}