export type ResponseGetSummaryType = {
    studentId: string,
    summaryId: string,
    titulo: string,
    conteudo: string,
    reports?: number,
    ativo: boolean,
    totalCurtidas?: number,
    studentUrl?: string,
    studentNome?: string,
}