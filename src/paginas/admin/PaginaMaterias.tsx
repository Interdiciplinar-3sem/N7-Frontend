import { AdminCrudPage } from "../../componentes/admin/AdminCrudPage";
import type { Column } from "../../componentes/ui/Table";

type MateriaRow = {
    id: string;
    nome: string;
    curso: string;
    professor: string;
    resumos: number;
}

const data: MateriaRow[] = [
    { id: "1", nome: "Banco de Dados II", curso: "Banco de Dados", professor: "Prof. Marcos", resumos: 16 },
    { id: "2", nome: "Algoritmos", curso: "ADS", professor: "Prof. Júlia", resumos: 22 },
    { id: "3", nome: "Arquitetura de Software", curso: "ADS", professor: "Prof. Pedro", resumos: 11 },
]

const columns: Column<MateriaRow>[] = [
    { key: "nome", header: "Matéria" },
    { key: "curso", header: "Curso" },
    { key: "professor", header: "Professor" },
    { key: "resumos", header: "Resumos", width: "120px", align: "center" },
]

export function PaginaMaterias() {
    return (
        <AdminCrudPage
            title="Matérias"
            description="Cadastre e acompanhe as matérias vinculadas aos cursos"
            primaryActionLabel="Nova matéria"
            stats={[
                { title: "Total de matérias", value: "34", cor: "azul" },
                { title: "Vinculadas", value: "29", cor: "verde" },
                { title: "Sem professor", value: "3", cor: "amarelo" },
                { title: "Pendentes", value: "2", cor: "vermelho" },
            ]}
            columns={columns}
            data={data}
            rowKey={(row) => row.id}
            tableTitle="Lista de matérias"
            emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhuma matéria encontrada</div>}
            dataDesactivated={[]}
        />
    )
}