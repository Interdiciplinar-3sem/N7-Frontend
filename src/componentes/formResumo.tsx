import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSummaryPost } from "../http/summary/usePostSummary";
import { useToast } from "../contexto/toastContext";

type FormResumoProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export function FormResumo({setIsFormOpen}: FormResumoProps) {

    const {mutateAsync: summaryPost, isPending} = useSummaryPost();
    const { showSuccess } = useToast();

    const formSchema = z.object({
        titulo: z.string().min(3, "O titulo deve ter ao menos 3 letras"),
        conteudo: z.string().min(50, "O resumo deve ter ao menos 50 letras")
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            titulo: "",
            conteudo: ""
        },
        resolver: zodResolver(formSchema)
    })

    const handdleForm = async (data: z.infer<typeof formSchema>) => {
       try {

            await summaryPost({
                titulo: data.titulo,
                conteudo: data.conteudo
            })

            showSuccess("Resumo criado com sucesso!");
            setIsFormOpen(false);
         console.log(data)
        } catch (error) {
         
        }
    }

    const handdleCloseBtn = () => {
        setIsFormOpen(false);
    }

    return (
       <form onSubmit={form.handleSubmit(handdleForm)}
            className="rounded-2xl bg-[#F6FAFF] p-4 sm:p-6 border border-[#D9E8F8] space-y-5 absolute z-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="space-y-2">
                <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="titulo">Titulo</label>
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
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="materia">Materia</label>
                    <input
                        className="w-full rounded-xl px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA] cursor-not-allowed opacity-60"
                        type="text"
                        id="materia"
                        placeholder="Atribua uma materia"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="tag">Tag</label>
                    <input
                        className="w-full rounded-xl bg-white px-3 py-2.5 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA] cursor-not-allowed opacity-60"
                        type="text"
                        id="tag"
                        placeholder="Palavra"
                        disabled
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-base sm:text-lg font-semibold text-[#22486E]" htmlFor="resumo">Resumo</label>
                <textarea
                    {...form.register("conteudo")}
                    className="w-full rounded-xl bg-white px-3 py-2.5 min-h-40 border border-[#C9DFF5] outline-none focus:ring-2 focus:ring-[#7AB4EA]"
                    id="resumo"
                    placeholder="Digite aqui"
                />
                  {form.formState.errors.conteudo && (
                    <p className="text-red-500 text-sm">{form.formState.errors.conteudo.message}</p>
                )}
            </div>
            <div className="flex flex-wrap gap-3">
                <button type="button" className="bg-[#F7EBA1] flex items-center justify-between px-3 gap-4 min-w-28 rounded-xl py-2 text-sm font-medium text-[#554A12] cursor-not-allowed opacity-60">
                    <span>Cor</span>
                    <span>V</span>
                </button>
                <button type="button" className="bg-[#BDEBFF] flex items-center justify-between px-3 gap-4 min-w-36 rounded-xl py-2 text-sm font-medium text-[#12415C] cursor-not-allowed opacity-60">
                    <span>Publico</span>
                    <span>V</span>
                </button>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
                <button type="reset" className="rounded-xl bg-gray-500 text-white px-4 py-2 text-sm font-semibold hover:brightness-95 transition">Reiniciar</button>
                <button type="submit" className="rounded-xl bg-[#2E77C2] text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition">
                 
                    {isPending ? "Carregando..." : "Criar resumo"}
                </button>
                <button onClick={() => handdleCloseBtn()} className="rounded-xl bg-[#9E1A1A] text-white px-5 py-2 text-sm font-semibold hover:brightness-95 transition ml-auto">Fechar</button>
            </div>
        </form>
    )
}