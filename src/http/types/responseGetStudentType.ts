export type ResponseGetStudentType = {
        id: number;
        nome: string;
        semestre: number;
        bio: string | null;
        foto: string | null;
        pontuação?: number;
        cursoAtual?: {
                id: number;
                name: string;
                descricao: string;
        }
}