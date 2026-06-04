import { useOutletContext, useParams } from "react-router";
import {EditorContent } from "@tiptap/react";
import { GraduationCap, Heart } from "lucide-react";
import { useGetSummaryId } from "../http/summary/useGetSummaryId";
import { useSummaryEditor } from "../hooks/useEditorHook";
import { useEffect, useState } from "react";
import type { ContextPropsType } from "../types/contextPropsType";
import { TagField } from "../componentes/forms/fields/tagField";
import { useGetCourseSubjectsSemesterMe } from "../http/course/useGetCourseSubjectsMe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUpdateSummary } from "../http/summary/useUpdateSummary";
import { useToast } from "../contexto/toastContext";

export function PaginaResumo() {
    const parentContext = useOutletContext<ContextPropsType>();
    const { id } = useParams();
    const summaryId = Number(id) || 0;
    const {mutateAsync: update, isPending: isPendingUpdate} = useUpdateSummary(summaryId);
    const { data: resumo, isPending: isPendingSummary, isError } = useGetSummaryId(summaryId);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const isOwner = parentContext.studentId === resumo?.studentId;
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
    const [isPublic, setIsPublic] = useState(resumo?.publico)
    const { data: subjects } = useGetCourseSubjectsSemesterMe(summaryId);
    const tags = resumo?.tags?.map(tag => tag.id);
    const {showSuccess, showError} = useToast();

    const formSchema = z.object({
        titulo: z.string().min(3, "O titulo deve ter ao menos 3 letras"),
        materiaId: z.number().transform(Number)
    })

    useEffect(() => {
        if (resumo) {
            form.reset({
                titulo: resumo.titulo,
                materiaId: resumo.subjectId || undefined
            })
        }
    }, [resumo])

    useEffect(() => {
        if (resumo) {
            setIsPublic(resumo.publico);
        }
    }, [resumo]);

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            titulo: resumo?.titulo || "",
            materiaId: resumo?.subjectId || undefined
        },
        resolver: zodResolver(formSchema)
    })

    const handdleForm = async (data: z.infer<typeof formSchema>) => {
        try {
            if(data.materiaId === 0 || data.materiaId === undefined) {
                form.setError("materiaId", {
                    type: "manual",
                    message: "Por favor, selecione uma matéria"
                })
                return
            }

            await update({
                titulo: data.titulo,
                materiaId: Number(data.materiaId),
                conteudo: editor?.getHTML().replaceAll('<p>', '').replaceAll('</p>', '') || "",
                publico: isPublic ?? false,
                tags_ids: selectedTagIds.map(Number)
            })

            showSuccess("Resumo atualizado com sucesso!")
        } catch (error) {
            showError("Erro ao atualizar resumo")
            console.log(error)
        }
    }
    
    const editor = useSummaryEditor();

    useEffect(() => {
        if (resumo?.conteudo) {
            editor?.commands.setContent(resumo.conteudo);
            editor?.setEditable(isOwner);
        }
    }, [resumo, editor]);

    return (
        <main className="min-h-screen bg-slate-100 p-4">
            {!isPendingSummary && !isError && (
                <div className="flex justify-between gap-4 mx-auto px-6">
                    <section className="flex flex-col flex-3 rounded-2xl gap-2 bg-white p-6 shadow-lg">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                 <div
                                    className="
                                        min-w-10
                                        min-h-10
                                        rounded-full
                                        bg-cover
                                        bg-center
                                        bg-zinc-300
                                        pointer-events-none
                                    "
                                    style={{
                                        backgroundImage: resumo?.studentUrl ? `url(${resumo.studentUrl})` : 'none'
                                    }}
                                />
                                <span className="font-medium text-gray-700">{resumo?.studentNome}</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                <GraduationCap className="h-4 w-4 text-sky-600" />
                                <span className="font-medium text-black">{resumo?.subjectNome}</span>
                            </div>


                            {resumo?.totalCurtidas !== undefined && (
                                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                    <Heart className="h-4 w-4 text-rose-500" />
                                    <span>{resumo.totalCurtidas} curtidas</span>
                                </div>
                            )}

                            {typeof resumo?.reports === "number" && (
                                <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                    Denúncias: {resumo.reports}
                                </div>
                            )}
                        </div>

                        <section className="max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-200 p-6 shadow-inner">
                            <div
                                className="
                                    mx-auto
                                    w-full
                                    max-w-[850px]
                                    min-h-[80vh]
                                    bg-white
                                    rounded-md
                                    shadow-lg
                                    p-12
                                "
                            >
                                <EditorContent editor={editor} />
                            </div>
                        </section>
                    </section>
                    {isOwner && (
                        <section className="flex-1 bg-slate-200 shadow-2xl rounded-2xl p-2">
                            <form onSubmit={form.handleSubmit(handdleForm)}
                                className="border border-[#D9E8F8] rounded-lg bg-[#F6FAFF]/70 p-4 sm:p-6 space-y-5">
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
                                <div className="flex flex-col"> 
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="materia">Materia</label>
                                        <select
                                            {...form.register("materiaId", {
                                                valueAsNumber: true
                                            })}
                                            className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                                        >
                                            <option value="">Selecione uma matéria</option>
                                            {subjects?.map((subject) => (
                                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                                            ))}
                                        </select>
                                        {form.formState.errors.materiaId && (
                                            <p className="text-red-500 text-sm">{form.formState.errors.materiaId.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="tag">Tag</label>
                                        <TagField setSelectedTagIds={setSelectedTagIds} tags={tags} />
                                    </div>
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
                                    <button type="submit" className="rounded-xl bg-[#2E77C2] text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition">
                                        {isPendingUpdate ? "Carregando..." : "Atualizar resumo"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="rounded-xl bg-red-500 text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition"
                                    >
                                        Excluir Resumo
                                    </button>
                                </div>
                            </form>
                        </section>
                    )}

                    {isDeleteModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                                <h2 className="text-xl font-bold text-red-600">
                                    Excluir resumo
                                </h2>

                                <p className="mt-3 text-slate-600">
                                    Tem certeza que deseja excluir este resumo?
                                </p>

                                <p className="mt-2 text-sm text-slate-500">
                                    Esta ação não poderá ser desfeita.
                                </p>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            try {
                                                setIsDeleteModalOpen(false);
                                                showSuccess("Resumo excluído com sucesso!");
                                            } catch {
                                                showError("Erro ao excluir resumo");
                                            }
                                        }}
                                        className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                                    >
                                        Sim, excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </main>
    )
}