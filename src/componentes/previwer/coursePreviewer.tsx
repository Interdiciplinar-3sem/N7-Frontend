import { X, BookOpen, Loader2, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useAdminPreviewer } from "../../layout/layoutAdmin";
import { useGetCourseSubjectsSemester } from "../../http/course/useCourse";

interface CoursePreviewerProps {
    courseId: number | null;
    onClose: () => void;
}

export function CoursePreviewer({ courseId, onClose }: CoursePreviewerProps) {
    const isOpen = !!courseId;
    const { openSubject } = useAdminPreviewer();
    const [semester, setSemester] = useState<number>(1);

    const { data: subjects, isPending, error } = useGetCourseSubjectsSemester(courseId ?? 1, semester);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" onClick={onClose} />

            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <GraduationCap size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Detalhes do Curso</h3>
                            <p className="text-xs text-gray-500">Selecione uma matéria para ver os resumos</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filtrar por Período:</span>
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

                    {!isPending && !error && subjects && (
                        <div className="space-y-2">
                            {subjects.map((subject: any) => (
                                <button 
                                    key={subject.id} 
                                    onClick={() => openSubject(subject.id)} 
                                    className="w-full text-left flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white shadow-xs hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors shrink-0">
                                        <BookOpen size={16} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-800 truncate group-hover:text-emerald-700">
                                            {subject.name}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}