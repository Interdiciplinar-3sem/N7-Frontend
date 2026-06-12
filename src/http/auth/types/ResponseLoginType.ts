export type ResponseLoginType = {
        message: string;
        token: string;
        status: boolean;
        id: number;
        studentId: number | null;
        professorId: number | null;
        role: string;
}