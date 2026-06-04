import type { TagType } from "./TagType"

export type ResponseGetSummaryType = {
    studentId: string,
    summaryId: string,
    titulo: string,
    conteudo: string,
    reports: number,
    ativo: boolean,
    totalCurtidas: number,
    studentUrl: string,
    studentNome: string,
    subjectId: number,
    subjectNome: string,
    disciplina: string,
    publico: boolean,
    tags?: TagType[]
}