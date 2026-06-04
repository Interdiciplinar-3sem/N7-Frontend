import { useState } from "react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { useGetAllSummary } from "../../http/summary/useGetAllSummary";
import type { ResponseGetSummaryType } from "../../http/types/responseGetSummary";
import { useUpdateStatusSummary } from "../../http/summary/useUpdateStatusSummary";
import { useGetSummaryDesactivated } from "../../http/summary/useGetSummaryDesactivated";
import { ViweSummary } from "../../componentes/ViweSummary";

export function PaginaResumos() {
    const {data} = useGetAllSummary();
    const {data: dataDesactivated} = useGetSummaryDesactivated();
    const {mutateAsync: updateStatusSummary} = useUpdateStatusSummary();
    const [updateSummaryId, setUpdateSummaryId] = useState<number | null>(null)
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [selectedSummaryId, setSelectedSummaryId] = useState<number | null>(null);

    const columns: Column<ResponseGetSummaryType>[] = [
        { key: "studentId", header: "ID estudante" },
        { key: "summaryId", header: "ID resumo" },
        { key: "titulo", header: "Título" },
        { key: "conteudo", header: "conteudo" },
        { key: "reports", header: "reports" },
        { key: "actions", header: "Ações", width: "180px", align: "center",
            render: (row) => {
                return(
                    <div className="flex gap-2 justify-center">
                        <button
                                onClick={() => handdleUpdateSummary(row.summaryId)}
                                className="px-2 py-1 bg-yellow-500 text-white rounded-sm"
                                disabled={updateSummaryId === row.summaryId}
                            >
                            {row.summaryId === updateSummaryId 
                                ? "Atualizando..."
                                : (!row.ativo ? "ativar" : "destivar")
                            }
                        </button>
                        <button
                                onClick={() => {
                                    setSelectedSummaryId(row.summaryId)
                                    setIsSummaryOpen(true)
                                }}
                                className="px-2 py-1 bg-green-500/50 text-white rounded-sm"
                            >
                            Ver mais
                        </button>
                    </div>
                )
            }
        }
    ]
    const handdleUpdateSummary = async (summaryId: number) => {
        setUpdateSummaryId(summaryId);

        try {
            await updateStatusSummary(summaryId);
        } finally {
            setUpdateSummaryId(null);
        }
    }

    const totalResumos = data?.length ?? 0;

    return (
        <>
            <AdminCrudPage
            title="Resumos"
                description="Gerencie os resumos publicados no sistema"
                stats={[
                    { title: "Total de resumos", value: totalResumos.toString(), cor: "azul" },
                ]}
                columns={columns}
                data={data ?? []}
                dataDesactivated={dataDesactivated ?? []}
                rowKey={(row) => row.summaryId}
                tableTitle="Lista de resumos"
                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum resumo encontrado</div>}
            />

            {isSummaryOpen && (
                <ViweSummary
                    id={selectedSummaryId ?? 0}
                    onClose={() => {
                        setIsSummaryOpen(false)
                        setSelectedSummaryId(null)
                    }}
                />
            )}
        </>
    )
}