import { Star, Trophy } from "lucide-react"

type SummaryBadgeProps = {
    name: string;
    type?: "professor" | "turma";
    size?: "sm" | "md";
}

export function SummaryBadge({ name, type = "turma", size = "sm" }: SummaryBadgeProps) {
    const isProfessor = type === "professor" || name.toLowerCase().includes("professor");

    if (isProfessor) {
        return (
            <div className={`inline-flex items-center gap-1 rounded-full font-semibold ring-1 ${
                size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
            } bg-violet-100 text-violet-700 ring-violet-200`}>
                <Star size={size === "sm" ? 10 : 12} className="fill-violet-500 text-violet-500" />
                <span>Destaque do Prof.</span>
            </div>
        );
    }

    return (
        <div className={`inline-flex items-center gap-1 rounded-full font-semibold ring-1 ${
            size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        } bg-amber-100 text-amber-700 ring-amber-200`}>
            <Trophy size={size === "sm" ? 10 : 12} className="fill-amber-500 text-amber-500" />
            <span>Resumo Popular</span>
        </div>
    );
}