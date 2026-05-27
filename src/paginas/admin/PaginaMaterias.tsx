import { useState } from "react";
import { X } from "lucide-react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { Overlay } from "../../componentes/overlay";
import { useGetSubjectsDesactivated } from "../../http/subject/useGetSubjectsDesactivated";
import { useUpdateSubjectStatus } from "../../http/subject/useUpdateSubjectStatus";
import { useGetAllSubjects } from "../../http/subject/useGetAllSubjects";
import type { ResponseGetSubjectType } from "../../http/types/responseGetSubjectType";

const columns: Column<ResponseGetSubjectType>[] = [
    { key: "id", header: "ID", width: "180px" },
    { key: "name", header: "Matéria" },
    { key: "semestre", header: "Semestre" },
    { key: "courseName", header: "Curso", width: "120px", align: "center" },
]


export function PaginaMaterias() {
    const { data, isPending } = useGetAllSubjects()
    const { data: dataDesactivated } = useGetSubjectsDesactivated()
    const { mutateAsync: updateSubjectStatus } = useUpdateSubjectStatus()
    const [updatingSubjectId, setUpdatingSubjectId] = useState<string | null>(null)
    const [isPostForm, setIsPostForm] = useState(false)
    
    const totalSubjects = isPending ? "carregando..." : data?.length ?? 0
    const totalInactiveSubjects = dataDesactivated?.length ?? 0
    
    console.log(data)
    const handdleStatusUpdate = async (subjectId: string) => {
        setUpdatingSubjectId(subjectId)

        try {
            await updateSubjectStatus(subjectId)
        } finally {
            setUpdatingSubjectId(null)
        }
    }

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
                                    disabled={updatingSubjectId === row.id}
                                >
                                    {updatingSubjectId === row.id
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
                tableTitle="matérias"
                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhuma matéria encontrada</div>}
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
    )
}