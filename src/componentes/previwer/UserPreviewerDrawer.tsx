import { X, GraduationCap, Calendar, Mail, FileText, User as UserIcon } from "lucide-react";

import { useGetSummaryStudentId } from "../../http/summary/useGetSummaryStudentId";
import { Overlay } from "../overlay";
import { useEffect } from "react";
import { useGetAdminStudent } from "../../http/admin/useGetAdminStudent";

type UserPreviewDrawerProps = {
    studentId: number;
    onClose: () => void;
    onOpenSummary: (summaryId: number) => void;
}

export function UserPreviewDrawer({ studentId, onClose, onOpenSummary }: UserPreviewDrawerProps) {
    const { data: student, isPending: isStudentPending } = useGetAdminStudent(studentId);
    const { data: summaries, isPending: isSummariesPending } = useGetSummaryStudentId(studentId);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <>
            <Overlay onClose={onClose} />
            <div className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-blue-600" />
                        Perfil do Usuário
                    </h3>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {isStudentPending ? (
                        <div className="flex flex-col items-center justify-center h-40 gap-3">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-500">Carregando perfil...</p>
                        </div>
                    ) : student ? (
                        <div className="space-y-6">
                            {/* Avatar & Basic Info */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-md overflow-hidden mb-4">
                                    {student.avatar?.url ? (
                                        <img src={student.avatar.url} alt={student.nome} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-blue-300">
                                            <UserIcon size={48} />
                                        </div>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">{student.nome}</h4>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                                    <Mail size={14} />
                                    {"Email não informado"}
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="text-blue-600 mb-2">
                                        <GraduationCap size={18} />
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Curso</div>
                                    <div className="text-sm font-medium text-gray-800 truncate">
                                        {student.course?.name || "Não informado"}
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="text-blue-600 mb-2">
                                        <Calendar size={18} />
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Semestre</div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {student.semestre}º Semestre
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            {student.bio && (
                                <div className="space-y-2">
                                    <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Sobre</h5>
                                    <p className="text-sm text-gray-600 leading-relaxed bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50">
                                        {student.bio}
                                    </p>
                                </div>
                            )}

                            {/* Stats */}
                            <div className="flex justify-around py-4 border-y border-gray-100">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">{student.seguidores}</div>
                                    <div className="text-xs text-gray-500">Seguidores</div>
                                </div>
                                <div className="w-px bg-gray-100"></div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">{student.seguindo}</div>
                                    <div className="text-xs text-gray-500">Seguindo</div>
                                </div>
                                <div className="w-px bg-gray-100"></div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">{student.pontuação || 0}</div>
                                    <div className="text-xs text-gray-500">Pontos</div>
                                </div>
                            </div>

                            {/* Summaries Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                                        <FileText size={16} className="text-blue-600" />
                                        Resumos Publicados
                                    </h5>
                                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                        {summaries?.length || 0}
                                    </span>
                                </div>

                                {isSummariesPending ? (
                                    <div className="space-y-3">
                                        {[1, 2].map(i => (
                                            <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-xl"></div>
                                        ))}
                                    </div>
                                ) : summaries && summaries.length > 0 ? (
                                    <div className="space-y-3">
                                        {summaries.slice(0, 5).map((summary) => (
                                            <button
                                                key={summary.summaryId}
                                                onClick={() => onOpenSummary(summary.summaryId)}
                                                className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                                            >
                                                <div className="font-medium text-gray-800 text-sm group-hover:text-blue-700 transition-colors truncate">
                                                    {summary.titulo}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                                                    <span>{summary.subjectNome}</span>
                                                    <span>•</span>
                                                    <span>{summary.totalCurtidas} curtidas</span>
                                                </div>
                                            </button>
                                        ))}
                                        {summaries.length > 5 && (
                                            <p className="text-center text-xs text-gray-400 italic">
                                                Mostrando os 5 resumos mais recentes
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        <p className="text-sm text-gray-400">Nenhum resumo publicado ainda.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Usuário não encontrado.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
