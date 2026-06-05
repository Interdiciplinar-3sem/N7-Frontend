export function EmailConfirmationState({
    email,
    onBack,
}: {
    email: string;
    onBack: () => void;
}) {
    return (
        <div className="flex flex-col items-center text-center gap-5 py-4">
            <div className="w-20 h-20 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                </svg>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white">Confirme seu e-mail</h2>
                <p className="text-white/70 mt-1 text-sm">Enviamos um link de confirmação para:</p>
            </div>

            <span className="bg-white/15 border border-white/25 rounded-xl px-5 py-2 text-white font-medium text-sm break-all">
                {email}
            </span>
            <div className="flex items-start gap-3 bg-yellow-400/10 border border-yellow-300/30 rounded-xl px-4 py-3 text-left max-w-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-white/80 text-sm leading-relaxed">
                    Não encontrou o e-mail? Verifique a pasta de{" "}
                    <span className="text-yellow-300 font-medium">spam ou lixo eletrônico</span>
                    {" "}— como usamos um serviço gratuito de envio, alguns provedores podem classificá-lo assim.
                </p>
            </div>
            <button
                onClick={onBack}
                className="mt-2 text-sm text-white/60 hover:text-white transition-colors duration-200 underline underline-offset-4"
            >
                ← Voltar para o início
            </button>
        </div>
    );
}