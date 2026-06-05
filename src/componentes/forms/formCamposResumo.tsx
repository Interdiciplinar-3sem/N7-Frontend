    import type { UseFormReturn } from "react-hook-form";
    import { TagField } from "./fields/tagField";
    import type { ResponseGetCourseSubjectsType } from "../../http/types/responseGetCourseSubjects";

    type FormValues = {
        titulo: string;
        materiaId: number;
    };

    type SummaryFormProps = {
        form: UseFormReturn<FormValues>;
        subjects: ResponseGetCourseSubjectsType[] | undefined;
        tags: number[] | undefined;
        isPublic: boolean;
        isPending: boolean;
        isCreating: boolean;
        setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>;
        onSubmit: (data: FormValues) => Promise<void>;
        onDelete: () => Promise<void>;
        onVisibility: () => Promise<void>;
        className?: string;
    };

    export const SummaryFormFields = ({
        form,
        subjects,
        tags,
        isPublic,
        isPending,
        isCreating,
        setSelectedTagIds,
        onSubmit,
        onDelete,
        onVisibility,
        className = "",
    }: SummaryFormProps) => {
        return (
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`border border-[#D9E8F8] rounded-lg bg-[#F6FAFF]/70 p-4 sm:p-6 space-y-5 w-full ${className}`}
            >
                <div className="space-y-2">
                    <label className="text-lg font-semibold text-[#22486E]" htmlFor="titulo">
                        Titulo
                    </label>
                    <input
                        {...form.register("titulo")}
                        className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                        type="text"
                        id="titulo"
                        placeholder="Defina um titulo"
                    />
                    {form.formState.errors.titulo && (
                        <p className="text-red-500 text-sm">{form.formState.errors.titulo.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-lg font-semibold text-[#22486E]" htmlFor="materia">
                            Materia
                        </label>
                        <select
                            {...form.register("materiaId", { valueAsNumber: true })}
                            id="materia"
                            className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                        >
                            <option value="">Selecione uma matéria</option>
                            {subjects?.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                        {form.formState.errors.materiaId && (
                            <p className="text-red-500 text-sm">{form.formState.errors.materiaId.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-semibold text-[#22486E]">Tag</label>
                        <TagField setSelectedTagIds={setSelectedTagIds} tags={tags} />
                    </div>
                </div>

                <button
                    type="button"
                    className={`${isPublic ? "bg-[#BDEBFF]" : "bg-amber-300"} flex items-center justify-between px-3 gap-4 min-w-36 rounded-xl py-2 text-sm font-medium text-[#12415C] cursor-pointer transition hover:brightness-95`}
                    onClick={onVisibility}
                >
                    {isPublic ? "Público" : "Privado"}
                </button>

                <div className="flex flex-wrap gap-3 pt-1">
                    <button
                        type="submit"
                        className="rounded-xl bg-[#2E77C2] text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition"
                    >
                        {isPending ? "Carregando..." : isCreating ? "Criar resumo" : "Salvar resumo"}
                    </button>
                    {!isCreating && (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="rounded-xl bg-red-500 text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition"
                        >
                            Excluir Resumo
                        </button>
                    )}
                </div>
            </form>
        );
    };