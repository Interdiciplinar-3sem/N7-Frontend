import { Botao } from '../ui/Botao'
import { ButtonLogOut } from '../buttonLogout' 

type PerfilActionsProps = {
  isFollowingPending: boolean
  isUnfollowingPending: boolean
  isOwnProfile: boolean
  isFollowing: boolean
  toFollow: () => Promise<{message: string}>
  toUnFollow: () => Promise<{message: string}>
  onToggleForm: () => void
  onToggleCreateResumo: () => void
}

export function PerfilActions({
  isOwnProfile,
  isFollowing,
  onToggleForm,
  onToggleCreateResumo,
  toFollow,
  toUnFollow,
  isFollowingPending,
  isUnfollowingPending
}: PerfilActionsProps) {
  return (
    <div className="flex flex-col gap-3 mt-10 md:mt-0 pointer-events-auto pb-6 md:pb-0">
      {!isOwnProfile ? (
        <Botao onClick={ isFollowing ? toUnFollow : toFollow}>
          {isUnfollowingPending ? "deixando de seguir" : isFollowingPending ? "seguindo" : (isFollowing ? 'Deixar de seguir' : 'Seguir')}
        </Botao>
      ) : (
        <>
          <Botao
            onClick={onToggleForm}
            cor="bg-green-400"
            corHover="hover:bg-green-500"
          >
            Editar Perfil
          </Botao>

          <Botao
            onClick={onToggleCreateResumo}
            cor="bg-blue-600"
            corHover="hover:bg-blue-700 hover:shadow-md"
          >
            Criar resumo
          </Botao>

          <ButtonLogOut />
        </>
      )}
    </div>
  )
}