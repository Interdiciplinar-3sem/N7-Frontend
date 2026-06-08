import {  MessageCircleMore, Palette, SquareMousePointer, UserRound } from "lucide-react";

export function HomeAbout() {
    const bioSamples = [
        'Estudando um passo por vez e compartilhando o que aprendo no caminho.',
        'Resumos simples, ideias claras e colaboração entre alunos.',
        'Aqui o aprendizado tem cor, forma e comunidade.'
    ]

    const avatarSamples = [
        '/avatares/default.svg',
        '/avatares/female-3.svg',
        '/avatares/male-4.svg',
        '/avatares/female-11.svg'
    ]

    return (
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-4xl border border-[#DDEBFA] bg-white p-3 shadow-[0_20px_50px_rgba(76,154,228,0.12)]">
                <div className="flex items-center gap-2 text-[#4C9AE4]">
                    <Palette className="h-5 w-5" />
                    <h3 className="text-xl font-black text-[#22486E]">Perfil com cara própria</h3>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                    <div className="flex flex-col justify-center rounded-3xl bg-[linear-gradient(180deg,#EFF7FF_0%,#DDF0FF_100%)] p-5">
                        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg">
                            <img src="/avatares/female-7.svg" alt="Avatar de perfil" className="h-full w-full rounded-full object-cover" />
                        </div>
                        <div className="mt-4 flex justify-center gap-2">
                            {avatarSamples.map((avatar) => (
                                <img key={avatar} src={avatar} alt="Avatar miniatura" className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm" />
                            ))}
                        </div>
                        <div className="mt-4 rounded-2xl bg-white/85 p-4 text-center shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4C9AE4]">Avatar</p>
                            <p className="mt-2 text-sm font-semibold text-[#22486E]">Escolha uma identidade visual que combine com seu perfil.</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-3xl border border-[#F0E4B6] bg-[#FFF9D8] p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-[#C08B00]">
                                <MessageCircleMore className="h-5 w-5" />
                                <h4 className="font-black text-[#6D5600]">Bios pré-disponibilizadas</h4>
                            </div>
                            <div className="mt-4 space-y-3">
                                {bioSamples.map((bio) => (
                                    <div key={bio} className="rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-[#5F5312] shadow-sm">
                                        {bio}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-[#D9E7D6] bg-[#F0FAF1] p-5 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F5E31]">Mensagem rápida</p>
                            <p className="mt-3 text-lg font-bold text-[#22486E]">Troque a bio sempre que quiser e destaque sua vibe no perfil.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-5">
                <div className="rounded-4xl border border-[#DDEBFA] bg-white p-5 shadow-[0_20px_50px_rgba(76,154,228,0.12)]">
                    <div className="flex items-center gap-2 text-[#4C9AE4]">
                        <SquareMousePointer className="h-5 w-5" />
                        <h3 className="text-xl font-black text-[#22486E]">Suporte e criação</h3>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-[#F7FBFF] p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4C9AE4]">Resumo</p>
                            <p className="mt-2 text-sm leading-6 text-[#4D667D]">Crie, publique e organize resumos com um clique.</p>
                        </div>

                        <div className="rounded-3xl bg-[#FFF8E3] p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C08B00]">Suporte ativo</p>
                            <p className="mt-2 text-sm leading-6 text-[#4D667D]">Há alguém cuidando da plataforma para que você tenha a melhor experiência possível.</p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-3xl border border-dashed border-[#CFE2F4] bg-[#F9FCFF] p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold text-[#22486E]">Manutenção contínua</p>
                                <p className="text-xs text-[#4D667D]">A plataforma é acompanhada por trás para continuar estável e útil.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-4xl border border-[#F1E4C4] bg-[#FFF8ED] p-5 shadow-[0_20px_50px_rgba(245,185,47,0.12)]">
                    <div className="flex items-center gap-2 text-[#C08B00]">
                        <UserRound className="h-5 w-5" />
                        <h3 className="text-xl font-black text-[#6D5600]">Feed com troca de conhecimento</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#5F5312]">
                        Curtir, seguir, encontrar resumos relevantes e aprender com outros estudantes também faz parte da experiência.
                    </p>
                </div>
            </div>
        </div>
    )
}