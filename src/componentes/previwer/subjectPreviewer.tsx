import { X, BookOpenIcon, Loader2, FileText } from "lucide-react";
import { useGetSummarySubjectId } from "../../http/summary/useGetSummarySubject"; 
import { useAdminPreviewer } from "../../layout/layoutAdmin";

interface SubjectPreviewerProps {
    subjectId: number | null;
    onClose: () => void;
}

export function SubjectPreviewer({ subjectId, onClose }: SubjectPreviewerProps) {
    const isOpen = !!subjectId;
    const { openSummary } = useAdminPreviewer();

    const { data: summaries, isPending, error } = useGetSummarySubjectId(subjectId ?? 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" onClick={onClose} />

            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <BookOpenIcon size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Resumos da Matéria</h3>
                            <p className="text-xs text-gray-500">Documentos e mídias estudantis publicados</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Resumos Disponíveis ({summaries?.length ?? 0})
                    </h4>

                    {isPending && (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400 text-sm gap-2">
                            <Loader2 className="animate-spin text-blue-600" size={24} />
                            <span>Buscando resumos da disciplina...</span>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
                            Erro ao carregar os resumos desta matéria.
                        </div>
                    )}

                    {!isPending && !error && summaries?.length === 0 && (
                        <div className="p-8 text-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
                            Ainda não há nenhum resumo publicado nesta matéria.
                        </div>
                    )}

                    {!isPending && !error && summaries && (
                        <div className="space-y-2">
                            {summaries.map((summary: any) => (
                                <button
                                    key={summary.summaryId ?? summary.id}
                                    onClick={() => openSummary(summary.summaryId ?? summary.id)}
                                    className="w-full text-left flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white shadow-xs hover:border-blue-200 hover:bg-blue-50/10 transition-all group cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                                        <FileText size={16} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-800 truncate group-hover:text-gray-900">
                                            {summary.titulo ?? summary.title}
                                        </p>
                                        <p className="text-[11px] text-gray-400 truncate">
                                            Por: {summary.autor?.email ?? "Estudante"}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}