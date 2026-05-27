import { useEffect, useMemo, useState } from "react"
import { BookOpen, GraduationCap } from "lucide-react"
import type { ContextPropsTypeNetwork } from "../types/contextPropsType"
import { useOutletContext } from "react-router"
import { useGetCourseSubjectsSemesterMe } from "../http/course/useGetCourseSubjectsMe"
import { useGetCourseStudentsSemester } from "../http/course/useGetCourseStudentsSemester"
import { CardPerfil } from "../componentes/ui/cardPerfil"
import { useGetSummarySubjectId } from "../http/summary/useGetSummarySubject"
import { ViweSummary } from "../componentes/ViweSummary"

const colors = ['bg-[#D8FBE4]', 'bg-[#FFE6E0]', 'bg-[#FFE2F4]', 'bg-[#DAE8FF]', 'bg-[#D8FBE4]', 'bg-[#FFE6E0]', 'bg-[#FFE2F4]', 'bg-[#DAE8FF]']

const tabOptions = [
  { id: "materias", label: "Matérias" },
  { id: "usuarios", label: "Usuários" }
] as const

export function PaginaTurmas() {
  const parentContext = useOutletContext<ContextPropsTypeNetwork>();
  const [activeTab, setActiveTab] = useState<(typeof tabOptions)[number]["id"]>("materias")
  const { data: turmas } = useGetCourseSubjectsSemesterMe(String(parentContext?.studentId ?? ""))
  const [selectedTurmaId, setSelectedTurmaId] = useState<string | null>(null)
  const [selectedResumoId, setSelectedResumoId] = useState<string | null>(null)

  useEffect(() => {
    if (!turmas?.length) {
      return
    }

    const hasValidSelection = selectedTurmaId ? turmas.some((turma) => turma.id === selectedTurmaId) : false

    if (!hasValidSelection) {
      setSelectedTurmaId(turmas[0].id)
    }
  }, [selectedTurmaId, turmas])

  const selectedTurma = useMemo(
    () => turmas?.find((turma) => turma.id === selectedTurmaId) ?? null,
    [selectedTurmaId, turmas]
  )

  const semester = selectedTurma?.semestre ?? turmas?.[0]?.semestre ?? 1
  const {data: students, isPending: isStudentsPending} = useGetCourseStudentsSemester("1", semester)
  const {data: resumos, isPending} = useGetSummarySubjectId(selectedTurmaId ?? "")
  

  const openTurma = (id: string) => {
    setSelectedTurmaId(id)
  }

  const clearSelection = () => {
    setSelectedTurmaId(null)
  }

  return (
    <main className="min-h-screen w-full bg-[radial-gradient(circle_at_top,#f4f7ff_0%,#f8fafc_42%,#f1f5f9_100%)] px-4 py-6 text-zinc-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-3xl bg-[#F8FAFC] p-5 shadow-md md:p-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
              <GraduationCap className="h-4 w-4" />
              Turmas do semestre
            </span>
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900 md:text-3xl">Escolha uma turma e explore os resumos</h1>
              <p className="text-sm text-zinc-500">Layout no mesmo ritmo da página de seguindo: cards em lista, foco no conteúdo e detalhe sob demanda.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-zinc-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">{turmas?.[0]?.semestre}°</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Semestre</p>
            </div>
          </div>
        </header>

        <div className="flex gap-2 rounded-2xl bg-zinc-100 p-1.5">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === tab.id ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {selectedTurma && (
        <section className="mx-auto mt-2 flex w-full max-w-5xl flex-col gap-4 rounded-3xl bg-white p-5 shadow-md md:p-6">
          <div className={`h-1.5 w-full rounded-full bg-linear-to-r ${colors[Number(selectedTurma.id)]}`} />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Turma selecionada</p>
              <h2 className="mt-1 text-2xl font-semibold text-zinc-900">{selectedTurma.name}</h2>
            </div>

            <button
              type="button"
              onClick={clearSelection}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Limpar seleção
            </button>
          </div>

          {activeTab === "materias" ? (
            <div className="space-y-4">
              <div className="grid gap-3">
                {turmas?.map((turma, index) => {
                  const isSelected = turma.id === selectedTurmaId

                  return (
                    <button
                      key={turma.id}
                      type="button"
                      onClick={() => openTurma(turma.id)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${isSelected ? 'bg-green-100/50 border-none text-black' : 'border-white bg-white hover:bg-zinc-50'}`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r ${colors[index]} text-white shadow-sm`}>
                        <BookOpen className="h-5 w-5 text-black" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="truncate text-lg font-semibold">{turma.name}</h2>
                        </div>
                      </div>

                      <div className="hidden text-right sm:block">
                        <p className={`text-xs uppercase tracking-[0.2em] ${isSelected ? 'text-zinc-400' : 'text-zinc-400'}`}>Detalhes</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {selectedTurma && (
                <div className="rounded-3xl border border-zinc-200 bg-[#F8FAFC] p-4 shadow-sm md:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Resumos da matéria</p>
                      <h3 className="mt-1 text-lg font-semibold text-zinc-900">{selectedTurma.name}</h3>
                    </div>

                    <button
                      type="button"
                      onClick={clearSelection}
                      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                    >
                      Limpar seleção
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {isPending && ( <h2 className="text-center text-zinc-500">Carregando resumos...</h2>  )}
                    {resumos?.length === 0 && !isPending && (<h2 className="text-center text-zinc-500">Seja o primeiro a criar um resumo nessa matéria!</h2> )}
                    {resumos?.map((resumo) => (
                      <article
                        key={resumo.summaryId}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedResumoId(resumo.summaryId)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedResumoId(resumo.summaryId)
                          }
                        }}
                        className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-zinc-900">{resumo.titulo}</p>
                            <p className="mt-1 text-sm text-zinc-500">por {resumo.studentNome ?? "Aluno"}</p>
                          </div>
                          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500">
                            {resumo.totalCurtidas ?? 0} curtidas
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">{resumo.conteudo}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-900">Usuários desta turma</h3>
              <div className="grid gap-3">
                {isStudentsPending && ( <h2 className="text-center text-zinc-500">Carregando alunos...</h2>  )}
                {students?.length === 0 && !isStudentsPending && (<h2 className="text-center text-zinc-500">Nenhum aluno encontrado.</h2> )}
                {students?.map((aluno) => (
                  <CardPerfil
                    key={aluno.studentId}
                    studentId={aluno.studentId}
                    nome={aluno.nome}
                    seguidores={aluno.qtdSeguidores}
                    semestre={aluno.semestre}
                    url={aluno.url}
                    className="w-full max-w-none"
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {selectedResumoId && (
        <ViweSummary
          id={selectedResumoId}
          materia={selectedTurma?.name}
          onClose={() => setSelectedResumoId(null)}
        />
      )}
    </main>
  )
}
