import type { PerfilResumo } from './types'

type PerfilResumosSectionProps = {
  resumos: PerfilResumo[]
  onDeleteResumo: (id: number) => void
}

export function PerfilResumosSection({
  resumos,
  onDeleteResumo
}: PerfilResumosSectionProps) {
  return (
    <div
      className="
        max-w-225
        mx-auto
        mt-6
        grid
        grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
        gap-4
      "
    >
      {resumos.length === 0 && (
        <p className="text-zinc-500">Nenhum resumo criado ainda.</p>
      )}

      {resumos.map((resumo) => (
        <div
          key={resumo.id}
          className="
            p-4
            rounded-xl
            bg-white
            flex
            flex-col
            justify-between
            gap-2
            shadow-sm
          "
        >
          <h3 className="font-bold text-lg">{resumo.titulo}</h3>

          <p className="text-zinc-600">{resumo.materia}</p>

          <p className="text-sm text-zinc-400">❤️ {resumo.curtidas}</p>

          <button
            onClick={() => onDeleteResumo(resumo.id)}
            className="
              self-end
              px-3
              py-1
              rounded-md
              bg-red-500
              text-white
              hover:bg-red-600
              transition-all
            "
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}