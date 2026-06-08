import { useToast } from "../contexto/toastContext";

export const useSummaryActions = (setSelectedId: (id: number | null) => void) => {
    const { confirm, showSuccess } = useToast();

    const handleDesactiveSummary = async (
        id: number,
        toggle: (id: number) =>  Promise<unknown>
    ): Promise<void> => {
        const confirmed = await confirm({
            title: "Desativar Resumo",
            message: "Tem certeza que deseja desativar este resumo?"
        });
        if (!confirmed) return;

        await toggle(id);
        setSelectedId(null);
        showSuccess("Resumo desativado com sucesso.");
    };

    const handleReportSummary = async (
        id: number,
        reportSummary: (id: number) =>  Promise<unknown>
    ): Promise<void> => {
        const confirmed = await confirm({
            title: "Reportar Resumo",
            message: "Tem certeza que deseja reportar este resumo?"
        });
        if (!confirmed) return;

        await reportSummary(id);
        setSelectedId(null);
        showSuccess("Resumo reportado com sucesso.");
    };

    const handleBadge = async (
        id: number,
        hasBadge: boolean,
        assignBadge: (id: number) =>  Promise<unknown>,
        removeBadge: (id: number) =>  Promise<unknown>
    ): Promise<void> => {
        const confirmed = await confirm({
            title: hasBadge ? "Remover Crachá" : "Atribuir Crachá",
            message: `Tem certeza que deseja ${hasBadge ? "remover" : "atribuir"} este crachá?`
        });
        if (!confirmed) return;

        if (hasBadge) {
            await removeBadge(id);
            showSuccess("Crachá removido com sucesso.");
        } else {
            await assignBadge(id);
            showSuccess("Crachá atribuído com sucesso.");
        }

        setSelectedId(null);
    };

    return { handleDesactiveSummary, handleReportSummary, handleBadge };
};