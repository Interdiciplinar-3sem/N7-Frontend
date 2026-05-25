export type ResponseGetStudentType = {
        id: number;
        nome: string;
        semestre: number;
        bio: string | null;
        avatar: {
                id: number;
                title: string;
                male: string | null;
                url: string;
                description: string;
        } | null;
        pontuação?: number;
        course?: {
                id: number;
                name: string;
                descricao: string | null;
                university: {
                        id: number;
                        name: string;
                };
        };
        setSeguidoPeloCurrentUser?: boolean;
        setSeguindoCurrentUser?: boolean;
}