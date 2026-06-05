import { useEffect, useMemo, useState } from "react";
import { useGetAllTags } from "../../../http/tags/useGetAllTags"
import type { ResponseGetTagsType } from "../../../http/types/responseGetTagsType";

type TagFieldProps = {
    setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>,
    tags?: number[],
}

export const TagField = (props: TagFieldProps) => {
    const { data: tags } = useGetAllTags();
    const [isTagListOpen, setIsTagListOpen] = useState(false)
    const [tagSearch, setTagSearch] = useState("")
    const [selectedTags, setSelectedTags] = useState<{id: number; name: string}[]>([])
    const availableTags = (Array.isArray(tags) ? tags : [])
    const selectedTagIds = useMemo(() => new Set(selectedTags.map((tag) => tag.id)), [selectedTags])
    const filteredTags = useMemo(() => {
        const normalizedSearch = tagSearch.trim().toLowerCase()
        return availableTags.filter((tag) => {
            const tagName = String(tag.name ?? "").trim()
            const matchesSearch = normalizedSearch ? tagName.toLowerCase().includes(normalizedSearch) : true
            return matchesSearch && !selectedTagIds.has(tag.id)
        })
    }, [availableTags, selectedTagIds, tagSearch])

    useEffect(() => {
        props.setSelectedTagIds(selectedTagIds.size > 0 ? Array.from(selectedTagIds) : [])
    }, [selectedTagIds])

    useEffect(() => {
        if (!props.tags || !tags) return;

        const tagsToAdd = props.tags
            .map(tagId => availableTags.find((t) => t.id === tagId))
            .filter((tag): tag is ResponseGetTagsType => !!tag)
            .map(tag => ({ id: tag?.id ?? 0, name: String(tag?.name ?? "").trim() }))
            .filter(t => t.id && t.name);

        if (tagsToAdd.length === 0) return;

        setSelectedTags(prev => {
            const existingIds = new Set(prev.map(t => t.id));
            const newTags = tagsToAdd.filter(t => !existingIds.has(t.id));
            return [...prev, ...newTags];
        });
    }, [tags]);

    const addTagById = (tagId: number) => {
        if (!tagId) return
        const tag = availableTags.find((tag: ResponseGetTagsType) => tag?.id === tagId)
        if (!tag) return
        const id = tag?.id ?? 0
        const name = String(tag?.name ?? "").trim()
        if (!id || !name) return
        setSelectedTags(prev => {
            if (prev.some(t => t.id === id)) return prev
            return [...prev, { id, name }]
        })
        setTagSearch("")
        setIsTagListOpen(false)
    }

    const removeTag = (tagId: number) => {
        setSelectedTags(prev => prev.filter(t => t.id !== tagId))
    }

    return (
        <div>
            <input
                className="w-full rounded-xl bg-white px-3 py-2.5 pr-24 border border-[#C9DFF5] outline-none transition focus:ring-2 focus:ring-[#7AB4EA]"
                type="text"
                name="tag"
                id="tag"
                value={tagSearch}
                onFocus={() => setIsTagListOpen(true)}
                onChange={(e) => {
                    setTagSearch(e.target.value)
                    setIsTagListOpen(true)
                }}
                placeholder="Buscar ou adicionar tag"
            />

            <button
                type="button"
                onClick={() => setIsTagListOpen(!isTagListOpen)}
                className="ml-auto mt-2 rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 transition hover:bg-sky-200"
            >
                {isTagListOpen ? "Fechar" : "Ver tags"}
            </button>

            <div className="mt-3 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                    <span key={tag.id} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-800 shadow-sm">
                        <span>{tag.name}</span>
                        <button type="button" aria-label={`Remover tag ${tag.name}`} onClick={() => removeTag(tag.id)} className="rounded-full px-1 text-base font-bold leading-none text-sky-700 transition hover:bg-sky-100">×</button>
                    </span>
                ))}
            </div>

            {isTagListOpen && (
                <div className="fixed mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-slate-900/5">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                        <p className="text-sm font-semibold text-slate-700">Tags disponíveis</p>
                        <button type="button" onClick={() => setIsTagListOpen(false)} className="text-xs font-semibold text-slate-400 transition hover:text-slate-700">
                            Fechar
                        </button>
                    </div>
                    <div className="max-h-52 overflow-y-auto p-2">
                        {filteredTags.length > 0 ? (
                            filteredTags.map((tag) => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-sky-50 hover:text-sky-800"
                                    onClick={() => addTagById(tag.id)}
                                >
                                    <span>{tag.name}</span>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-slate-400">
                                Nenhuma tag encontrada.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}