import { useEffect } from "react"
import { EditorContent } from "@tiptap/react"
import { useSummaryEditor } from "../../hooks/useEditorHook"
import { GraduationCap, Heart, X, User, ExternalLink } from "lucide-react"
import { Overlay } from "../overlay"
import { useGetAdminSummaryId } from "../../http/admin/useGetAdminStudentSummaryId"
import { useNavigate } from "react-router-dom"

type SummaryPreviewerDrawerProps = {
    id: number;
    onClose: () => void;
}

export const SummaryPreviewerDrawer = ({ id, onClose }: SummaryPreviewerDrawerProps) => {
    const { data: summary, isPending, isError } = useGetAdminSummaryId(id);
    const editor = useSummaryEditor();
    const navigate = useNavigate();

    useEffect(() => {
        if (summary?.conteudo) {
            editor?.commands.setContent(summary.conteudo);
            editor?.setEditable(false);
        }
    }, [summary, editor]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    const handleGoToProfile = () => {
        if (summary?.studentId) {
            onClose();
            navigate(`/perfil/${summary.studentId}`);
        }
    };

    return (
        <>
            <Overlay onClose={onClose} />
            <div className="fixed top-0 right-0 z-100 h-screen w-full max-w-md border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:max-w-lg lg:max-w-xl">
                <div className="flex h-full flex-col">
                    <header className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-lg font-bold text-slate-800">Visualizar Resumo</h2>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {isPending ? (
                            <div className="flex h-40 items-center justify-center space-y-4">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
                            </div>
                        ) : isError ? (
                            <div className="rounded-xl bg-red-50 p-4 text-center text-red-600">
                                Não foi possível carregar o resumo.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                                            <GraduationCap size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Matéria</span>
                                            <span className="text-sm font-semibold text-slate-700 truncate max-w-[150px]">
                                                {summary?.subjectNome || "Não informada"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                            <Heart size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Curtidas</span>
                                            <span className="text-sm font-semibold text-slate-700">
                                                {summary?.totalCurtidas ?? 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100 sm:col-span-2">
                                        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200 flex-shrink-0">
                                            {summary?.studentUrl ? (
                                                <img src={summary.studentUrl} alt={summary.studentNome} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                    <User size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Autor</span>
                                            <span className="text-sm font-semibold text-slate-700 truncate">
                                                {summary?.studentNome}
                                            </span>
                                        </div>
                                        {summary?.studentId && (
                                            <button
                                                onClick={handleGoToProfile}
                                                title="Ver perfil do autor"
                                                className="flex items-center gap-1.5 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600 ring-1 ring-sky-200 transition hover:bg-sky-100 flex-shrink-0"
                                            >
                                                <ExternalLink size={13} />
                                                Ver perfil
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                                    {summary?.titulo}
                                </h1>

                                <div className="prose prose-slate max-w-none rounded-2xl border border-slate-100 bg-white p-4 shadow-sm ring-1 ring-slate-50">
                                    <EditorContent editor={editor} className="min-h-[300px]" />
                                </div>
                            </div>
                        )}
                    </div>

                    <footer className="border-t border-slate-100 bg-slate-50/30 p-4">
                        <button
                            onClick={onClose}
                            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                        >
                            Fechar Visualização
                        </button>
                    </footer>
                </div>
            </div>
        </>
    )
}