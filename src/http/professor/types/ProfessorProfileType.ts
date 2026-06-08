export type ProfessorProfileType = {
    id: number
    nome: string
    bio: string | null
    avatar: {
        id: number
        url: string
        title: string
        male: string | null
        description: string
    } | null
    subject: {
        id: number
        name: string
        semestre: number
    } | null
    email: string
}