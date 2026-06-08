import { ExternalLink, User } from "lucide-react";

type StudentPreviewProfileProps = {
    studentUrl?: string;
    studentNome: string;
    studentId?: number;
    handleGoToProfile?: () => void;
}
export const StudentPreviewProfile = ({studentNome, studentUrl, studentId, handleGoToProfile}: StudentPreviewProfileProps) =>{
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100 sm:col-span-2">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200 flex-shrink-0">
                {studentUrl ? (
                    <img src={studentUrl} alt={studentNome} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <User size={16} />
                    </div>
                )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Autor</span>
                <span className="text-sm font-semibold text-slate-700 truncate">
                    {studentNome}
                </span>
            </div>
            {studentId && (
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
    )
}