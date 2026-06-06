// src/componentes/previwer/TagPreviewDrawer.tsx
import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useGetTagById } from "../../http/tags/useGetTagById";
import { useUpdateTag } from "../../http/tags/useUpdateTag";

type TagPreviewDrawerProps = {
    id: number;
    onClose: () => void;
};

export function TagPreviewDrawer({ id, onClose }: TagPreviewDrawerProps) {
    const { data: tag, isPending } = useGetTagById(id);
    const { mutateAsync: updateTag, isPending: isUpdating } = useUpdateTag();
    const [tagName, setTagName] = useState("");

    useEffect(() => {
        if (tag) setTagName(tag.name);
    }, [tag]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tagName.trim()) return;
        try {
            await updateTag({ id, name: tagName });
            onClose();
        } catch (error) {
            // Tratado no hook via toast
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={onClose} />
            
            {/* Painel do Drawer */}
            <div className="fixed right-0 top-0 h-screen w-[400px] bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Editar Tag</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {isPending ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Carregando...
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                                    Identificador da Tag
                                </label>
                                <span className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                    ID: {id}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nome da Tag
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">#</span>
                                    <input
                                        type="text"
                                        value={tagName}
                                        onChange={(e) => setTagName(e.target.value)}
                                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                                        placeholder="Ex: calculo-1"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating || !tagName.trim()}
                            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-100 text-white disabled:text-gray-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                            Salvar Alterações
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}