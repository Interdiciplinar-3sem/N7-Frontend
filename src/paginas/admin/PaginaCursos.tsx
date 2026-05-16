import { AdminCrudPage } from "../../componentes/admin/AdminCrudPage";
import type { Column } from "../../componentes/ui/Table";

type CursoRow = {
    id: string;
    nome: string;
    semestre: string;
    materias: number;
    status: string;
}

const data: CursoRow[] = [
    { id: "1", nome: "Análise e Desenvolvimento de Sistemas", semestre: "6 semestres", materias: 28, status: "Ativo" },
    { id: "2", nome: "Banco de Dados", semestre: "6 semestres", materias: 24, status: "Ativo" },
    { id: "3", nome: "Redes de Computadores", semestre: "6 semestres", materias: 22, status: "Rascunho" },
]

const columns: Column<CursoRow>[] = [
    { key: "nome", header: "Curso" },
    { key: "semestre", header: "Semestre", width: "140px" },
    { key: "materias", header: "Matérias", width: "120px", align: "center" },
    { key: "status", header: "Status", width: "120px", align: "center" },
]

export function PaginaCursos() {
    return (
        <AdminCrudPage
            title="Cursos"
            description="Organize os cursos disponíveis no dashboard administrativo"
            primaryActionLabel="Novo curso"
            stats={[
                { title: "Total de cursos", value: "12", cor: "azul" },
                { title: "Ativos", value: "9", cor: "verde" },
                { title: "Rascunhos", value: "2", cor: "amarelo" },
                { title: "Inativos", value: "1", cor: "vermelho" },
            ]}
            columns={columns}
            data={data}
            rowKey={(row) => row.id}
            tableTitle="Lista de cursos"
            emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum curso encontrado</div>}
            dataDesactivated={[]}
        />
    )
}