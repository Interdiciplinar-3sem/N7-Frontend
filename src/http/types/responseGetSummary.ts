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
    subjectId?: string,
    subjectName?: string,
    materia?: string,
    disciplina?: string,
    subject?: {
        id?: string,
        name?: string,
    },
    tags?: string[]
}