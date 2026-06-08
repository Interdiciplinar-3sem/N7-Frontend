import { ArrowUpRight, FileText, Flag, Heart, ShieldOff, Star } from 'lucide-react'
import type { ResponseGetSummaryType } from '../../http/summary/types/ResponseGetSummaryType' 
import { SummaryBadge } from '../badge/SummaryBadge'
import { useToast } from '../../contexto/toastContext'

type PerfilResumosSectionProps = {
  isOwnProfile: boolean
  studentId?: number
  onOpenResumo: (summaryId: number) => void
  data: ResponseGetSummaryType[] | undefined
  isAdm?: boolean
  isProfessor?: boolean
  onReport?: (id: number) => void
  onToggleStatus?: (id: number) => void
  onAssignBadge?: (id: number, hasBadge: boolean) => void
}

export function PerfilResumosSection({ onOpenResumo, data, isAdm, isProfessor, onReport, onToggleStatus, onAssignBadge, isOwnProfile }: PerfilResumosSectionProps) {
  const {confirm, showSuccess} = useToast();

  return (
    <div className='w-full flex flex-col gap-4 items-center justify-between'>
      <div className='flex items-center gap-3' />

      <div className="mx-auto mt-6 grid w-full max-w-225 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data?.length === 0 && (
        <p className="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-zinc-500">
          Nenhum resumo criado ainda.
        </p>
      )}

      {data?.map((resumo) => {
        const hasProfBadge = resumo.badge?.name?.toLowerCase().includes("professor");
        return (
        <div
          key={resumo.summaryId}
          onClick={() => onOpenResumo(resumo.summaryId)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpenResumo(resumo.summaryId)
            }
          }}
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-white via-[#F7FBFF] to-[#EEF6FF] p-5 flex flex-col gap-4 shadow-sm text-left transition-all w-full min-w-0 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200 transition-transform group-hover:scale-105">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Resumo
                </p>
                <h3 className="truncate text-lg font-bold text-slate-900">
                  {resumo.titulo}
                </h3>
                {resumo.badge && (
                  <div className="mt-1">
                    <SummaryBadge
                      name={resumo.badge.name}
                      type={hasProfBadge ? "professor" : "turma"}
                    />
                  </div>
                )}
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-200">
              Abrir
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {resumo.conteudo?.trim() ? resumo.conteudo : 'Clique para visualizar o conteúdo completo do resumo.'}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-rose-500">
              <Heart className="h-4 w-4 fill-current" />
              {resumo.totalCurtidas ?? 0}
            </p>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {!isAdm && !isProfessor && onReport && !isOwnProfile && (
                <button
                  type="button"
                  onClick={() => onReport(resumo.summaryId)}
                  className="rounded-lg bg-slate-100 px-2 py-1.5 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all flex items-center gap-1 text-xs"
                  title="Reportar"
                >
                  <Flag size={12} />
                </button>
              )}

              {isAdm && onToggleStatus && (
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await confirm({
                        title: "Desativar resumo?",
                        message: "Tem certeza?",
                        confirmText: "Sim, excluir"
                    });

                    if(!ok) {
                      return;
                    }
                    onToggleStatus(resumo.summaryId)
                    showSuccess(resumo.ativo ? "Resumo desativado" : "Resumo ativado")
                  }}
                  className={`rounded-lg px-2 py-1.5 text-xs font-semibold flex items-center gap-1 transition-all ${resumo.ativo ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                  title={resumo.ativo ? "Desativar" : "Ativar"}
                >
                  <ShieldOff size={12} />
                  {resumo.ativo ? "Desativar" : "Ativar"}
                </button>
              )}

              {isProfessor && onAssignBadge && (
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await confirm({
                      title: hasProfBadge
                        ? "Remover selo de destaque?"
                        : "Atribuir selo de destaque?",
                      message: hasProfBadge
                        ? "Este resumo perderá o selo de destaque atribuído pelo professor."
                        : "Este resumo será marcado como destacado pelo professor e poderá ganhar mais visibilidade.",
                      confirmText: hasProfBadge ? "Sim, remover" : "Sim, atribuir",
                    })

                    if(!ok) {
                      return;
                    }

                    onAssignBadge(resumo.summaryId, !!hasProfBadge)
                    showSuccess(hasProfBadge ? "Selo de destaque removido" : "Selo de destaque atribuído")
                  }}
                  className={`rounded-lg px-2 py-1.5 text-xs font-semibold flex items-center gap-1 transition-all ${hasProfBadge ? "bg-violet-100 text-violet-600 hover:bg-violet-200" : "bg-slate-100 text-slate-500 hover:bg-violet-50 hover:text-violet-500"}`}
                  title={hasProfBadge ? "Remover selo" : "Atribuir selo"}
                >
                  <Star size={12} className={hasProfBadge ? "fill-violet-500" : ""} />
                  {hasProfBadge ? "Remover selo" : "Atribuir selo"}
                </button>
              )}
            </div>
          </div>
        </div>
        )
      })}
      </div>
    </div>
  )
}