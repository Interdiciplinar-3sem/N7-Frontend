export type RequestCreateSummaryType = {
    titulo: string,
    conteudo: string,
    subjectId: string,
    tags_ids?: string[],
    publico?: boolean
}