import { useEffect, useMemo, useState } from 'react'
import { PerfilActions } from '../componentes/perfil/PerfilActions'
import { PerfilAvatarCard } from '../componentes/perfil/PerfilAvatarCard'
import { PerfilAvatarPickerModal } from '../componentes/perfil/PerfilAvatarPickerModal'
import { PerfilEditFormModal } from '../componentes/perfil/PerfilEditFormModal'
import { PerfilInfo } from '../componentes/perfil/PerfilInfo'
import { PerfilResumosSection } from '../componentes/perfil/PerfilResumosSection'
import { PerfilTurmasSection } from '../componentes/perfil/PerfilTurmasSection'
import type { PerfilTurma, PerfilUser } from '../componentes/perfil/types'
import { ViweSummary } from '../componentes/ViweSummary'
import { useGetStudent } from '../http/student/useGetStudent'
import { useNavigate, useOutletContext, useParams } from 'react-router'
import { useUpdateStudent } from '../http/student/useUpdateStudent'
import type { ContextPropsTypeNetwork } from '../types/contextPropsType'
import { avatarOptions, type AvatarGender, type AvatarOption } from '../types/AvatarTypes'
import { useGetStudentMe } from '../http/student/useGetStudentMe'

export function PaginaPerfil() {
  const parentContext = useOutletContext<ContextPropsTypeNetwork>()
  const navigate = useNavigate();
  const { studentId: routeId } = useParams<{ studentId?: string }>();

  useEffect(() => {
    if (parentContext?.role !== 'ALUNO') {
      navigate('/feed');
    }
  }, [parentContext?.role, navigate]);

  const viewerStudentId = String(parentContext?.studentId ?? '')
  const profileStudentId = routeId ?? viewerStudentId
  const isOwnProfile = profileStudentId === viewerStudentId
  const { data: studentData, isPending } = isOwnProfile ? useGetStudentMe(viewerStudentId) : useGetStudent(profileStudentId)

  const { mutateAsync: updateStudent } = useUpdateStudent(viewerStudentId)
  const [openFotoMenu, setOpenFotoMenu] = useState(false)
  const [openAvatarPicker, setOpenAvatarPicker] = useState(false)
  const [selectedGender, setSelectedGender] = useState<AvatarGender>('all')
  const [showForm, setShowForm] = useState(false)
  const [isOptionsFormOpen, setIsOptionsFormOpen] = useState(false)
  const [selectedResumoId, setSelectedResumoId] = useState<string | null>(null)

  const [user, setUser] = useState<PerfilUser>({
    nome: '',
    curso: '',
    faculdade: '',
    descricao: '',
    seguidores: 0,
    seguindo: 0,
    avatar: null
  })


  useEffect(() => {
    parentContext?.setIsOptionsFormOpen?.(isOptionsFormOpen)
  }, [isOptionsFormOpen, parentContext?.setIsOptionsFormOpen])

  useEffect(() => {
    if (typeof parentContext?.isOptionsFormOpen === 'boolean') {
      setIsOptionsFormOpen(parentContext.isOptionsFormOpen)
    }
  }, [parentContext?.isOptionsFormOpen])

  const isFollowing = false

  const [turmas] = useState<PerfilTurma[]>([
    {
      id: 1,
      materia: 'Banco de Dados',
      professor: 'Prof. João',
      color: '#F8B7E2'
    },
    {
      id: 2,
      materia: 'Programação Web',
      professor: 'Prof. Ana',
      color: '#F4EB8C'
    }
  ])

  useEffect(() => {
    if (!studentData) {
      return
    }

    setUser({
      nome: studentData.nome,
      curso: studentData.course?.name ?? '',
      faculdade: studentData.course?.university?.name ?? '',
      descricao: studentData.bio ?? '',
      seguidores: 0,
      seguindo: 0,
      avatar: studentData.avatar ?? null
    })
  }, [studentData])

 
  const filteredAvatars = useMemo(() => {
    if (selectedGender === 'all') {
      return avatarOptions
    }

    if (selectedGender === 'male') {
      return avatarOptions.filter((avatar) => avatar.group === 'male')
    }

    return avatarOptions.filter((avatar) => avatar.group === 'female')
  }, [selectedGender])

  const handleSelectAvatar = async (avatar: AvatarOption) => {

   try {
     await updateStudent({
        avatarUrl: avatar.url
      })
   } catch (error) {
      console.error('Erro ao atualizar avatar:', error)
      return
   }

    setUser((prev) => ({
      ...prev,
      avatar: {
        id: avatar.id,
        title: avatar.title,
        male: avatar.group === 'male' ? 'male' : null,
        url: avatar.url,
        description: avatar.description
      }
    }))

    setOpenAvatarPicker(false)
    setOpenFotoMenu(false)
  }

  return (
    <main className="w-full min-h-screen p-4">
      <div className="font-sans min-h-dvh bg-zinc-100 flex flex-col pb-30">
        <section className="flex-1 p-8 pb-32 md:pb-8">
          {isPending ? (
            <div className="min-h-[50vh] flex items-center justify-center">
              <p className="text-zinc-500">Carregando perfil...</p>
            </div>
          ) : (
          <div className="bg-zinc-100 rounded-2xl p-10 pb-24 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-225 mx-auto relative shadow-md">
            <PerfilAvatarCard
              user={user}
              openFotoMenu={openFotoMenu}
              onOpenAvatarPicker={() => {
                setOpenAvatarPicker(true)
              }}
            />

            <PerfilInfo user={user} />

            <PerfilActions
              isOwnProfile={isOwnProfile}
              isFollowing={isFollowing}
              onToggleForm={() => setShowForm((prev) => !prev)}
              onToggleCreateResumo={() => setIsOptionsFormOpen((prev) => !prev)}
            />

            
          </div>
          )}

          <PerfilResumosSection
            isOwnProfile={isOwnProfile}
            studentId={profileStudentId}
            onOpenResumo={(summaryId) => setSelectedResumoId(summaryId)}
          />
          
          <PerfilTurmasSection turmas={turmas} />

          {selectedResumoId && (
            <ViweSummary
              id={selectedResumoId}
              onClose={() => setSelectedResumoId(null)}
            />
          )}

          {!isOwnProfile && (
            <>
              <PerfilEditFormModal
                isOpen={showForm}
                user={user}
                onClose={() => setShowForm(false)}
                onSubmit={async (formData) => {
                  await updateStudent({
                    nome: (formData.get('nome') as string) || undefined,
                      bio: (formData.get('descricao') as string) || undefined
                  })

                  const nome = (formData.get('nome') as string) || user.nome
                  const curso = (formData.get('curso') as string) || user.curso
                  const faculdade = (formData.get('faculdade') as string) || user.faculdade
                  const descricao = (formData.get('descricao') as string) || user.descricao

                  setUser((prev) => ({
                    ...prev,
                    nome,
                    curso,
                    faculdade,
                    descricao
                  }))

                  setShowForm(false)
                }}
              />

              <PerfilAvatarPickerModal
                isOpen={openAvatarPicker}
                selectedGender={selectedGender}
                onChangeGender={setSelectedGender}
                avatars={filteredAvatars}
                onClose={() => setOpenAvatarPicker(false)}
                onSelectAvatar={handleSelectAvatar}
              />
            </>
          )}
        </section>
      </div>
    </main>
  )
}