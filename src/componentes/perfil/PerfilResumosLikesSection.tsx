import { ArrowUpRight, FileText, Heart } from 'lucide-react'
import { useGetLikedSummaries } from '../../http/summary/useGetLikedSummarys'

type PerfilResumosLikesSectionProps = {
  isOwnProfile: boolean
  onOpenResumo: (summaryId: number) => void
}

export function PerfilResumosLikesSection({ isOwnProfile, onOpenResumo }: PerfilResumosLikesSectionProps) {
  const { data, isPending } = useGetLikedSummaries()

  if (!isOwnProfile) return null

  return (
    <div className='w-full flex flex-col gap-4 items-center justify-between mt-8'>
      <div className="mx-auto w-full max-w-225">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
          Resumos curtidos
        </h2>

        {isPending && (
          <p className="text-center text-sm text-zinc-400">Carregando...</p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {!isPending && data?.length === 0 && (
            <p className="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-zinc-500">
              Nenhum resumo curtido ainda.
            </p>
          )}

          {data?.map((resumo) => (
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
              className="
                group relative overflow-hidden rounded-2xl border border-slate-200
                bg-linear-to-br from-white via-[#FFF7F7] to-[#FFF0F0]
                p-5 flex flex-col gap-4 shadow-sm text-left transition-all w-full min-w-0
                hover:-translate-y-1 hover:shadow-xl hover:border-rose-200
                focus:outline-none focus:ring-2 focus:ring-rose-400
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-md shadow-rose-200 transition-transform group-hover:scale-105">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                      Curtido
                    </p>
                    <h3 className="truncate text-lg font-bold text-slate-900">
                      {resumo.titulo}
                    </h3>
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

              <div className="mt-auto flex items-center gap-2 text-sm font-medium text-rose-500">
                <Heart className="h-4 w-4 fill-current" />
                {resumo.totalCurtidas ?? 0} curtidas
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}