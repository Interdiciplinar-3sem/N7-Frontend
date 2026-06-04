import type { TagType } from "./TagType"

export type ResponseGetSummaryType = {
    studentId: number,
    summaryId: number,
    titulo: string,
    conteudo: string,
    reports: number,
    ativo: boolean,
    totalCurtidas: number,
    studentUrl: string,
    studentNome: string,
    subjectId: number,
    subjectNome: string,
    publico: boolean,
    tags?: TagType[]
}