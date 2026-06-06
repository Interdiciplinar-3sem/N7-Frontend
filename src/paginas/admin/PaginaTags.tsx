// src/paginas/admin/PaginaTags.tsx
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { Overlay } from "../../componentes/overlay";
import { useGetAllTags } from "../../http/tags/useGetAllTags"; 
import { useGetTagsDesactivated } from "../../http/tags/useGetAllTagsDesactivated"; 
import { useSoftDeleteTag } from "../../http/tags/useSoftDeleteTag";
import { useCreateTag } from "../../http/tags/usePostTag"; 
import { useAdminPreviewer } from "../../layout/layoutAdmin"; // Import do contexto global
import type { ResponseGetTagsType } from "../../http/types/responseGetTagsType"; 

export function PaginaTags() {
    const { openTag } = useAdminPreviewer(); // Função do contexto injetada
    const { data: activeTags, isPending } = useGetAllTags();
    const { data: inactiveTags } = useGetTagsDesactivated();
    const { mutateAsync: softDeleteTag } = useSoftDeleteTag();
    const { mutateAsync: createTag, isPending: isCreating } = useCreateTag();

    const [updatingTagId, setUpdatingTagId] = useState<number | null>(null);
    const [isPostForm, setIsPostForm] = useState(false);
    const [newTagName, setNewTagName] = useState("");

    const handleStatusUpdate = async (tagId: number) => {
        setUpdatingTagId(tagId);
        try {
            await softDeleteTag(tagId);
        } finally {
            setUpdatingTagId(null);
        }
    };

    const handleCreateTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTagName.trim()) return;
        try {
            await createTag(newTagName);
            setNewTagName("");
            setIsPostForm(false);
        } catch {
            // Tratado internamente no hook via toast
        }
    };

    const columns: Column<ResponseGetTagsType>[] = [
        {
            key: "nome",
            header: "Tag",
            width: "350px",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-sm shrink-0">
                        #{row.name.substring(0, 1).toLowerCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-medium text-gray-900 truncate">
                            {row.name}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter mt-0.5">
                            TAG ID: {row.id}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: "status",
            header: "Status",
            width: "150px",
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        row.ativo
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {row.ativo ? "Ativo" : "Inativo"}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Ações",
            width: "150px",
            align: "center",
            render: (row) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => handleStatusUpdate(row.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors w-28 text-center ${
                            row.ativo
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                        disabled={updatingTagId === row.id}
                    >
                        {updatingTagId === row.id
                            ? "..."
                            : row.ativo
                            ? "Desativar"
                            : "Ativar"}
                    </button>
                </div>
            ),
        },
    ];

    const totalTagsAtivas = isPending ? 0 : activeTags?.length ?? 0;
    const totalTagsInativas = inactiveTags?.length ?? 0;
    const totalGeral = totalTagsAtivas + totalTagsInativas;

    return (
        <>
            <AdminCrudPage
                title="Tags"
                description="Centralize as tags usadas para organizar e pesquisar conteúdos"
                primaryActionLabel="Nova tag"
                onPrimaryAction={() => setIsPostForm(true)}
                stats={[
                    { title: "Total de tags", value: isPending ? "..." : totalGeral.toString(), cor: "azul" },
                    { title: "Tags Ativas", value: isPending ? "..." : totalTagsAtivas.toString(), cor: "verde" },
                    { title: "Tags Inativas", value: totalTagsInativas.toString(), cor: "vermelho" },
                ]}
                columns={columns}
                data={activeTags ?? []}
                dataDesactivated={inactiveTags ?? []}
                rowKey={(row) => row.id}
                tableTitle="Lista de tags"
                emptyPlaceholder={
                    <div className="p-6 text-center text-gray-400">Nenhuma tag encontrada</div>
                }
                /* Adicionada a lógica para abrir o Drawer de Tags ao clicar na linha */
                onRowClick={(row) => openTag(row.id)}
            />

            {isPostForm && (
                <>
                    <Overlay />
                    <div className="fixed z-100 top-1/2 left-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-gray-900">Cadastrar Nova Tag</h4>
                            <button
                                className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors"
                                onClick={() => {
                                    setIsPostForm(false);
                                    setNewTagName("");
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTag} className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nome da Tag
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">#</span>
                                    <input
                                        type="text"
                                        value={newTagName}
                                        onChange={(e) => setNewTagName(e.target.value)}
                                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                                        placeholder="ex: anatomia-patologica"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isCreating || !newTagName.trim()}
                                className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-gray-100 disabled:text-gray-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                                Criar Tag
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}