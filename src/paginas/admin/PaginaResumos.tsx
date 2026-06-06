import { useState } from "react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { useGetAllSummary } from "../../http/summary/useGetAllSummary";
import type { ResponseGetSummaryType } from "../../http/types/responseGetSummary";
import { useUpdateStatusSummary } from "../../http/summary/useUpdateStatusSummary";
import { useGetSummaryDesactivated } from "../../http/summary/useGetSummaryDesactivated";
import { useAdminPreviewer } from "../../layout/layoutAdmin";

export function PaginaResumos() {
    const { openSummary } = useAdminPreviewer();

    const { data } = useGetAllSummary();
    const { data: dataDesactivated } = useGetSummaryDesactivated();
    const { mutateAsync: updateStatusSummary } = useUpdateStatusSummary();

    const [updateSummaryId, setUpdateSummaryId] = useState<number | null>(null);

    const columns: Column<ResponseGetSummaryType>[] = [
        {
            key: "summaryId",
            header: "Resumo",
            width: "300px",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs shrink-0">
                        {row.titulo.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-medium text-gray-900 truncate">{row.titulo}</span>
                        <div className="flex gap-2 text-[10px] text-gray-400 uppercase tracking-tighter mt-0.5">
                            <span>RESUMO ID: {row.summaryId}</span>
                            <span>•</span>
                            <span>ESTUDANTE ID: {row.studentId}</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "reports",
            header: "Reports",
            width: "100px",
            align: "center",
            render: (row) => (
                <span className={`font-medium ${row.reports > 0 ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                    {row.reports}
                </span>
            ),
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
                    {row.ativo ? "Ativo" : "Desativado"}
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
                        onClick={() => handleUpdateSummary(row.summaryId)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors w-28 text-center ${
                            row.ativo
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                        disabled={updateSummaryId === row.summaryId}
                    >
                        {row.summaryId === updateSummaryId
                            ? "..."
                            : row.ativo
                            ? "Desativar"
                            : "Ativar"}
                    </button>
                </div>
            ),
        },
    ];

    const handleUpdateSummary = async (summaryId: number) => {
        setUpdateSummaryId(summaryId);
        try {
            await updateStatusSummary(summaryId);
        } finally {
            setUpdateSummaryId(null);
        }
    };

    const totalResumos = data?.length ?? 0;
    const totalDesativados = dataDesactivated?.length ?? 0;

    return (
        <AdminCrudPage
            title="Resumos"
            description="Gerencie os resumos publicados no sistema"
            stats={[
                { title: "Total de resumos", value: totalResumos.toString(), cor: "azul" },
                { title: "Resumos Desativados", value: totalDesativados.toString(), cor: "vermelho" },
            ]}
            columns={columns}
            data={data ?? []}
            dataDesactivated={dataDesactivated ?? []}
            rowKey={(row) => row.summaryId}
            tableTitle="Lista de resumos"
            emptyPlaceholder={
                <div className="p-6 text-center text-gray-400">Nenhum resumo encontrado</div>
            }
            onRowClick={(row) => openSummary(row.summaryId)}
        />
    );
}