import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMemo, useState } from "react";
import { useSummaryPost } from "../../http/summary/usePostSummary";
import { useToast } from "../../contexto/toastContext";
import { useGetCourseSubjectsSemesterMe } from "../../http/course/useGetCourseSubjectsMe";
import type { ContextPropsType } from "../../types/contextPropsType";
import { useGetAllTags } from "../../http/tags/useGetAllTags";
import type { ResponseGetTagsType } from "../../http/types/responseGetTagsType";

type FormResumoProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    parentContext: ContextPropsType
}

export function FormResumo({setIsFormOpen, parentContext}: FormResumoProps) {
    const {id} = parentContext ? parentContext : {id: ""};

    const [isPublic, setIsPublic] = useState(true)
    const {mutateAsync: summaryPost, isPending} = useSummaryPost();
    const { showSuccess } = useToast();
    const { data: subjects } = useGetCourseSubjectsSemesterMe(id);
    const { data: tags } = useGetAllTags();
    const [isTagListOpen, setIsTagListOpen] = useState(false)
    const [tagSearch, setTagSearch] = useState("")
    const [selectedTags, setSelectedTags] = useState<{id: string; name: string}[]>([])
    const availableTags = (Array.isArray(tags) ? tags : (tags as any)?.data ?? []) as ResponseGetTagsType[]
    const selectedTagIds = useMemo(() => new Set(selectedTags.map((tag) => tag.id)), [selectedTags])
    const filteredTags = useMemo(() => {
        const normalizedSearch = tagSearch.trim().toLowerCase()

        return availableTags.filter((tag) => {
            const tagName = String(tag.name ?? "").trim()
            const matchesSearch = normalizedSearch ? tagName.toLowerCase().includes(normalizedSearch) : true

            return matchesSearch && !selectedTagIds.has(tag.id)
        })
    }, [availableTags, selectedTagIds, tagSearch])

    const getTagId = (tag: any) => String(tag?.id ?? "")

    const getTagName = (tag: any) => String(tag?.name ?? tag?.nome ?? tag?.title ?? "").trim()

    const addTagById = (tagId: string) => {
        if (!tagId) return
        const tag = availableTags.find((tag: ResponseGetTagsType) => tag?.id === tagId) 
        if (!tag) return
        const normalizedId = getTagId(tag)
        const normalizedName = getTagName(tag)
        if (!normalizedId || !normalizedName) return
        if (selectedTags.some(t => t.id === normalizedId)) return
        setSelectedTags(prev => [...prev, { id: normalizedId, name: normalizedName }])
        setTagSearch("")
        setIsTagListOpen(false)
      }

    const removeTag = (tagId: string) => {
        setSelectedTags(prev => prev.filter(t => t.id !== tagId))
    }

    const formSchema = z.object({
        titulo: z.string().min(3, "O titulo deve ter ao menos 3 letras"),
        conteudo: z.string().min(50, "O resumo deve ter ao menos 50 letras"),
        materia: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            titulo: "",
            conteudo: "",
            materia: ""
        },
        resolver: zodResolver(formSchema)
    })

    const handdleForm = async (data: z.infer<typeof formSchema>) => {
       try {
            if(data.materia === "Selecione uma matéria") {
                form.setError("materia", {
                    type: "manual",
                    message: "Por favor, selecione uma matéria"
                })
                return
            }

            await summaryPost({
                titulo: data.titulo,
                conteudo: data.conteudo,
                subjectId: data.materia,
                tags_ids: selectedTagIds.size > 0 ? Array.from(selectedTagIds) : [],
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
                        {...form.register("materia")}
                        defaultValue=""
                        className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                    >
                        <option>Selecione uma matéria</option>
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
                    <div>
                        <input 
                            className="w-full rounded-xl bg-white px-3 py-2.5 pr-24 border border-[#C9DFF5] outline-none transition focus:ring-2 focus:ring-[#7AB4EA]" 
                            type="text" 
                            name="tag"
                            id="tag"
                            value={tagSearch}
                            onFocus={() => setIsTagListOpen(true)}
                            onChange={(e) => {
                                setTagSearch(e.target.value)
                                setIsTagListOpen(true)
                            }}
                            placeholder="Buscar ou adicionar tag"
                        />

                        <button
                            type="button"
                            onClick={() => setIsTagListOpen((prev) => !prev)}
                            className="ml-auto mt-2 rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 transition hover:bg-sky-200"
                        >
                            {isTagListOpen ? "Fechar" : "Ver tags"}
                        </button>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {selectedTags.map((tag) => (
                                <span key={tag.id} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-800 shadow-sm">
                                    <span>{tag.name}</span>
                                    <button type="button" aria-label={`Remover tag ${tag.name}`} onClick={() => removeTag(tag.id)} className="rounded-full px-1 text-base font-bold leading-none text-sky-700 transition hover:bg-sky-100">×</button>
                                </span>
                            ))}
                        </div>

                        {isTagListOpen && (
                        <div className="fixed mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-slate-900/5">
                            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                                <p className="text-sm font-semibold text-slate-700">Tags disponíveis</p>
                                <button type="button" onClick={() => setIsTagListOpen(false)} className="text-xs font-semibold text-slate-400 transition hover:text-slate-700">
                                    Fechar
                                </button>
                            </div>

                            <div className="max-h-52 overflow-y-auto p-2">
                                {filteredTags.length > 0 ? (
                                    filteredTags.map((tag) => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            className=" flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-sky-50 hover:text-sky-800"
                                            onClick={() => addTagById(tag.id)}
                                        >
                                            <span>{tag.name}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-6 text-center text-sm text-slate-400">
                                        Nenhuma tag encontrada.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    </div>
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