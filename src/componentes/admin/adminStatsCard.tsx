import { Loader2 } from "lucide-react"

type StatCardProps = {
    label: string
    ativos: number
    desativados?: number
    icon: React.ReactNode
    iconBg: string
    iconColor: string
    loading: boolean
}

export function StatCard({ label, ativos, desativados, icon, iconBg, iconColor, loading }: StatCardProps) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
                {loading ? (
                    <div className="flex items-center gap-1 text-gray-300"><Loader2 size={14} className="animate-spin" /> <span className="text-lg font-bold">...</span></div>
                ) : (
                    <>
                        <h3 className="text-2xl font-bold text-gray-900">{ativos.toLocaleString("pt-BR")}</h3>
                        {desativados !== undefined && desativados > 0 && (
                            <p className="text-[10px] text-red-400 font-medium">{desativados} desativado{desativados !== 1 ? "s" : ""}</p>
                        )}
                    </>
                )}
            </div>
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>{icon}</div>
        </div>
    )
}