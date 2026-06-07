export function EmailConfirmationStateAdm({
    email
}: {
    email: string;
}) {
    return (
       <div className="
            w-full
            max-w-2xl
            mx-auto
            rounded-2xl
            bg-white
            shadow-lg
            border border-slate-200
            p-8
        ">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    ✓
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                        Convite enviado
                    </h2>

                    <p className="text-sm text-slate-500">
                        O usuário deverá confirmar o cadastro através do email.
                    </p>
                </div>
            </div>

            <div className="
                bg-slate-50
                border
                border-slate-200
                rounded-xl
                px-4
                py-3
                text-slate-700
                break-all
            ">
                {email}
            </div>
        </div>
    );
}