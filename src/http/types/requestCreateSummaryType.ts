export type RequestCreateSummaryType = {
    titulo: string,
    conteudo: string,
    subjectId: number,
    tags_ids?: number[],
    publico?: boolean
}