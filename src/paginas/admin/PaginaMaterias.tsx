import { useState } from "react";
import { X } from "lucide-react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { Overlay } from "../../componentes/overlay";
import { useGetSubjectsDesactivated } from "../../http/subject/useGetSubjectsDesactivated";
import { useUpdateSubjectStatus } from "../../http/subject/useUpdateSubjectStatus";
import { useGetAllSubjects } from "../../http/subject/useGetAllSubjects";
import type { ResponseGetSubjectType } from "../../http/types/responseGetSubjectType";

export function PaginaMaterias() {
    const { data, isPending } = useGetAllSubjects();
    const { data: dataDesactivated } = useGetSubjectsDesactivated();
    const { mutateAsync: updateSubjectStatus } = useUpdateSubjectStatus();
    const [updatingSubjectId, setUpdatingSubjectId] = useState<number | null>(null);
    const [isPostForm, setIsPostForm] = useState(false);
    
    const totalSubjects = isPending ? "carregando..." : data?.length ?? 0;
    const totalInactiveSubjects = dataDesactivated?.length ?? 0;
    
    const handleStatusUpdate = async (subjectId: number) => {
        setUpdatingSubjectId(subjectId);
        try {
            await updateSubjectStatus(subjectId);
        } finally {
            setUpdatingSubjectId(null);
        }
    };

    const columns: Column<ResponseGetSubjectType>[] = [
        {
            key: "name",
            header: "Matéria",
            width: "320px",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">
                        {row.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-medium text-gray-900 truncate">{row.name}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter mt-0.5">
                            MATÉRIA ID: {row.id}
                        </span>
                    </div>
                </div>
            ),
        },
        { 
            key: "semestre", 
            header: "Semestre",
            width: "120px",
            align: "center",
            render: (row) => (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                    {row.semestre}º Semestre
                </span>
            )
        },
        { 
            key: "courseName", 
            header: "Curso", 
            width: "180px",
            render: (row) => (
                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                    {row.courseName}
                </span>
            )
        },
        {
            key: "status",
            header: "Status",
            width: "120px",
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        row.ativo
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {row.ativo ? "Ativo" : "Inativo"}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Ações",
            width: "150px",
            align: "center",
            render: (row) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => handleStatusUpdate(row.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors w-28 text-center ${
                            row.ativo
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                        disabled={updatingSubjectId === row.id}
                    >
                        {updatingSubjectId === row.id
                            ? "..."
                            : row.ativo
                            ? "Desativar"
                            : "Ativar"}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <AdminCrudPage
                title="Matérias"
                description="Cadastre e acompanhe as matérias vinculadas aos cursos"
                primaryActionLabel="Nova matéria"
                onPrimaryAction={() => setIsPostForm(true)}
                stats={[
                    { title: "Total de matérias", value: totalSubjects.toString(), cor: "azul" },
                    { title: "Inativas", value: totalInactiveSubjects.toString(), cor: "vermelho" },
                ]}
                columns={columns}
                data={data ?? []}
                dataDesactivated={dataDesactivated ?? []}
                rowKey={(row) => row.id}
                tableTitle="matérias"
                emptyPlaceholder={
                    <div className="p-6 text-center text-gray-400">Nenhuma matéria encontrada</div>
                }
            />

            {isPostForm && (
                <>
                    <Overlay />
                    <div className="fixed z-100 top-1/2 left-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
                        <div className="flex justify-end mb-4">
                            <button
                                className="p-1 bg-gray-300 text-gray-700 rounded-md"
                                onClick={() => setIsPostForm(false)}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold">Formulário de criação de matéria</h4>
                            <p className="text-sm text-gray-500">
                                A estrutura do CRUD já está pronta. Quando o endpoint/formulário de criação estiver disponível, ele pode ser plugado aqui sem alterar a página.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}