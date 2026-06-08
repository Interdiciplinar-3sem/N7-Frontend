import { Botao } from '../ui/Botao'
import { ButtonLogOut } from '../buttonLogout' 
import { useToast } from '../../contexto/toastContext'

type PerfilActionsProps = {
  isAdm: boolean
  isAluno: boolean
  isFollowingPending: boolean
  isUnfollowingPending: boolean
  isOwnProfile: boolean
  isFollowing: boolean
  toFollow: () => Promise<{message: string}>
  toUnFollow: () => Promise<{message: string}>
  onToggleForm: () => void
  onToggleBioPicker: () => void
  onToggleCreateResumo?: () => void 
}

export function PerfilActions({
  isAdm,
  isAluno,
  isOwnProfile,
  isFollowing,
  onToggleForm,
  onToggleBioPicker,
  onToggleCreateResumo,
  toFollow,
  toUnFollow,
  isFollowingPending,
  isUnfollowingPending
}: PerfilActionsProps) {
  const { confirm } = useToast();
 
 return (
    <div className="flex flex-col gap-3 mt-10 md:mt-0 pointer-events-auto pb-6 md:pb-0">
      {!isOwnProfile && isAluno ? (
        <Botao onClick={isFollowing ? toUnFollow : toFollow}>
          {isUnfollowingPending
            ? "deixando de seguir"
            : isFollowingPending
              ? "seguindo"
              : isFollowing
                ? "Deixar de seguir"
                : "Seguir"}
        </Botao>
      ) : isAdm ? (
        <>
          <Botao
            onClick={async () => {
              const ok = await confirm({
                  title: "Desativar resumo?",
                  message: "Tem certeza?",
                  confirmText: "Sim, excluir"
              });

              if(!ok) {
                return;
              }
            }}
            cor="bg-red-400"
          >
            Desativar Perfil
          </Botao>
        </>
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
            onClick={onToggleBioPicker}
            cor="bg-amber-300"
            corHover="hover:bg-amber-400"
          >
            Escolher bio
          </Botao>

          {onToggleCreateResumo && (
            <Botao
              onClick={onToggleCreateResumo}
              cor="bg-blue-600"
              corHover="hover:bg-blue-700 hover:shadow-md"
            >
              Criar resumo
            </Botao>
          )}

          <ButtonLogOut />
        </>
      )}
  </div>
)
}