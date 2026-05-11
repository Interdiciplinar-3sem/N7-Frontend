import { AdminCrudPage } from "../../componentes/admin/AdminCrudPage";
import type { Column } from "../../componentes/ui/Table";

type SeloRow = {
    id: string;
    nome: string;
    criterio: string;
    obtidos: number;
    status: string;
}

const data: SeloRow[] = [
    { id: "1", nome: "Colaborador", criterio: "10 resumos aprovados", obtidos: 14, status: "Ativo" },
    { id: "2", nome: "Expert", criterio: "20 resumos publicados", obtidos: 8, status: "Ativo" },
    { id: "3", nome: "Veterano", criterio: "1 ano de atividade", obtidos: 4, status: "Rascunho" },
]

const columns: Column<SeloRow>[] = [
    { key: "nome", header: "Selo" },
    { key: "criterio", header: "Critério" },
    { key: "obtidos", header: "Obtidos", width: "120px", align: "center" },
    { key: "status", header: "Status", width: "120px", align: "center" },
]

export function PaginaSelos() {
    return (
        <AdminCrudPage
            title="Selos"
            description="Acompanhe os selos, metas e regras de destaque da plataforma"
            primaryActionLabel="Novo selo"
            stats={[
                { title: "Total de selos", value: "9", cor: "azul" },
                { title: "Ativos", value: "6", cor: "verde" },
                { title: "Em revisão", value: "2", cor: "amarelo" },
                { title: "Inativos", value: "1", cor: "vermelho" },
            ]}
            columns={columns}
            data={data}
            rowKey={(row) => row.id}
            tableTitle="Lista de selos"
            emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum selo encontrado</div>}
        />
    )
}