export function ProfessorBadge({ materia }: { materia?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
      <span>Professor</span>
      {materia && <span className="text-indigo-400">· {materia}</span>}
    </div>
  )
}