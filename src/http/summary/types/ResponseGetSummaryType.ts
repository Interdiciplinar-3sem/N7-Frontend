import type { ResponseGetTagsType } from "../../tags/types/ResponseGetTagsType";

export type TagType = Omit<ResponseGetTagsType, "ativo">;

export type SummaryBadgeType = {
    id: number;
    name: string;
    description: string;
}

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
    tags?: TagType[],
    badge?: SummaryBadgeType | null,
}