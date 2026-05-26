import { useGetCourseSubjectsSemester } from "../http/course/useGetCourseSubjectsSemester";

export function PaginaTurmas() {
    const {data: subjects} = useGetCourseSubjectsSemester("1", "1");
    const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA"]

    return (
        <main className="w-full min-h-[75vh] flex justify-center items-center overflow-x-hidden overflow-y-auto">
                    
            <div className="max-w-225 mx-auto mt-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-zinc-700">
                Minhas Turmas ({subjects?.length})
                </h2>
        
                {subjects?.length === 0 && (
                <p className="text-zinc-500">Nenhuma turma associada ao usuário.</p>
                )}
        
                {subjects?.map((turma) => (
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
        </main>
    )
}