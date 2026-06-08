import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import { useToast } from "../../contexto/toastContext";
import type { ContextPropsType } from "../../types/contextPropsType";
import { TagField } from "./fields/tagField";
import { usePostSummary } from "../../http/summary/post/usePostSummary";
import { useGetCourseSubjectsSemesterMe } from "../../http/course/useCourse";

type FormResumoProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    parentContext: ContextPropsType
}

export function FormResumo({setIsFormOpen, parentContext}: FormResumoProps) {
    const {id} = parentContext ? parentContext : {id: 0};
    const summaryId = Number(id) || 0;

    const [isPublic, setIsPublic] = useState(true)
    const {mutateAsync: summaryPost, isPending} = usePostSummary();
    const { showSuccess } = useToast();
    const { data: subjects } = useGetCourseSubjectsSemesterMe(summaryId);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])

    const formSchema = z.object({
        titulo: z.string().min(3, "O titulo deve ter ao menos 3 letras"),
        conteudo: z.string().min(50, "O resumo deve ter ao menos 50 letras"),
        materia: z.number()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            titulo: "",
            conteudo: "",
            materia: 0
        },
        resolver: zodResolver(formSchema)
    })

    const handdleForm = async (data: z.infer<typeof formSchema>) => {
       try {
            if(data.materia === 0) {
                form.setError("materia", {
                    type: "manual",
                    message: "Por favor, selecione uma matéria"
                })
                return
            }

            await summaryPost({
                titulo: data.titulo,
                conteudo: data.conteudo,
                subjectId: Number(data.materia),
                tags_ids: selectedTagIds.map(Number),
                publico: isPublic
            })

            showSuccess("Resumo criado com sucesso!");
            setIsFormOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handdleCloseBtn = () => {
        setIsFormOpen(false);
    }

    return (
       <form onSubmit={form.handleSubmit(handdleForm)}
            className="fixed z-100 top-1/2 left-1/2 w-[92vw] max-w-2xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[#D9E8F8] bg-[#F6FAFF] p-4 sm:p-6 space-y-5">
            <div className="space-y-2">
                <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="titulo">Titulo</label>
                <input
                    {...form.register("titulo")}
                    className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                    type="text"
                    id="titulo"
                    placeholder="Defina um titulo"
                />
                {form.formState.errors.titulo && (
                    <p className="text-red-500 text-sm">{form.formState.errors.titulo.message}</p>
                )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2"> 
                <div className="flex flex-col space-y-2">
                    <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="materia">Materia</label>
                    <select
                        {...form.register("materia", {valueAsNumber: true})}
                        defaultValue={0}
                        className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                    >
                        <option value={0}>Selecione uma matéria</option>
                        {subjects?.map((subject) => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                    {form.formState.errors.materia && (
                        <p className="text-red-500 text-sm">{form.formState.errors.materia.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="tag">Tag</label>
                        <TagField setSelectedTagIds={setSelectedTagIds} />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="resumo">Resumo</label>
                <textarea
                    {...form.register("conteudo")}
                    className="w-full rounded-xl bg-white px-3 py-2.5 min-h-40 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                    id="resumo"
                    placeholder="Digite aqui"
                />
                  {form.formState.errors.conteudo && (
                        <p className="text-red-500 text-sm">{form.formState.errors.conteudo.message}</p>
                    )}
            </div>
            
            <div className="flex flex-wrap gap-3 sm:flex-row flex-col"> 
                <button 
                    type="button" 
                    className={`${
                        isPublic ? "bg-[#BDEBFF]" : "bg-amber-300"
                    } flex items-center justify-between px-3 gap-4 min-w-36 rounded-xl py-2 text-sm font-medium text-[#12415C] cursor-pointer transition hover:brightness-95`}
                    onClick={() => setIsPublic((prev) => !prev)}    
                >
                    {isPublic ? "Público" : "Privado"}                    
                </button>
            </div>
            <div className="flex flex-wrap gap-3 pt-1 sm:flex-row flex-col ">
                <button type="reset" className="rounded-xl bg-gray-500 text-white px-4 py-2 text-sm font-semibold hover:brightness-95 transition">Reiniciar</button>
                <button type="submit" className="rounded-xl bg-[#2E77C2] text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition">
                 
                    {isPending ? "Carregando..." : "Criar resumo"}
                </button>
                <button type="button" onClick={() => handdleCloseBtn()} className="rounded-xl bg-[#9E1A1A] text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition sm:ml-auto">Fechar</button>
            </div>
        </form>
    )
}