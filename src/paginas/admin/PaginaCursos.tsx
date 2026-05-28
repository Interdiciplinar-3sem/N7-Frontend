import { useState } from "react";
import { X } from "lucide-react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { Overlay } from "../../componentes/overlay";
import { useGetCoursesDesactivated } from "../../http/course/useGetCoursesDesactivated";
import { useUpdateCourseStatus } from "../../http/course/useUpdateCourseStatus";
import { useGetCourseSubjects } from "../../http/course/useGetCourseSubjects";
import { useGetCourses } from "../../http/course/useGetCourse";
import type { ResponseGetCourseType } from "../../http/types/responseGetCourse";

const columns: Column<ResponseGetCourseType>[] = [
    { key: "id", header: "ID", width: "180px" },
    { key: "name", header: "Curso" },
    { key: "descricao", header: "Semestre", width: "360px" },
]

export function PaginaCursos() {
    const { data, isPending } = useGetCourses()
    const { data: courseSubjects, isPending: isPendingCourseSubjects } = useGetCourseSubjects("1");
    const { data: dataDesactivated } = useGetCoursesDesactivated()
    const { mutateAsync: updateCourseStatus } = useUpdateCourseStatus()
    const [updatingCourseId, setUpdatingCourseId] = useState<string | null>(null)
    const [isPostForm, setIsPostForm] = useState(false)

    const totalCourses = isPending ? "carregando..." : data?.length ?? 0
    const totalInactiveCourses = dataDesactivated?.length ?? 0

    const totalSubjects = isPendingCourseSubjects
        ? { materias: "carregando..." }
        : courseSubjects?.length ?? 0;

    const totalSemesters = isPendingCourseSubjects
        ? "carregando..."
        : new Set(courseSubjects?.map((course) => course.semestre).filter(Boolean)).size

    const handdleStatusUpdate = async (courseId: string) => {
        setUpdatingCourseId(courseId)

        try {
            await updateCourseStatus(courseId)
        } finally {
            setUpdatingCourseId(null)
        }
    }

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
                columns={[
                    ...columns,
                    {
                        key: "actions",
                        header: "Ações",
                        width: "180px",
                        align: "center",
                        render: (row) => (
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => handdleStatusUpdate(row.id)}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded-sm"
                                    disabled={updatingCourseId === row.id}
                                >
                                    {updatingCourseId === row.id
                                        ? "Atualizando..."
                                        : (row.ativo ? "Desativar" : "Ativar")}
                                </button>
                            </div>
                        ),
                    },
                ]}
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
    )
}