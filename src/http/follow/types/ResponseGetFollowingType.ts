export type ResponseGetFollowingType = {
    studentId: number,
    followerId: number,
    name: string,
    semestre: number,
    course: string,
    seguidores: number,
    studentUrl?: string,
}