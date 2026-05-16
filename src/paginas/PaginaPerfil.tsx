import { useRef, useState } from 'react'
import { PerfilActions } from '../componentes/perfil/PerfilActions'
import { PerfilAvatarCard } from '../componentes/perfil/PerfilAvatarCard'
import { PerfilEditFormModal } from '../componentes/perfil/PerfilEditFormModal'
import { PerfilInfo } from '../componentes/perfil/PerfilInfo'
import { PerfilResumosSection } from '../componentes/perfil/PerfilResumosSection'
import { PerfilTurmasSection } from '../componentes/perfil/PerfilTurmasSection'
import type { PerfilResumo, PerfilTurma, PerfilUser } from '../componentes/perfil/types'

export function PaginaPerfil() {
  const [user, setUser] = useState<PerfilUser>({
    nome: '',
    curso: '',
    faculdade: '',
    descricao: '',
    seguidores: 0,
    seguindo: 0,
    foto: ''
  })

  const [openFotoMenu, setOpenFotoMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showResumos, setShowResumos] = useState(false)
  const [showTurmas, setShowTurmas] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  function excluirResumo(id: number) {
    setResumos((prev) => prev.filter((resumo) => resumo.id !== id))
  }

  return (
    <main className="w-full min-h-screen p-4">
      <div className="font-sans min-h-dvh bg-zinc-100 flex flex-col pb-30">
        <section className="flex-1 p-8 pb-32 md:pb-8">
          <div className="bg-zinc-100 rounded-2xl p-10 pb-24 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-225 mx-auto relative shadow-md">
            <PerfilAvatarCard
              user={user}
              openFotoMenu={openFotoMenu}
              onToggleFotoMenu={() => setOpenFotoMenu((prev) => !prev)}
              onChoosePhoto={(e) => {
                const file = e.target.files?.[0]

                if (file) {
                  const url = URL.createObjectURL(file)

                  setUser((prev) => ({
                    ...prev,
                    foto: url
                  }))

                  setOpenFotoMenu(false)
                }
              }}
              onRemovePhoto={() =>
                setUser((prev) => ({
                  ...prev,
                  foto: ''
                }))
              }
              fileInputRef={fileInputRef}
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
            onSubmit={(formData) => {
              setUser({
                ...user,
                nome: formData.get('nome') as string,
                curso: formData.get('curso') as string,
                faculdade: formData.get('faculdade') as string,
                descricao: formData.get('descricao') as string
              })

              setShowForm(false)
            }}
          />
        </section>
      </div>
    </main>
  )
}