import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router"
import { useGetCourseSubjectsSemester } from "../http/course/useGetCourseSubjectsSemester"
import { useGetCourseSubjectsSemesterMe } from "../http/course/useGetCourseSubjectsMe"
import { useGetBios } from "../http/bio/useGetBio"
import { useGetStudent } from "../http/student/useGetStudent"
import { useGetStudentMe } from "../http/student/useGetStudentMe"
import { useUpdateStudent } from "../http/student/useUpdateStudent"
import type { ContextPropsTypeNetwork } from "../types/contextPropsType"
import type { AvatarOption } from "../types/AvatarTypes"
import type { PerfilUser } from "../componentes/perfil/types"
import { usePaginaPerfilModais } from "./usePaginaPerfilModais"
import { useFollow } from "../http/follow/useFollow"
import { useUnFollow } from "../http/follow/useUnFollow"

export function usePaginaPerfil() {
  const parentContext = useOutletContext<ContextPropsTypeNetwork>()
  const navigate = useNavigate()
  const { studentId: routeId } = useParams<{ studentId?: string }>()

  const viewerStudentId = String(parentContext?.studentId ?? "") 
  const profileStudentId = routeId ?? viewerStudentId
  const isOwnProfile = profileStudentId === viewerStudentId
  const isAluno = parentContext?.role === "ALUNO"

  useEffect(() => {
    if (parentContext?.role !== "ALUNO") {
      navigate("/feed")
    }
  }, [parentContext?.role, navigate])

  const myPerfil = useGetStudentMe(viewerStudentId, {
    enabled: isAluno && isOwnProfile && !!viewerStudentId
  })

  const otherPerfil = useGetStudent(profileStudentId, {
    enabled: isAluno && !isOwnProfile && !!profileStudentId
  })

  const studentData = isOwnProfile ? myPerfil.data : otherPerfil.data
  const isPending = isOwnProfile ? myPerfil.isPending : otherPerfil.isPending

  const currentCourseId = String(studentData?.course?.id ?? "")
  const currentSemester = String(studentData?.semestre ?? "")

  const myCourseSubjects = useGetCourseSubjectsSemesterMe(viewerStudentId, {
    enabled: isAluno && isOwnProfile && !!viewerStudentId
  })

  const biosQuery = useGetBios({
    enabled: isAluno
  })
  const bios = biosQuery.data?.filter((bio) => bio.ativo) ?? []

  const otherCourseSubjects = useGetCourseSubjectsSemester(currentCourseId, currentSemester, {
    enabled: isAluno && !isOwnProfile && !!currentCourseId && !!currentSemester
  })

  const subjects = isOwnProfile ? (myCourseSubjects.data ?? []) : (otherCourseSubjects.data ?? [])
  const isLoadingSubjects = isOwnProfile ? myCourseSubjects.isPending : otherCourseSubjects.isPending

  const { mutateAsync: updateStudent } = useUpdateStudent(viewerStudentId || profileStudentId)
  const currentUserId = String(parentContext?.id ?? "")

  const {mutateAsync: followUser, isPending: isFollowingPending} = useFollow(profileStudentId, currentUserId)
  const {mutateAsync: unfollowUser, isPending: isUnfollowingPending} = useUnFollow(profileStudentId, currentUserId)

  const { modais, filteredAvatars, handlers } = usePaginaPerfilModais()
  const [user, setUser] = useState<PerfilUser>({
    nome: "",
    curso: "",
    faculdade: "",
    descricao: "",
    seguidores: 0,
    seguindo: 0,
    avatar: null
  })

  useEffect(() => {
    if (!studentData) {
      return
    }

    setUser((prev) => ({
      ...prev,
      nome: studentData.nome,
      curso: studentData.course?.name ?? "",
      faculdade: studentData.course?.university?.name ?? "",
      descricao: studentData.bio ?? "",
      avatar: studentData.avatar ?? null
    }))
  }, [studentData])

  const toggleResumoForm = () => {
    parentContext?.setIsOptionsFormOpen?.(!parentContext?.isOptionsFormOpen)
  }

  const isFollowing = Boolean(studentData?.seguidoPeloCurrentUser)

  const submitEditForm = async (formData: FormData) => {
    await updateStudent({
      nome: (formData.get("nome") as string) || undefined,
      bio: (formData.get("descricao") as string) || undefined
    })

    const nome = (formData.get("nome") as string) || user.nome
    const curso = (formData.get("curso") as string) || user.curso
    const faculdade = (formData.get("faculdade") as string) || user.faculdade
    const descricao = (formData.get("descricao") as string) || user.descricao

    setUser((prev) => ({
      ...prev,
      nome,
      curso,
      faculdade,
      descricao
    }))

    handlers.closeEditForm()
  }

  const selectAvatar = async (avatar: AvatarOption) => {
    await updateStudent({
      avatarUrl: avatar.url
    })

    setUser((prev) => ({
      ...prev,
      avatar: {
        id: avatar.id,
        title: avatar.title,
        male: avatar.group === "male" ? "male" : null,
        url: avatar.url,
        description: avatar.description
      }
    }))

    handlers.closeAvatarPicker()
  }

  const selectBio = async (bioDescription: string) => {
    await updateStudent({
      bio: bioDescription
    })

    setUser((prev) => ({
      ...prev,
      descricao: bioDescription
    }))

    handlers.closeBioPicker()
  }

  return {
    user,
    subjects,
    isOwnProfile,
    isAluno,
    isPending: isPending || isLoadingSubjects,
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
    }
  }
}
