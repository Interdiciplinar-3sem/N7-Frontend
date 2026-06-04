import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";

type TagRow = {
    id: number;
    nome: string;
    uso: number;
    categoria: string;
}

const data: TagRow[] = [
    { id: 1, nome: "exame", uso: 32, categoria: "Acadêmico" },
    { id: 2, nome: "resumido", uso: 18, categoria: "Formato" },
    { id: 3, nome: "fácil", uso: 11, categoria: "Qualidade" },
]

const columns: Column<TagRow>[] = [
    { key: "nome", header: "Tag" },
    { key: "categoria", header: "Categoria" },
    { key: "uso", header: "Uso", width: "120px", align: "center" },
]

export function PaginaTags() {
    return (
        <AdminCrudPage
            title="Tags"
            description="Centralize as tags usadas para organizar e pesquisar conteúdos"
            primaryActionLabel="Nova tag"
            stats={[
                { title: "Total de tags", value: "18", cor: "azul" },
                { title: "Mais usadas", value: "7", cor: "verde" },
                { title: "Pouco usadas", value: "6", cor: "amarelo" },
                { title: "Sem uso", value: "5", cor: "vermelho" },
            ]}
            columns={columns}
            data={data}
            rowKey={(row) => row.id}
            tableTitle="Lista de tags"
            emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhuma tag encontrada</div>}
            dataDesactivated={[]}
        />
    )
}