import { useEffect, useMemo, useState } from 'react'
import type { ResponseGetBiosType } from '../../http/types/responseGetBiosType'
import { DicesIcon } from 'lucide-react'

type BioViewMode = 'list' | 'carousel'

type PerfilBioPickerModalProps = {
  isOpen: boolean
  bios: ResponseGetBiosType[]
  currentBio: string
  onClose: () => void
  onSelectBio: (bio: ResponseGetBiosType) => void | Promise<void>
}

export function PerfilBioPickerModal({
  isOpen,
  bios,
  currentBio,
  onClose,
  onSelectBio
}: PerfilBioPickerModalProps) {
  const [viewMode, setViewMode] = useState<BioViewMode>('list')
  const [selectedBioId, setSelectedBioId] = useState<string | null>(null)

  const selectedBio = useMemo(() => {
    return bios.find((bio) => bio.id === selectedBioId) ?? null
  }, [bios, selectedBioId])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const current = bios.find((bio) => bio.description === currentBio) ?? bios[0] ?? null

    setViewMode('list')
    setSelectedBioId(current?.id ?? null)
  }, [bios, currentBio, isOpen])

  const selectRandomBio = () => {
    if (!bios.length) {
      return
    }

    if (bios.length === 1) {
      setSelectedBioId(bios[0].id)
      setViewMode('carousel')
      return
    }

    const currentIndex = bios.findIndex((bio) => bio.id === selectedBioId)
    let nextIndex = Math.floor(Math.random() * bios.length)

    if (nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % bios.length
    }

    setSelectedBioId(bios[nextIndex].id)
    setViewMode('carousel')
  }

  const goToPreviousBio = () => {
    if (!bios.length) {
      return
    }

    const currentIndex = Math.max(0, bios.findIndex((bio) => bio.id === selectedBioId))
    const previousIndex = currentIndex === 0 ? bios.length - 1 : currentIndex - 1

    setSelectedBioId(bios[previousIndex].id)
  }

  const goToNextBio = () => {
    if (!bios.length) {
      return
    }

    const currentIndex = Math.max(0, bios.findIndex((bio) => bio.id === selectedBioId))
    const nextIndex = currentIndex >= bios.length - 1 ? 0 : currentIndex + 1

    setSelectedBioId(bios[nextIndex].id)
  }

  const confirmSelectedBio = async () => {
    if (!selectedBio) {
      return
    }

    await onSelectBio(selectedBio)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 border-b pb-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-zinc-900">Escolher bio</h2>
            <p className="text-sm text-zinc-500">Selecione uma bio pronta para atualizar o perfil.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['list', 'carousel'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${viewMode === mode ? 'bg-amber-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
              >
                {mode === 'list' ? 'Lista' : 'Carrossel'}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="mt-6 grid max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto pr-1 md:grid-cols-2">
            {bios.map((bio) => {
              const isCurrent = bio.description === currentBio
              const isPreview = bio.id === selectedBioId

              return (
                <button
                  key={bio.id}
                  type="button"
                  onClick={() => {
                    setSelectedBioId(bio.id)
                    onSelectBio(bio)
                  }}
                  className={`flex h-full flex-col items-start gap-3 rounded-2xl border p-4 text-left transition hover:shadow-lg ${isPreview ? 'border-amber-400 bg-amber-50' : 'border-zinc-200 hover:border-amber-300'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${bio.ativo ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                    <p className="text-sm font-semibold text-zinc-900">Bio {bio.id}</p>
                    {isCurrent && (
                      <span className="rounded-full bg-amber-200 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                        Atual
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-6 text-zinc-600">{bio.description}</p>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="mt-6 flex min-h-88 flex-col items-center justify-center gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="flex w-full items-center justify-between gap-3">
             
            </div>

            <div className="flex w-full max-w-2xl flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-sm">
              <p className="text-2xl font-semibold leading-relaxed text-zinc-900 md:text-4xl">
                {selectedBio?.description ?? 'Nenhuma bio disponível'}
              </p>

            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {bios.map((bio) => (
                <button
                  key={bio.id}
                  type="button"
                  onClick={() => setSelectedBioId(bio.id)}
                  className={`h-3 w-3 rounded-full transition ${bio.id === selectedBioId ? 'scale-125 bg-amber-600' : 'bg-zinc-300 hover:bg-zinc-400'}`}
                  aria-label={`Selecionar bio ${bio.id}`}
                />
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
               <button
                type="button"
                onClick={goToPreviousBio}
                disabled={bios.length < 2}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={selectRandomBio}
                disabled={!bios.length}
                className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <DicesIcon />
              </button>

              <button
                type="button"
                onClick={goToNextBio}
                disabled={bios.length < 2}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
            <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-zinc-100 px-4 py-2 font-semibold text-zinc-700 transition hover:bg-zinc-200"
            >
                Cancelar
            </button>
            <button
                type="button"
                onClick={confirmSelectedBio}
                disabled={!selectedBio}
                className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Confirmar bio
            </button>
        </div>
      </div>
    </div>
  )
}