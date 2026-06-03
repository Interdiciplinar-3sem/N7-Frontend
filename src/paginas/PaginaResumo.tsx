import { useOutletContext, useParams } from "react-router";
import {EditorContent } from "@tiptap/react";
import { GraduationCap, Heart } from "lucide-react";
import { useGetSummaryId } from "../http/summary/useGetSummaryId";
import { useSummaryEditor } from "../hooks/useEditorHook";
import { useEffect } from "react";
import type { ContextPropsType } from "../types/contextPropsType";

export function PaginaResumo() {
    const parentContext = useOutletContext<ContextPropsType>();
    const { id } = useParams();
    const { data, isPending, isError } = useGetSummaryId(id ?? "");
    const isOwner = parentContext.studentId === data?.studentId;

    const editor = useSummaryEditor();

    useEffect(() => {
        if (data?.conteudo) {
            editor?.commands.setContent(data.conteudo);
            editor?.setEditable(isOwner);
        }
    }, [data, editor]);

    return (
        <main className="min-h-screen bg-slate-100 py-10 px-4">
            {!isPending && !isError && (
                <div className=" mx-auto max-w-5xl space-y-6">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                            <GraduationCap className="h-4 w-4 text-sky-600" />
                            <span className="font-medium">{data?.materia}</span>
                        </div>

                        <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                            ID: {data?.summaryId}
                        </div>

                        {data?.totalCurtidas !== undefined && (
                            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                <Heart className="h-4 w-4 text-rose-500" />
                                <span>{data.totalCurtidas} curtidas</span>
                            </div>
                        )}

                        {typeof data?.reports === "number" && (
                            <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                                Denúncias: {data.reports}
                            </div>
                        )}
                    </div>

                    <section className="rounded-2xl bg-slate-200 p-6 shadow-inner">
                        <div
                            className="
                                mx-auto
                                w-full
                                max-w-[850px]
                                min-h-[80vh]
                                bg-white
                                rounded-md
                                shadow-lg
                                p-12
                            "
                        >
                            <EditorContent editor={editor} />
                        </div>
                    </section>

                </div>
            )}
        </main>
    )
}