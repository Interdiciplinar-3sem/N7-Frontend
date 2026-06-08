import { useState } from "react";
import { X } from "lucide-react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { Overlay } from "../../componentes/overlay";
import { useGetCourses, useGetCoursesDesactivated, useGetCourseSubjects, useUpdateCourseStatus } from "../../http/course/useCourse";
import type { ResponseGetCourseType } from "../../http/course/types/ResponseGetCourseType"; 

export function PaginaCursos() {
    const { data, isPending } = useGetCourses();
    const { data: courseSubjects, isPending: isPendingCourseSubjects } = useGetCourseSubjects(1);
    const { data: dataDesactivated } = useGetCoursesDesactivated();
    const { mutateAsync: updateCourseStatus } = useUpdateCourseStatus();
    
    const [updatingCourseId, setUpdatingCourseId] = useState<number | null>(null);
    const [isPostForm, setIsPostForm] = useState(false);

    const totalCourses = isPending ? "carregando..." : data?.length ?? 0;
    const totalInactiveCourses = dataDesactivated?.length ?? 0;

    const totalSubjects = isPendingCourseSubjects
        ? { materias: "carregando..." }
        : courseSubjects?.length ?? 0;

    const totalSemesters = isPendingCourseSubjects
        ? "carregando..."
        : new Set(courseSubjects?.map((course) => course.semestre).filter(Boolean)).size;

    const handdleStatusUpdate = async (courseId: number) => {
        setUpdatingCourseId(courseId);
        try {
            await updateCourseStatus(courseId);
        } finally {
            setUpdatingCourseId(null);
        }
    };

    const columns: Column<ResponseGetCourseType>[] = [
        {
            key: "name",
            header: "Curso",
            width: "350px",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs shrink-0">
                        {row.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-medium text-gray-900 truncate">{row.name}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter mt-0.5">
                            CURSO ID: {row.id}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: "descricao",
            header: "Descrição / Informações",
            width: "300px",
            render: (row) => (
                <span className="text-gray-500 text-sm block truncate max-w-xs">
                    {row.descricao || "Sem descrição informada"}
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
                        onClick={() => handdleStatusUpdate(row.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors w-28 text-center ${
                            row.ativo
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                        disabled={updatingCourseId === row.id}
                    >
                        {updatingCourseId === row.id
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
                title="Cursos"
                description="Organize os cursos disponíveis no dashboard administrativo"
                primaryActionLabel="Novo curso"
                onPrimaryAction={() => setIsPostForm(true)}
                stats={[
                    { title: "Total de cursos", value: totalCourses.toString(), cor: "azul" },
                    { title: "Matérias vinculadas", value: totalSubjects?.toString() ?? "0", cor: "verde" },
                    { title: "Semestres", value: totalSemesters.toString(), cor: "amarelo" },
                    { title: "Inativos", value: totalInactiveCourses.toString(), cor: "vermelho" },
                ]}
                columns={columns}
                data={data ?? []}
                dataDesactivated={dataDesactivated ?? []}
                rowKey={(row) => row.id}
                tableTitle="cursos"
                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum curso encontrado</div>}
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
                            <h4 className="font-semibold">Formulário de criação de curso</h4>
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