export type PerfilUser = {
  nome: string
  curso: string
  faculdade: string
  descricao: string
  seguidores: number
  seguindo: number
  foto: string
}

export type PerfilResumo = {
  id: number
  titulo: string
  materia: string
  curtidas: number
}

export type PerfilTurma = {
  id: number
  materia: string
  professor: string
  color: string
}