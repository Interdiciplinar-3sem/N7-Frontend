import { Botao } from '../ui/Botao'
import { ButtonLogOut } from '../buttonLogout'

type PerfilActionsProps = {
  isOwnProfile: boolean
  isFollowing: boolean
  onToggleForm: () => void
  onToggleResumos: () => void
  onToggleTurmas: () => void
}

export function PerfilActions({
  isOwnProfile,
  isFollowing,
  onToggleForm,
  onToggleResumos,
  onToggleTurmas
}: PerfilActionsProps) {
  return (
    <div className="flex flex-col gap-3 mt-10 md:mt-0 pointer-events-auto pb-6 md:pb-0">
      {!isOwnProfile && (
        <Botao>{isFollowing ? 'Seguindo' : 'Seguir'}</Botao>
      )}

      <Botao
        onClick={onToggleForm}
        cor="bg-green-400"
        corHover="hover:bg-green-500"
      >
        Editar Perfil
      </Botao>

      <Botao
        onClick={onToggleResumos}
        cor="bg-yellow-300"
        corHover="hover:bg-yellow-400"
      >
        Meus Resumos
      </Botao>

      <Botao
        onClick={onToggleTurmas}
        cor="bg-pink-300"
        corHover="hover:bg-pink-400"
      >
        Minhas Turmas
      </Botao>

      <ButtonLogOut />
    </div>
  )
}