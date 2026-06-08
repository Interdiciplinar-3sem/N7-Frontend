import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router"
import { useGetCourseSubjectsSemester, useGetCourseSubjectsSemesterMe } from "../http/course/useCourse" 
import { useGetBios } from "../http/bio/useGetBio"
import { useGetStudent } from "../http/student/useStudent"
import { useGetStudentMe } from "../http/student/useStudent" 
import { useUpdateStudent } from "../http/student/useStudent"
import type { ContextPropsTypeNetwork } from "../types/contextPropsType"
import type { AvatarOption } from "../types/AvatarTypes"
import type { PerfilUser } from "../componentes/perfil/types"
import { usePaginaPerfilModais } from "./usePaginaPerfilModais"
import { useFollow } from "../http/follow/useFollow"
import { useUnFollow } from "../http/follow/useFollow" 
import { useGetFollowers } from "../http/follow/useFollow" 
import { useGetFollowing } from "../http/follow/useFollow" 
import { useGetSummaryMe } from "../http/summary/get/useGetSummary" 
import { useGetSummaryStudentId } from "../http/summary/get/useGetSummary" 

import { useGetProfessorMe, useGetProfessorById } from "../http/professor/useProfessor"

export function usePaginaPerfil() {
  const { modais, filteredAvatars, handlers } = usePaginaPerfilModais()
  const parentContext = useOutletContext<ContextPropsTypeNetwork>()
  const { studentId: routeId } = useParams<{ studentId?: string }>()

  const role = parentContext?.role
  const isAluno = role === "ALUNO"
  const isProfessor = role === "PROFESSOR"
  const isAdm = role === "ADM"
  const isPrivilegedViewingStudent = (isProfessor || isAdm) && !!routeId

  const viewerStudentId = parentContext?.studentId ?? 0
  const profileStudentId = Number(routeId ?? (isAluno ? viewerStudentId : 0))
  const isOwnProfile = isAluno
    ? profileStudentId === viewerStudentId
    : isProfessor && !routeId

  const myPerfil = useGetStudentMe(viewerStudentId, {
    enabled: isAluno && isOwnProfile && !!viewerStudentId,
  })
  const otherPerfil = useGetStudent(profileStudentId, {

    enabled: (isAluno && !isOwnProfile && !!profileStudentId)
          || (isPrivilegedViewingStudent && !!profileStudentId),
  })

  const myProfessorPerfil = useGetProfessorMe({
    enabled: isProfessor && isOwnProfile,
  })
  const otherProfessorPerfil = useGetProfessorById(Number(routeId ?? 0), {
    enabled: isProfessor && !isOwnProfile && !!routeId && !isPrivilegedViewingStudent,
  })

  const summaryCurrent = useGetSummaryMe({
    enabled: isAluno && isOwnProfile && !!viewerStudentId,
  })

  const summaryOther = useGetSummaryStudentId(profileStudentId, {
    enabled: (isAluno && !isOwnProfile && !!profileStudentId)
          || (isPrivilegedViewingStudent && !!profileStudentId),
  })
  const resumoData = isAluno
    ? (isOwnProfile ? summaryCurrent.data : summaryOther.data)
    : isPrivilegedViewingStudent
      ? summaryOther.data
      : []

  const follwers = useGetFollowers(viewerStudentId, profileStudentId)
  const follwing = useGetFollowing(viewerStudentId, profileStudentId)

  const studentData = isAluno
    ? (isOwnProfile ? myPerfil.data : otherPerfil.data)
    : isPrivilegedViewingStudent
      ? otherPerfil.data
      : undefined

  const currentCourseId = studentData?.course?.id ?? 0
  const currentSemester = studentData?.semestre ?? 0

  const myCourseSubjects = useGetCourseSubjectsSemesterMe(viewerStudentId, {
    enabled: (isAluno && isOwnProfile && !!viewerStudentId) || (isPrivilegedViewingStudent && !!currentCourseId && !!currentSemester),
  })
  const otherCourseSubjects = useGetCourseSubjectsSemester(currentCourseId, currentSemester, {
    enabled: (isAluno && !isOwnProfile && !!currentCourseId && !!currentSemester) || (isPrivilegedViewingStudent && !!currentCourseId && !!currentSemester),
  })
  
  const subjects =
  isOwnProfile && isAluno
    ? (myCourseSubjects.data ?? [])
    : (otherCourseSubjects.data ?? [])

  const biosQuery = useGetBios({
    enabled: isAluno && modais.openBioPicker && !!profileStudentId,
  })
  const bios = biosQuery.data ? biosQuery.data.filter((bio) => bio.ativo) : []

 const isPending =
    (isPrivilegedViewingStudent || (isAluno && !isOwnProfile)) ? otherPerfil.isPending
    : (isAluno && isOwnProfile)                                ? myPerfil.isPending
    : (isProfessor && isOwnProfile)                            ? myProfessorPerfil.isPending
    : (isProfessor && !isOwnProfile)                           ? otherProfessorPerfil.isPending
    : false;

  const { mutateAsync: updateStudent } = useUpdateStudent(viewerStudentId || profileStudentId)
  const { mutateAsync: followUser, isPending: isFollowingPending } = useFollow(profileStudentId, parentContext?.id)
  const { mutateAsync: unfollowUser, isPending: isUnfollowingPending } = useUnFollow(profileStudentId, parentContext?.id)
  const isFollowing = Boolean(studentData?.seguidoPeloCurrentUser)

  const [user, setUser] = useState<PerfilUser>({
    nome: "",
    curso: "",
    faculdade: "",
    descricao: "",
    seguidores: 0,
    seguindo: 0,
    avatar: null,
  })

  useEffect(() => {
    if (!studentData) return
    if (!isAluno && !isPrivilegedViewingStudent) return
    setUser((prev) => ({
      ...prev,
      nome: studentData.nome,
      curso: studentData.course?.name ?? "",
      faculdade: studentData.course?.university?.name ?? "",
      descricao: studentData.bio ?? "",
      avatar: studentData.avatar ?? null,
      seguidores: studentData.seguidores,
      seguindo: studentData.seguindo,
    }))
  }, [studentData, isAluno, isPrivilegedViewingStudent])

  const professorData = isProfessor
    ? (isOwnProfile ? myProfessorPerfil.data : otherProfessorPerfil.data)
    : undefined

  useEffect(() => {
    if (!professorData || !isProfessor) return
    setUser((prev) => ({
      ...prev,
      nome: professorData.nome,
      curso: professorData.subject?.name ?? "",
      faculdade: "",
      descricao: professorData.bio ?? "",
      avatar: professorData.avatar ?? null,
      seguidores: 0,
      seguindo: 0,
    }))
  }, [professorData, isProfessor])

  const toggleResumoForm = isAluno
    ? () => parentContext?.setIsOptionsFormOpen?.(!parentContext?.isOptionsFormOpen)
    : undefined

  const submitEditForm = async (formData: FormData) => {
    await updateStudent({
      nome: (formData.get("nome") as string) || undefined,
      bio: (formData.get("descricao") as string) || undefined,
    })
    const nome = (formData.get("nome") as string) || user.nome
    const curso = (formData.get("curso") as string) || user.curso
    const faculdade = (formData.get("faculdade") as string) || user.faculdade
    const descricao = (formData.get("descricao") as string) || user.descricao
    setUser((prev) => ({ ...prev, nome, curso, faculdade, descricao }))
    handlers.closeEditForm()
  }

  const selectAvatar = async (avatar: AvatarOption) => {
    await updateStudent({ avatarUrl: avatar.url })
    setUser((prev) => ({
      ...prev,
      avatar: {
        id: avatar.id,
        title: avatar.title,
        male: avatar.group === "male" ? "male" : null,
        url: avatar.url,
        description: avatar.description,
      },
    }))
    handlers.closeAvatarPicker()
  }

  const selectBio = async (bioDescription: string) => {
    await updateStudent({ bio: bioDescription })
    setUser((prev) => ({ ...prev, descricao: bioDescription }))
    handlers.closeBioPicker()
  }

  return {
    user,
    professorData,
    resumoData,
    follwers,
    follwing,
    subjects,
    isOwnProfile,
    isAluno,
    isProfessor,
    isAdm,
    isPrivilegedViewingStudent,
    isPending,
    isFollowing,
    isFollowingPending,
    isUnfollowingPending,
    filteredAvatars,
    selectedResumoId: modais.selectedResumoId,
    setSelectedResumoId: modais.setSelectedResumoId,
    modais,
    bios,
    actions: {
      profileStudentId,
      toggleEditForm: handlers.toggleEditForm,
      closeEditForm: handlers.closeEditForm,
      openAvatarPicker: handlers.openAvatarPicker,
      closeAvatarPicker: handlers.closeAvatarPicker,
      openBioPicker: handlers.openBioPicker,
      closeBioPicker: handlers.closeBioPicker,
      setSelectedGender: handlers.setSelectedGender,
      toggleResumoForm,
      submitEditForm,
      selectAvatar,
      selectBio,
      openFotoMenu: handlers.openFotoMenu,
      closeFotoMenu: handlers.closeFotoMenu,
      followUser,
      unfollowUser,
    },
  }
}