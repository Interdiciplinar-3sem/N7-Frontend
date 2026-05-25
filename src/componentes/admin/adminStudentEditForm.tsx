import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { useUpdateStudent } from "../../http/student/useUpdateStudent"
import { useGetStudent } from "../../http/student/useGetStudent"

type StudentEditFormProps = {
    studentId: string
    onClose: () => void
}

const formSchema = z.object({
    nome: z.preprocess(
        (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
        z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional()
    ),
    semestre: z.preprocess(
        (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
        z.string().optional()
    ),
    bio: z.preprocess(
        (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
        z.string().optional()
    )
})

export function StudentEditForm({ studentId, onClose }: StudentEditFormProps) {
    const { mutateAsync: updateStudent } = useUpdateStudent(studentId)
    const { data: studentData, isPending: isLoadingStudent } = useGetStudent(studentId)

    type FormValues = {
        nome?: string
        semestre?: string
        bio?: string
    }

    const form = useForm<FormValues>({
        defaultValues: {
            nome: "",
            semestre: "1",
            bio: ""
        },
        // @ts-expect-error - zod optional fields resolver compatibility
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        reValidateMode: "onChange"
    })

    useEffect(() => {
        if (studentData) {
            form.reset({
                nome: studentData.nome ?? "",
                semestre: studentData.semestre?.toString() ?? "1",
                bio: studentData.bio ?? ""
            }, { keepDirty: false, keepValues: false })
        }
    }, [studentData])

    const handleEditStudent = async (data: z.infer<typeof formSchema>) => {
        const payload: Record<string, string | number> = {}

        if (data.nome !== undefined) payload.nome = data.nome
        if (data.semestre !== undefined && data.semestre !== "") payload.semestre = Number(data.semestre)
        if (data.bio !== undefined) payload.bio = data.bio

        if (Object.keys(payload).length === 0) {
            onClose()
            return
        }

        try {
            await updateStudent(payload)
            onClose()
        } catch (error) {
            console.error("Erro ao atualizar aluno:", error)
        }
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                    <h4 className="font-semibold text-gray-800">Editar aluno</h4>
                    <p className="text-sm text-gray-500">
                        {isLoadingStudent ? "Carregando dados..." : "Atualize os dados do aluno selecionado"}
                    </p>
                </div>

                <button
                    type="button"
                    className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>

            {isLoadingStudent ? (
                <div className="w-full bg-white p-6 rounded-lg flex justify-center items-center min-h-40">
                    <p className="text-gray-500">Carregando formulário...</p>
                </div>
            ) : (
                <form onSubmit={form.handleSubmit(handleEditStudent)} className="w-full bg-white p-6 rounded-lg flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Nome</label>
                        <input
                            className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Digite o nome completo"
                            {...form.register("nome")}
                        />
                        {form.formState.errors.nome && <span className="text-xs text-red-500">{form.formState.errors.nome.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Semestre</label>
                        <select
                            className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...form.register("semestre")}
                        >
                            <option value="1">1º Semestre</option>
                            <option value="2">2º Semestre</option>
                            <option value="3">3º Semestre</option>
                            <option value="4">4º Semestre</option>
                            <option value="5">5º Semestre</option>
                            <option value="6">6º Semestre</option>
                        </select>
                        {form.formState.errors.semestre && <span className="text-xs text-red-500">{form.formState.errors.semestre.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Bio</label>
                        <textarea
                            className="p-2 border border-gray-200 bg-gray-50 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-28"
                            placeholder="Conte um pouco sobre o aluno"
                            {...form.register("bio")}
                        />
                        {form.formState.errors.bio && <span className="text-xs text-red-500">{form.formState.errors.bio.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Avatar</label>
                        <p className="text-xs text-gray-500">O avatar é carregado pelo perfil e não é editado neste formulário.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
                    >
                        {form.formState.isSubmitting ? "Salvando..." : "Salvar alterações"}
                    </button>
                </form>
            )}
        </div>
    )
}
