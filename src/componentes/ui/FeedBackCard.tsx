export type EstadoFeedback =
    | { tipo: "carregando" }
    | { tipo: "sucesso" }
    | { tipo: "erro"; mensagem: string };

export function FeedbackCard({ estado, onVoltar }: { estado: EstadoFeedback; onVoltar: () => void }) {
    const config = {
        carregando: {
            icone: (
                <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            ),
            titulo: null,
            descricao: "Confirmando sua conta...",
            botao: false,
        },
        sucesso: {
            icone: (
                <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            ),
            titulo: "Conta confirmada!",
            descricao: "Redirecionando para o feed...",
            botao: false,
        },
        erro: {
            icone: (
                <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            ),
            titulo: "Ops, algo deu errado",
            descricao: estado.tipo === "erro" ? estado.mensagem : "",
            botao: true,
        },
    }[estado.tipo];

    return (
        <div className="flex flex-col items-center gap-5">
            {config.icone}
            {config.titulo && (
                <div>
                    <h2 className="text-xl font-bold text-white">{config.titulo}</h2>
                    <p className="text-white/70 text-sm mt-1">{config.descricao}</p>
                </div>
            )}
            {!config.titulo && (
                <p className="text-white/80 text-sm">{config.descricao}</p>
            )}
            {config.botao && (
                <button onClick={onVoltar}
                    className="mt-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors duration-200">
                    ← Voltar para o início
                </button>
            )}
        </div>
    );
}