import { PerfilActions } from '../componentes/perfil/PerfilActions'
import { PerfilAvatarCard } from '../componentes/perfil/PerfilAvatarCard'
import { PerfilAvatarPickerModal } from '../componentes/perfil/PerfilAvatarPickerModal'
import { PerfilEditFormModal } from '../componentes/perfil/PerfilEditFormModal'
import { PerfilInfo } from '../componentes/perfil/PerfilInfo'
import { PerfilResumosSection } from '../componentes/perfil/PerfilResumosSection'
import { PerfilTurmasSection } from '../componentes/perfil/PerfilTurmasSection'
import { PerfilSkeleton } from '../componentes/Skeleton/PerfilSkeleton'
import { ViweSummary } from '../componentes/ViweSummary'
import { usePaginaPerfil } from '../hooks/usePaginaPerfil'

export function PaginaPerfil() {
  const {
    user,
    subjects,
    isOwnProfile,
    isPending,
    isFollowing,
    filteredAvatars,
    selectedResumoId,
    setSelectedResumoId,
    modais,
    actions,
    isFollowingPending,
    isUnfollowingPending
  } = usePaginaPerfil()

  return (
    <main className="w-full min-h-screen p-4">
      <div className="font-sans min-h-dvh bg-zinc-100 flex flex-col pb-30">
        <section className="flex-1 p-8 pb-32 md:pb-8">
          {isPending ? (
            <PerfilSkeleton />
          ) : (
            <div className="bg-zinc-100 rounded-2xl p-10 pb-24 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-225 mx-auto relative shadow-md">
              <PerfilAvatarCard
                user={user}
                openFotoMenu={modais.openFotoMenu}
                onOpenAvatarPicker={actions.openAvatarPicker}
              />

              <PerfilInfo user={user} />

              <PerfilActions
                isFollowingPending={isFollowingPending}
                isUnfollowingPending={isUnfollowingPending}
                toFollow={actions.followUser}
                toUnFollow={actions.unfollowUser}
                isOwnProfile={isOwnProfile}
                isFollowing={isFollowing}
                onToggleForm={actions.toggleEditForm}
                onToggleCreateResumo={actions.toggleResumoForm}
              />
            </div>
          )}

          <PerfilResumosSection
            isOwnProfile={isOwnProfile}
            studentId={actions.profileStudentId}
            onOpenResumo={(summaryId) => setSelectedResumoId(summaryId)}
          />

          <PerfilTurmasSection turmas={subjects ?? []} />

          {selectedResumoId && (
            <ViweSummary
              id={selectedResumoId}
              onClose={() => setSelectedResumoId(null)}
            />
          )}

          {isOwnProfile && (
            <>
              <PerfilEditFormModal
                isOpen={modais.showForm}
                user={user}
                onClose={actions.closeEditForm}
                onSubmit={actions.submitEditForm}
              />

              <PerfilAvatarPickerModal
                isOpen={modais.openAvatarPicker}
                selectedGender={modais.selectedGender}
                onChangeGender={actions.setSelectedGender}
                avatars={filteredAvatars}
                onClose={actions.closeAvatarPicker}
                onSelectAvatar={actions.selectAvatar}
              />
            </>
          )}
        </section>
      </div>
    </main>
  )
}
