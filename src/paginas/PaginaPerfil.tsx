import { useEffect, useMemo, useState } from 'react'
import { PerfilActions } from '../componentes/perfil/PerfilActions'
import { PerfilAvatarCard } from '../componentes/perfil/PerfilAvatarCard'
import { PerfilAvatarPickerModal } from '../componentes/perfil/PerfilAvatarPickerModal'
import { PerfilEditFormModal } from '../componentes/perfil/PerfilEditFormModal'
import { PerfilInfo } from '../componentes/perfil/PerfilInfo'
import { PerfilResumosSection } from '../componentes/perfil/PerfilResumosSection'
import { PerfilTurmasSection } from '../componentes/perfil/PerfilTurmasSection'
import type { PerfilResumo, PerfilTurma, PerfilUser } from '../componentes/perfil/types'
import { useGetStudent } from '../http/student/useGetStudent'
import { useOutletContext } from 'react-router'
import { useUpdateStudent } from '../http/student/useUpdateStudent'
import { useUpdateStudentAvatar } from '../http/student/useUpdateStudentAvatar'

type AvatarGender = 'all' | 'male' | 'female'

type AvatarOption = {
  id: number
  title: string
  group: 'male' | 'female' | 'neutral'
  url: string
  description: string
}

const avatarOptions: AvatarOption[] = [
  { id: 0, title: 'default', group: 'neutral', url: '/avatares/default.svg', description: 'Avatar padrão' },
  { id: 1, title: 'male-1', group: 'male', url: '/avatares/male-1.svg', description: 'Avatar masculino 1' },
  { id: 2, title: 'male-2', group: 'male', url: '/avatares/male-2.svg', description: 'Avatar masculino 2' },
  { id: 3, title: 'male-3', group: 'male', url: '/avatares/male-3.svg', description: 'Avatar masculino 3' },
  { id: 4, title: 'male-4', group: 'male', url: '/avatares/male-4.svg', description: 'Avatar masculino 4' },
  { id: 5, title: 'male-5', group: 'male', url: '/avatares/male-5.svg', description: 'Avatar masculino 5' },
  { id: 6, title: 'male-6', group: 'male', url: '/avatares/male-6.svg', description: 'Avatar masculino 6' },
  { id: 7, title: 'male-7', group: 'male', url: '/avatares/male-7.svg', description: 'Avatar masculino 7' },
  { id: 8, title: 'male-8', group: 'male', url: '/avatares/male-8.svg', description: 'Avatar masculino 8' },
  { id: 9, title: 'female-1', group: 'female', url: '/avatares/female-1.svg', description: 'Avatar feminino 1' },
  { id: 10, title: 'female-2', group: 'female', url: '/avatares/female-2.svg', description: 'Avatar feminino 2' },
  { id: 11, title: 'female-3', group: 'female', url: '/avatares/female-3.svg', description: 'Avatar feminino 3' },
  { id: 12, title: 'female-4', group: 'female', url: '/avatares/female-4.svg', description: 'Avatar feminino 4' },
  { id: 13, title: 'female-5', group: 'female', url: '/avatares/female-5.svg', description: 'Avatar feminino 5' },
  { id: 14, title: 'female-6', group: 'female', url: '/avatares/female-6.svg', description: 'Avatar feminino 6' },
  { id: 15, title: 'female-7', group: 'female', url: '/avatares/female-7.svg', description: 'Avatar feminino 7' },
  { id: 16, title: 'female-8', group: 'female', url: '/avatares/female-8.svg', description: 'Avatar feminino 8' },
  { id: 17, title: 'female-9', group: 'female', url: '/avatares/female-9.svg', description: 'Avatar feminino 9' },
  { id: 18, title: 'female-10', group: 'female', url: '/avatares/female-10.svg', description: 'Avatar feminino 10' },
  { id: 19, title: 'female-11', group: 'female', url: '/avatares/female-11.svg', description: 'Avatar feminino 11' },
  { id: 20, title: 'female-12', group: 'female', url: '/avatares/female-12.svg', description: 'Avatar feminino 12' },
  { id: 21, title: 'female-13', group: 'female', url: '/avatares/female-13.svg', description: 'Avatar feminino 13' }
]

export function PaginaPerfil() {
  const parentContext = useOutletContext<any | undefined>()
  const studentId = String(parentContext?.id ?? '')
  const { data: studentData, isPending } = useGetStudent(studentId)
  const { mutateAsync: updateStudent } = useUpdateStudent(studentId)
  const { mutateAsync: updateStudentAvatar } = useUpdateStudentAvatar(studentId)

  const [user, setUser] = useState<PerfilUser>({
    nome: '',
    curso: '',
    faculdade: '',
    descricao: '',
    seguidores: 0,
    seguindo: 0,
    avatar: null
  })

  const [openFotoMenu, setOpenFotoMenu] = useState(false)
  const [openAvatarPicker, setOpenAvatarPicker] = useState(false)
  const [selectedGender, setSelectedGender] = useState<AvatarGender>('all')
  const [showForm, setShowForm] = useState(false)
  const [showResumos, setShowResumos] = useState(false)
  const [showTurmas, setShowTurmas] = useState(false)

  const isOwnProfile = true
  const isFollowing = false

  const [resumos, setResumos] = useState<PerfilResumo[]>([])

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

  function excluirResumo(id: number) {
    setResumos((prev) => prev.filter((resumo) => resumo.id !== id))
  }

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
    await updateStudentAvatar({ avatarId: avatar.id })

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
              onToggleFotoMenu={() => setOpenFotoMenu((prev) => !prev)}
              onOpenAvatarPicker={() => {
                setOpenAvatarPicker(true)
                setOpenFotoMenu(false)
              }}
              onRemovePhoto={() => {
                setUser((prev) => ({
                  ...prev,
                  avatar: null
                }))
                setOpenAvatarPicker(false)
                setOpenFotoMenu(false)
              }}
            />

            <PerfilInfo user={user} />

            <PerfilActions
              isOwnProfile={isOwnProfile}
              isFollowing={isFollowing}
              onToggleForm={() => setShowForm((prev) => !prev)}
              onToggleResumos={() => setShowResumos((prev) => !prev)}
              onToggleTurmas={() => setShowTurmas((prev) => !prev)}
            />
          </div>
          )}

          {showResumos && (
            <PerfilResumosSection
              resumos={resumos}
              onDeleteResumo={excluirResumo}
            />
          )}

          {showTurmas && <PerfilTurmasSection turmas={turmas} />}

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
        </section>
      </div>
    </main>
  )
}