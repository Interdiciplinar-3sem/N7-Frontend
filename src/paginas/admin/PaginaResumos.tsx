import { useState } from "react";
import { AdminCrudPage } from "../../componentes/admin/AdminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { useGetSummary } from "../../http/summary/useGetSummary";
import type { ResponseGetSummaryType } from "../../http/types/responseGetSummary";
import { useUpdateStatusSummary } from "../../http/summary/useUpdateStatusSummary";

export function PaginaResumos() {
    const {data} = useGetSummary();
    const {mutateAsync: updateStatusSummary} = useUpdateStatusSummary();
    const [updateSummaryActive, setUpdateSummaryActive] = useState(false);
    const [updateSummaryId, setUpdateSummaryId] = useState<string | null>(null);

    const columns: Column<ResponseGetSummaryType>[] = [
        { key: "studentId", header: "ID estudante" },
        { key: "summaryId", header: "ID resumo" },
        { key: "titulo", header: "Título" },
        { key: "conteudo", header: "conteudo" },
        { key: "reports", header: "reports" },
        { key: "actions", header: "Ações", width: "180px", align: "center",
            render: (row) => {
                return(
                    <div>
                        <button
                                onClick={() => handdleUpdateSummary(row.summaryId)}
                                className="px-2 py-1 bg-yellow-500 text-white rounded-sm"
                                disabled={updateSummaryId === row.summaryId}
                            >
                                { updateSummaryActive ? "   ativar" : "destivar" }
                            </button>
                    </div>
                )
            }
        }
    ]

    const handdleUpdateSummary = async (summaryId: string) => {
        setUpdateSummaryId(summaryId);
        setUpdateSummaryActive(true);

        try {
            await updateStatusSummary(updateSummaryId ?? summaryId);
        } finally {
            setUpdateSummaryActive(false);
            setUpdateSummaryId(null);
        }
    }

    const totalResumos = data?.length ?? 0;

    return (
        <AdminCrudPage
            title="Resumos"
            description="Gerencie os resumos publicados no sistema"
            primaryActionLabel="Novo resumo"
            stats={[
                { title: "Total de resumos", value: totalResumos.toString(), cor: "azul" },
            ]}
            columns={columns}
            data={data ?? []}
            rowKey={(row) => row.summaryId}
            tableTitle="Lista de resumos"
            emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum resumo encontrado</div>}
            dataDesactivated={[]}
        />
    )
}