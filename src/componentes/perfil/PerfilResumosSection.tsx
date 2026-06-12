import { ArrowUpRight, Heart } from 'lucide-react'
import type { ResponseGetSummaryType } from '../../http/summary/types/ResponseGetSummaryType'
import { SummaryBadge } from '../badge/SummaryBadge'

type PerfilResumosSectionProps = {
  isOwnProfile: boolean
  studentId?: number
  onOpenResumo: (summaryId: number) => void
  data: ResponseGetSummaryType[] | undefined
}

export function PerfilResumosSection({
  onOpenResumo,
  data,
}: PerfilResumosSectionProps) {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-between">
      <div className="flex items-center gap-3" />

      <div className="mx-auto mt-6 grid w-full max-w-225 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-zinc-500">
            Nenhum resumo criado ainda.
          </p>
        )}

        {data?.map((resumo) => {
          const hasProfBadge = resumo.badge?.name
            ?.toLowerCase()
            .includes('professor')

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
              className="group relative flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                    Resumo
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-slate-900">
                    {resumo.titulo}
                  </h3>

                  {resumo.badge && (
                    <div className="mt-2">
                      <SummaryBadge
                        name={resumo.badge.name}
                        type={hasProfBadge ? 'professor' : 'turma'}
                      />
                    </div>
                  )}
                </div>

                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-blue-500" />
              </div>

              <p className="line-clamp-4 text-sm leading-7 text-slate-600">
                {resumo.conteudo?.trim()
                  ? resumo.conteudo
                  : 'Clique para visualizar o conteúdo completo do resumo.'}
              </p>

              <div className="h-px bg-slate-100" />

              <div className="mt-auto flex items-center">
                <p className="flex items-center gap-2 text-sm font-medium text-rose-500">
                  <Heart className="h-4 w-4 fill-current" />
                  {resumo.totalCurtidas ?? 0}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}