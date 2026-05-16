import { useState, type ReactNode } from "react";
import Table, { type Column } from "../ui/Table";
import { CardStatics } from "../ui/cardStatics";
import { ArrowLeftRight } from "lucide-react";
import { ToggleText } from "../ui/toggleText";

export type AdminStatCard = {
    title: string;
    value: string;
    cor: "azul" | "verde" | "amarelo" | "vermelho";
}

type AdminCrudPageProps<T> = {
    title: string;
    description: string;
    stats: AdminStatCard[];
    columns: Column<T>[];
    data: T[];
    dataDesactivated: T[];
    rowKey: (row: T) => string | number;
    tableTitle: string;
    emptyPlaceholder?: ReactNode;
    primaryActionLabel?: string;
    onPrimaryAction?: () => void;
    children?: ReactNode;
    showTable?: boolean;
}

export function AdminCrudPage<T>({
    title,
    description,
    stats,
    columns,
    data,
    dataDesactivated,
    rowKey,
    tableTitle,
    emptyPlaceholder,
    primaryActionLabel,
    onPrimaryAction,
    children,
    showTable = true,
}: AdminCrudPageProps<T>) {
    const [isToggled, setIsToggled] = useState(false);
    const [desactivated, setDesactivated] = useState(false);
    const hasPrimaryAction = Boolean(primaryActionLabel);

    return (
        <main className="w-screen min-h-screen flex justify-center sm:pl-12 lg:pl-8 p-4">
            <div className="w-11/12 min-h-80 bg-white rounded-3xl shadow-[0_12px_30px_rgba(76,154,228,0.12)] grid grid-cols-12 gap-6 text-gray-800 p-6">
                <div className="col-span-12 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>

                    {hasPrimaryAction && (
                        <button
                            type="button"
                            className={`px-3 py-2 rounded-md text-white transition-colors ${
                                onPrimaryAction
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-300 cursor-not-allowed"
                            }`}
                            onClick={onPrimaryAction}
                            disabled={!onPrimaryAction}
                        >
                            {primaryActionLabel}
                        </button>
                    )}
                </div>

                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {stats.map((card) => (
                        <CardStatics key={card.title} title={card.title} value={card.value} cor={card.cor} />
                    ))}
                </div>

                {children && <div className="col-span-12">{children}</div>}

                {showTable && (
                    <div className="col-span-12 row-span-6 mt-4 bg-gray-50 p-4 rounded-lg">
                        <div className="w-full flex justify-between items-center gap-4 flex-wrap">
                            <h4 className="font-semibold mb-2">{
                                !desactivated ? `Lista de ${tableTitle}` : `Lista de ${tableTitle} desativados`
                            }</h4>

                            <button className="w-full sm:w-auto px-3 py-2 rounded-md relative" 
                                onMouseEnter={() => setIsToggled(true)}
                                onMouseLeave={() => setIsToggled(false)}
                                onClick={() => setDesactivated(!desactivated)}
                            >
                                <ToggleText className="-left-5 -top-6" text={desactivated ? "ativados" : "desativados"} active={isToggled} />
                                <ArrowLeftRight className="text-blue-500"/>
                             
                            </button>
                        </div>

                        <div className="w-full">
                            <Table
                                columns={columns}
                                data={desactivated ? dataDesactivated : data}
                                rowKey={rowKey}
                                emptyPlaceholder={emptyPlaceholder}
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}