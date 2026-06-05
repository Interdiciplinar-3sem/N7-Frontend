import { useNavigate, useOutletContext, useParams } from "react-router";
import { EditorContent } from "@tiptap/react";
import { GraduationCap, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { useGetSummaryId } from "../http/summary/useGetSummaryId";
import { useSummaryEditor } from "../hooks/useEditorHook";
import { useEffect, useState } from "react";
import type { ContextPropsType } from "../types/contextPropsType";
import { useGetCourseSubjectsSemesterMe } from "../http/course/useGetCourseSubjectsMe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUpdateSummary } from "../http/summary/useUpdateSummary";
import { useToast } from "../contexto/toastContext";
import { useUpdateStatusSummary } from "../http/summary/useUpdateStatusSummary";
import { useSummaryPost } from "../http/summary/usePostSummary";
import { SummaryFormFields } from "../componentes/forms/formCamposResumo";

const formSchema = z.object({
    titulo: z.string().min(3, "O título deve ter ao menos 3 letras"),
    materiaId: z.number().transform(Number)
});

type FormValues = z.infer<typeof formSchema>;

export function PaginaResumo() {
    const navigate = useNavigate();
    const { showError, showSuccess } = useToast();
    const parentContext = useOutletContext<ContextPropsType>();
    const { id } = useParams();
    const summaryId = Number(id) || 0;
    const isCreating = summaryId === 0;
    const [mobileStep, setMobileStep] = useState<1 | 2>(1);

    const { data: resumo, isPending: isPendingSummary, isError, error } = useGetSummaryId(summaryId);
    const { mutateAsync: deleteSummary } = useUpdateStatusSummary();
    const { mutateAsync: update, isPending: isPendingUpdate } = useUpdateSummary(summaryId);
    const { mutateAsync: summaryPost, isPending: isPendingCreate } = useSummaryPost();
    const { confirm } = useToast();

    if (!isCreating && ((resumo?.publico === false && resumo.studentId !== parentContext.studentId) || error?.message === "400")) {
        navigate("/feed");
        showError("Acesso negado a este resumo");
    }

    const isOwner = isCreating || parentContext.studentId === resumo?.studentId;
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [isPublic, setIsPublic] = useState(resumo?.publico ?? true);
    const { data: subjects } = useGetCourseSubjectsSemesterMe(summaryId);
    const tags = resumo?.tags?.map(tag => tag.id);

    const form = useForm<FormValues>({
        defaultValues: {
            titulo: resumo?.titulo || "",
            materiaId: resumo?.subjectId || undefined
        },
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        if (resumo) {
            form.reset({
                titulo: resumo.titulo,
                materiaId: resumo.subjectId || undefined
            });
        }
    }, [resumo]);

    useEffect(() => {
        if (resumo) setIsPublic(resumo.publico);
    }, [resumo]);

    const editor = useSummaryEditor();

    useEffect(() => {
        if (resumo?.conteudo) {
            editor?.commands.setContent(resumo.conteudo);
            editor?.setEditable(isOwner);
        }
    }, [resumo, editor]);

    const handleContinue = () => {
        const conteudo = editor?.getHTML().replaceAll('<p>', '').replaceAll('</p>', '') || "";
        if (conteudo.trim().length < 50) {
            showError("O resumo deve ter ao menos 50 caracteres");
            return;
        }
        setMobileStep(2);
    };

    const handdleForm = async (data: FormValues) => {
        try {
            const conteudo = editor?.getHTML().replaceAll('<p>', '').replaceAll('</p>', '') || "";

            if (conteudo.trim().length < 50) {
                showError("O resumo deve ter ao menos 50 caracteres");
                return;
            }

            if (!data.materiaId || data.materiaId === 0 || isNaN(data.materiaId)) {
                form.setError("materiaId", {
                    type: "manual",
                    message: "Por favor, selecione uma matéria"
                });
                return;
            }

            if (isCreating) {
                const response = await summaryPost({
                    titulo: data.titulo,
                    conteudo,
                    subjectId: Number(data.materiaId),
                    tags_ids: selectedTagIds.map(Number),
                    publico: isPublic
                });
                showSuccess("Resumo criado com sucesso!");
                navigate(`/resumo/${response.summaryId}`);
            } else {
                await update({
                    titulo: data.titulo,
                    materiaId: Number(data.materiaId),
                    conteudo,
                    publico: isPublic ?? false,
                    tags_ids: selectedTagIds.map(Number)
                });
                showSuccess("Resumo salvo com sucesso!");
            }
        } catch (error) {
            showError(isCreating ? "Erro ao criar resumo" : "Erro ao salvar resumo");
            console.log(error);
        }
    };

    const isPending = isCreating ? isPendingCreate : isPendingUpdate;

    const handleDelete = async () => {
        const ok = await confirm({
            title: "Excluir resumo",
            message: "Tem certeza?",
            confirmText: "Sim, excluir"
        });
        if (!ok) return;
        await deleteSummary(summaryId);
        showSuccess("Resumo excluído com sucesso!");
        navigate("/feed");
    };

    const handleVisibility = async () => {
        const nextValue = !isPublic;
        if (!isCreating) {
            const ok = await confirm({
                title: "Alterar visibilidade",
                message: `Deseja tornar este resumo ${nextValue ? "público" : "privado"}`,
                description: "Lembrando que ainda precisa salvar para efetuar a mudança",
                confirmText: "Sim"
            });
            if (!ok) return;
        }
        setIsPublic(nextValue);
    };

    const sharedFormProps = {
        form,
        subjects,
        tags,
        isPublic,
        isPending,
        isCreating,
        setSelectedTagIds,
        onSubmit: handdleForm,
        onDelete: handleDelete,
        onVisibility: handleVisibility,
    };

    return (
        <main className="h-full bg-slate-100 p-4">
            {(isCreating || (!isPendingSummary && !isError)) && (
                <div className="flex flex-col h-full gap-3">
                    {isOwner && (
                        <div className="flex lg:hidden items-center gap-2 px-1">
                            <div className={`h-2 flex-1 rounded-full transition-colors ${mobileStep === 1 ? "bg-[#2E77C2]" : "bg-slate-300"}`} />
                            <div className={`h-2 flex-1 rounded-full transition-colors ${mobileStep === 2 ? "bg-[#2E77C2]" : "bg-slate-300"}`} />
                        </div>
                    )}

                    <div className="flex gap-4 w-full flex-1 md:justify-between md:mx-auto md:px-6">
                        <section className="flex flex-col w-full sm:flex-3 rounded-2xl gap-2 bg-white p-1 md:p-4 shadow-lg overflow-hidden">
                            {!isCreating && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                        <div
                                            className="min-w-10 min-h-10 rounded-full bg-cover bg-center bg-zinc-300 pointer-events-none"
                                            style={{ backgroundImage: resumo?.studentUrl ? `url(${resumo.studentUrl})` : 'none' }}
                                        />
                                        <span className="font-medium text-gray-700 text-sm truncate">{resumo?.studentNome}</span>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                        <GraduationCap className="h-4 w-4 text-sky-600 shrink-0" />
                                        <span className="font-medium text-black text-sm truncate">{resumo?.subjectNome}</span>
                                    </div>
                                    {resumo?.totalCurtidas !== undefined && (
                                        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                            <Heart className="h-4 w-4 text-rose-500 shrink-0" />
                                            <span className="text-sm">{resumo.totalCurtidas} curtidas</span>
                                        </div>
                                    )}
                                    {typeof resumo?.reports === "number" && (
                                        <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200 text-sm">
                                            Denúncias: {resumo.reports}
                                        </div>
                                    )}
                                </div>
                            )}
                            <section className="max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-200 p-2 md:p-4 lg:p-6 shadow-inner">
                                <div className="mx-auto w-full max-w-[850px] min-h-[80vh] bg-white rounded-md shadow-lg p-6 lg:p-12">
                                    <EditorContent editor={editor} />
                                </div>
                            </section>

                            {isOwner && (
                                <button
                                    type="button"
                                    onClick={handleContinue}
                                    className="flex lg:hidden items-center justify-center gap-2 w-full rounded-xl bg-[#2E77C2] text-white py-3 text-sm font-semibold hover:brightness-95 transition"
                                >
                                    Continuar
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            )}
                        </section>

                        {isOwner && (
                            <section className={`
                                bg-slate-200 shadow-2xl rounded-2xl p-2
                                lg:flex lg:static lg:flex-1
                                ${mobileStep === 2
                                    ? "fixed inset-0 z-50 flex flex-col overflow-y-auto"
                                    : "hidden"
                                }
                            `}>
                                {mobileStep === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setMobileStep(1)}
                                        className="flex lg:hidden items-center gap-2 text-sm text-[#22486E] font-medium mb-3 px-2 hover:opacity-70 transition"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Voltar ao editor
                                    </button>
                                )}
                                <SummaryFormFields {...sharedFormProps} />
                            </section>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}