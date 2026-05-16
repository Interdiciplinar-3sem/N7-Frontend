import { AdminCrudPage } from "../../componentes/admin/AdminCrudPage";
import type { Column } from "../../componentes/ui/Table";

type ResumoRow = {
    id: string;
    titulo: string;
    materia: string;
    autor: string;
    status: string;
    criadoEm: string;
}

const data: ResumoRow[] = [
    {
        id: "1",
        titulo: "Cálculo I - Limites",
        materia: "Cálculo I",
        autor: "Ana Souza",
        status: "Publicado",
        criadoEm: "2026-05-08 14:20",
    },
    {
        id: "2",
        titulo: "Estrutura de Dados - Pilhas",
        materia: "Estrutura de Dados",
        autor: "Bruno Lima",
        status: "Revisão",
        criadoEm: "2026-05-07 09:10",
    },
    {
        id: "3",
        titulo: "Banco de Dados - Normalização",
        materia: "Banco de Dados",
        autor: "Carla Santos",
        status: "Publicado",
        criadoEm: "2026-05-06 18:00",
    },
]

const columns: Column<ResumoRow>[] = [
    { key: "titulo", header: "Título" },
    { key: "materia", header: "Matéria" },
    { key: "autor", header: "Autor" },
    { key: "status", header: "Status", width: "120px", align: "center" },
    { key: "criadoEm", header: "Criado em", width: "160px" },
]

export function PaginaResumos() {
    return (
        <AdminCrudPage
            title="Resumos"
            description="Gerencie os resumos publicados no sistema"
            primaryActionLabel="Novo resumo"
            stats={[
                { title: "Total de resumos", value: "128", cor: "azul" },
                { title: "Publicado", value: "94", cor: "verde" },
                { title: "Em revisão", value: "21", cor: "amarelo" },
                { title: "Arquivados", value: "13", cor: "vermelho" },
            ]}
            columns={columns}
            data={data}
            rowKey={(row) => row.id}
            tableTitle="Lista de resumos"
            emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum resumo encontrado</div>}
            dataDesactivated={[]}
        />
    )
}