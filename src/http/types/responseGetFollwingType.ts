export type ResponseGetFollowingType = {
    studentId: string,
    followerId: string,
    name: string,
    semestre: number,
    course: string,
    seguidores: number,
    studentUrl?: string,
}