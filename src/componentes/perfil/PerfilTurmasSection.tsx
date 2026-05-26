import type { ResponseGetCourseSubjectsType } from '../../http/types/responseGetCourseSubjects'

type PerfilTurmasSectionProps = {
  turmas: ResponseGetCourseSubjectsType[]
}

const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA"]

export function PerfilTurmasSection({ turmas }: PerfilTurmasSectionProps) {
  return (
    <div className="max-w-225 mx-auto mt-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold text-zinc-700">
        Minhas Turmas ({turmas.length})
      </h2>

      {turmas.length === 0 && (
        <p className="text-zinc-500">Nenhuma turma associada ao usuário.</p>
      )}

      {turmas.map((turma) => (
        <div
          key={turma.id}
          style={{ backgroundColor: colors[Number(turma.id) % colors.length], opacity: 0.85 }}
          className="
            rounded-xl
            shadow-sm
            p-4
            flex
            items-center
            justify-between
            hover:shadow-md
            transition
          "
        >
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-zinc-800">
              {turma.name}
            </h3>

          </div>
          <span className="text-xs text-zinc-400">turma</span>
        </div>
      ))}
    </div>
  )
}