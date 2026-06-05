import { PerfilActions } from '../componentes/perfil/PerfilActions'
import { PerfilAvatarCard } from '../componentes/perfil/PerfilAvatarCard'
import { PerfilBioPickerModal } from '../componentes/perfil/PerfilBioPickerModal'
import { PerfilAvatarPickerModal } from '../componentes/perfil/PerfilAvatarPickerModal'
import { PerfilEditFormModal } from '../componentes/perfil/PerfilEditFormModal'
import { PerfilInfo } from '../componentes/perfil/PerfilInfo'
import { PerfilResumosSection } from '../componentes/perfil/PerfilResumosSection'
import { PerfilTurmasSection } from '../componentes/perfil/PerfilTurmasSection'
import { PerfilSkeleton } from '../componentes/Skeleton/PerfilSkeleton'
import { ViweSummary } from '../componentes/ViweSummary'
import { usePaginaPerfil } from '../hooks/usePaginaPerfil'
import { StudentsListPage } from '../componentes/ui/StudentsListPage'
import { CardPerfil } from '../componentes/ui/cardPerfil'

export function PaginaPerfil() {
  const {
    user,
    resumoData,
    follwing,
    follwers,
    subjects,
    isOwnProfile,
    isPending,
    isFollowing,
    filteredAvatars,
    bios,
    selectedResumoId,
    setSelectedResumoId,
    modais,
    modais: {
      openFollowersList,
      openFollowingList
    },
    actions,
    isFollowingPending,
    isUnfollowingPending
  } = usePaginaPerfil()

  const others = openFollowersList
    ? follwers.data
    : follwing.data

  return (
    <main className="w-full min-h-screen p-4">
      <div className="font-sans min-h-dvh bg-zinc-100 flex flex-col pb-30">
        <section className="flex-1 p-8 pb-32 md:pb-8">
          {isPending ? (
            <PerfilSkeleton />
          ) : (
            <div className="bg-zinc-100 rounded-2xl p-10 pb-24 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-225 mx-auto relative shadow-md">
              <PerfilAvatarCard
                isOwnProfile={isOwnProfile}
                user={user}
                onOpenAvatarPicker={actions.openAvatarPicker}
                setOpenFollowingList={modais.setOpenFollowingList}
                setOpenFollowersList={modais.setOpenFollowersList}
              />

              <PerfilInfo user={user} isOwnProfile={isOwnProfile} />

              <PerfilActions
                isFollowingPending={isFollowingPending}
                isUnfollowingPending={isUnfollowingPending}
                toFollow={actions.followUser}
                toUnFollow={actions.unfollowUser}
                isOwnProfile={isOwnProfile}
                isFollowing={isFollowing}
                onToggleForm={actions.toggleEditForm}
                onToggleBioPicker={actions.openBioPicker}
                onToggleCreateResumo={actions.toggleResumoForm}
              />
            </div>
          )}

          <PerfilResumosSection
            data={resumoData ?? []}
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

              <PerfilBioPickerModal
                isOpen={modais.openBioPicker}
                bios={bios}
                currentBio={user?.descricao ?? ''}
                onClose={actions.closeBioPicker}
                onSelectBio={(bio) => actions.selectBio(bio.description)}
              />
            </>
          )}
          <StudentsListPage
              setOpenFollowersList={modais.setOpenFollowersList}
              setOpenFollowingList={modais.setOpenFollowingList}
              title={openFollowersList ? "Seguidores" : "Seguindo"}
              isOpen={openFollowersList || openFollowingList}
              description="Lista de usuários que seguem este perfil"
              backLabel="Voltar ao perfil"
              isPending={isPending}
              pendingLabel="Carregando usuários"
              items={others}
              emptyMessage={openFollowersList ? "Nenhum seguidor encontrado." : "Nenhum usuário seguido encontrado."}
              renderItem={(user) => (
                <CardPerfil
                   onSelectUser={() => {
                    modais.setOpenFollowersList(false);
                    modais.setOpenFollowingList(false);
                  }}
                  key={user.studentId}
                  studentId={user.studentId}
                  nome={user.name}
                  seguidores={user.seguidores}
                  semestre={user.semestre}
                  url={user.studentUrl}
                  className="w-full max-w-none"
                />
              )}
            />
        </section>
      </div>
    </main>
  )
}
