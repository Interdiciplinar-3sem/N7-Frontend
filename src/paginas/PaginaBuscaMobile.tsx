
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PaginaBuscaMobile() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen w-screen overflow-x-hidden bg-linear-to-b from-white via-[#F6F9FF] to-[#EAF1FF] px-4 py-6 flex items-start justify-center">
            <section className="relative w-full max-w-md rounded-2xl border border-black/5 bg-white/90 p-4 shadow-lg shadow-black/5 backdrop-blur-sm">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Cancelar busca"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-black/70 transition hover:bg-black/5 hover:text-black"
                >
                    <X className="h-5 w-5" />
                </button>

                <form className="mt-8 flex gap-2" onSubmit={(event) => event.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="min-w-0 flex-1 rounded-xl border border-black/10 bg-[#F8F8F6] px-4 py-3 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#4C9AE4] focus:ring-2 focus:ring-[#4C9AE4]/20"
                    />

                    <button
                        type="submit"
                        className="rounded-xl bg-[#4C9AE4] px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4C9AE4]/30 transition hover:brightness-95 active:scale-[0.98]"
                    >
                        Buscar
                    </button>
                </form>
            </section>
        </main>
    )
}