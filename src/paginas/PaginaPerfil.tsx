import { PerfilActions } from '../componentes/perfil/PerfilActions'
import { PerfilAvatarCard } from '../componentes/perfil/PerfilAvatarCard'
import { PerfilBioPickerModal } from '../componentes/perfil/PerfilBioPickerModal'
import { PerfilAvatarPickerModal } from '../componentes/perfil/PerfilAvatarPickerModal'
import { PerfilEditFormModal } from '../componentes/perfil/PerfilEditFormModal'
import { PerfilInfo } from '../componentes/perfil/PerfilInfo'
import { PerfilResumosSection } from '../componentes/perfil/PerfilResumosSection'
import { PerfilTurmasSection } from '../componentes/perfil/PerfilTurmasSection'
import { PerfilSkeleton } from '../componentes/Skeleton/PerfilSkeleton'
import { ViewSummary } from '../componentes/ViewSummary'
import { usePaginaPerfil } from '../hooks/usePaginaPerfil'
import { StudentsListPage } from '../componentes/ui/StudentsListPage'
import { CardPerfil } from '../componentes/ui/cardPerfil'
import { ProfessorBadge } from '../componentes/badge/ProfessorProfileBadge'
import { useToggleStudentStatusByStudentId } from '../http/admin/useToggleStudentStatusByStudentId'
import { ShieldOff } from 'lucide-react'
import { useReportSummary, useUpdateStatusSummary } from '../http/summary/update/useUpdateSummary'
import { useAssignProfessorBadge, useRemoveProfessorBadge } from '../http/professor/useProfessor'
import { useSummaryActions } from '../hooks/useSummaryActionBar'

export function PaginaPerfil() {
    const { mutateAsync: reportSummary } = useReportSummary()
    const { mutateAsync: toggleSummaryStatus } = useUpdateStatusSummary()
    const { mutateAsync: assignBadge } = useAssignProfessorBadge()
    const { mutateAsync: removeBadge } = useRemoveProfessorBadge()
    const { mutateAsync: toggleStudentStatus } = useToggleStudentStatusByStudentId()

    const {
        user,
        professorData,
        resumoData,
        follwing,
        follwers,
        subjects,
        isOwnProfile,
        isAluno,
        isProfessor,
        isAdm,
        isPending,
        isFollowing,
        filteredAvatars,
        bios,
        selectedResumoId,
        setSelectedResumoId,
        modais,
        modais: { openFollowersList, openFollowingList },
        actions,
        isFollowingPending,
        isUnfollowingPending,
    } = usePaginaPerfil()

    const role = isAdm ? "ADM" : isProfessor ? "PROFESSOR" : "ALUNO"
    const selectedResumo = resumoData?.find((r: any) => r.summaryId === selectedResumoId) ?? null

    const others = openFollowersList ? follwers.data : follwing.data
    const { handleDesactiveSummary, handleReportSummary, handleBadge } = useSummaryActions(setSelectedResumoId);

    return (
        <main className="w-full min-h-screen p-4">
            <div className="font-sans min-h-dvh bg-zinc-100 flex flex-col pb-30">
                <section className="flex-1 p-8 pb-32 md:pb-8">
                    {isPending ? (
                        <PerfilSkeleton />
                    ) : (
                        <div className="bg-zinc-100 rounded-2xl p-10 pb-24 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-225 mx-auto relative shadow-md">
                            <PerfilAvatarCard
                                isOwnProfile={isOwnProfile && isAluno}
                                user={user}
                                onOpenAvatarPicker={actions.openAvatarPicker}
                                setOpenFollowingList={modais.setOpenFollowingList}
                                setOpenFollowersList={modais.setOpenFollowersList}
                            />

                            <div className="flex flex-col gap-2 w-full">
                                {isProfessor && isOwnProfile && (
                                    <ProfessorBadge materia={professorData?.subject?.name} />
                                )}

                                <PerfilInfo user={user} isOwnProfile={isOwnProfile && isAluno} />

                                {isProfessor && isOwnProfile && professorData?.email && (
                                    <p className="text-sm text-zinc-500 mt-1">
                                        {professorData.email}
                                    </p>
                                )}
                            </div>

                            <PerfilActions
                                isAdm={isAdm}
                                isAluno={isAluno}
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

                            {isAdm && isAluno && !isOwnProfile && (
                                <button
                                    onClick={() => {
                                        if (actions.profileStudentId) {
                                            toggleStudentStatus(actions.profileStudentId)
                                        }
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 mt-2 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition border border-red-200"
                                    title="Desativar/Ativar aluno"
                                >
                                    <ShieldOff size={14} />
                                    Desativar Aluno
                                </button>
                            )}
                        </div>
                    )}

                    <PerfilResumosSection
                        data={resumoData ?? []}
                        studentId={actions.profileStudentId}
                        onOpenResumo={(summaryId) => setSelectedResumoId(summaryId)}
                        isAdm={isAdm}
                        isProfessor={isProfessor}
                        isOwnProfile={isOwnProfile}
                        onReport={(id) => reportSummary(id)}
                        onToggleStatus={isAdm ? (id) => toggleSummaryStatus(id) : undefined}
                        onAssignBadge={isProfessor
                            ? (id, hasBadge) => hasBadge ? removeBadge(id) : assignBadge(id)
                            : undefined
                        }
                    />

                    <PerfilTurmasSection turmas={subjects ?? []} />

                    {isProfessor && professorData?.subject && (
                        <div className="max-w-225 mx-auto mt-6 bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                                Matéria lecionada
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📚</span>
                                <div>
                                    <p className="font-medium text-zinc-800">{professorData.subject.name}</p>
                                    <p className="text-xs text-zinc-400">{professorData.subject.semestre}º semestre</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedResumoId !== null && (
                        <ViewSummary
                            id={selectedResumoId}
                            role={role}
                            onClose={() => setSelectedResumoId(null)}
                            isActive={selectedResumo?.ativo}
                            onReport={!isOwnProfile ? (id) => handleReportSummary(id, reportSummary) : undefined}
                            onSoftDeleteSumary={isAdm ? (id) => handleDesactiveSummary(id, toggleSummaryStatus) : undefined}
                            onAssignBadge={isProfessor
                                ? (id, hasBadge) => handleBadge(id, hasBadge, assignBadge, removeBadge)
                                : undefined
                            }
                        />
                    )}

                    {isOwnProfile && isAluno && (
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

                    {isAluno && (
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
                                        modais.setOpenFollowersList(false)
                                        modais.setOpenFollowingList(false)
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
                    )}
                </section>
            </div>
        </main>
    )
}