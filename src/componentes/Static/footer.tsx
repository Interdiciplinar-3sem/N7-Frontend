import { useState } from "react";
import { Github, House, Link as LinkIcon, LogInIcon, SheetIcon, SquareUser, User, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const equipe = [
    {
      "id": 1,
      "name": "José Vitor",
      "role": "Desenvolvedor Full-Stack",
      "description": "Fui responsável pelo backend em Java Spring Boot e pelo frontend React.js. Contribuí também com partes do design e da arquitetura geral da plataforma. Veja mais do meu trabalho no GitHub e LinkedIn.",
      "avatar": "/avatares/male-7.svg",
      "github": "https://github.com/devZevitor",
      "linkedin": "https://linkedin.com/in/zevitor",
      "highlight": true
    },
    {
      "id": 2,
      "name": "Ana Carolina",
      "role": "",
      "description": "",
      "avatar": "/avatares/female-2.svg",
      "github": "https://github.com/c44rolina",
      "linkedin": "",
      "highlight": false
    },
    {
      "id": 3,
      "name": "Daniel Romão",
      "role": "",
      "description": "",
      "avatar": "/avatares/male-3.svg",
      "github": "https://github.com/danielromaoo",
      "linkedin": "",
      "highlight": false
    },
    {
      "id": 4,
      "name": "Eduardo Coiato",
      "role": "",
      "description": "",
      "avatar": "/avatares/male-4.svg",
      "github": "https://github.com/duducoiato28",
      "linkedin": "",
      "highlight": false
    },
    {
      "id": 5,
      "name": "Gabriel Atenes",
      "role": "",
      "description": "",
      "avatar": "/avatares/male-5.svg",
      "github": "https://github.com/GabrielAtanes",
      "linkedin": "",
      "highlight": false
    },
    {
      "id": 6,
      "name": "Lucas Augusto",
      "role": "",
      "description": "",
      "avatar": "/avatares/male-6.svg",
      "github": "https://github.com/lucas013csr",
      "linkedin": "",
      "highlight": false
    },
    {
      "id": 7,
      "name": "Emilly Sophia",
      "role": "",
      "description": "",
      "avatar": "/avatares/female-7.svg",
      "github": "https://github.com/mmdoce",
      "linkedin": "",
      "highlight": false
    }
]

const footerAvatars = equipe.map((member) => member.avatar)

export function Footer() {
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)

    const selectedMember = equipe.find((member) => member.id === selectedMemberId) ?? null

    return (
        <footer className="w-full bg-[#F5F5F5] flex flex-col justify-center px-2">
            <div className="w-full bg-[linear-gradient(180deg,#a2cce2_0%,#8dc2dd_100%)] px-4 py-10 xs:px-6 sm:px-12 text-white">
                <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1.15fr_0.95fr]">
                    <div className="rounded-4xl border border-white/20 bg-white/10 p-6 shadow-[0_20px_50px_rgba(61,109,147,0.18)] backdrop-blur-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/80">Comunidade em foco</p>
                        <h3 className="mt-3 text-2xl font-black xs:text-3xl">Veja quem mantém a plataforma funcionando para você.</h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 font-semibold text-white/85">
                            Olá Somos estudantes da Fatec, apaixonados por criar um espaço onde o conhecimento flui de forma leve e colaborativa. Cuidamos da plataforma para que você possa se concentrar no que realmente importa: compartilhar e acessar resumos feitos por estudantes para estudantes. Junte-se a nós nessa jornada de aprendizado e colaboração!
                        </p>

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex -space-x-3">
                                {footerAvatars.map((avatar, index) => {
                                    const member = equipe[index]
                                    const isSelected = member?.id === selectedMemberId

                                    return (
                                        <button
                                            key={avatar}
                                            type="button"
                                            onClick={() => member && setSelectedMemberId(member.id)}
                                            className={`rounded-full transition ${isSelected ? 'scale-105 ring-4 ring-white/75' : 'hover:scale-105'}`}
                                            aria-label={member ? `Abrir card de ${member.name}` : 'Selecionar integrante da equipe'}
                                        >
                                            <img
                                                src={avatar}
                                                alt={member ? `Avatar de ${member.name}` : 'Avatar da comunidade'}
                                                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md"
                                            />
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#22486E] shadow-sm">
                                Clique em um avatar para ver o card do integrante
                            </div>
                        </div>

                        <div className="mt-6 rounded-4xl border border-white/25 bg-white/60 p-5 shadow-[0_18px_40px_rgba(61,109,147,0.16)] backdrop-blur-sm text-[#22486E]">
                            {!selectedMember ? (
                                <div className="flex items-center gap-3 text-[#22486E]">
                                    <UserRound className="h-5 w-5" />
                                    <p className="text-sm font-semibold">Clique em um avatar acima para abrir o card de um membro da equipe.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
                                    <img
                                        src={selectedMember.avatar}
                                        alt={`Avatar de ${selectedMember.name}`}
                                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                                    />

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4C9AE4]">Integrante selecionado</p>
                                            <h4 className="mt-1 text-2xl font-black text-[#22486E]">{selectedMember.name}</h4>
                                            {selectedMember.role && <p className="text-sm font-semibold text-[#4D667D]">{selectedMember.role}</p>}
                                        </div>

                                        {selectedMember.description ? (
                                            <p className="max-w-3xl text-sm leading-7 text-[#4D667D]">{selectedMember.description}</p>
                                        ) : (
                                            <p className="text-sm font-semibold text-[#4D667D]">Este integrante está representado aqui pela equipe da plataforma.</p>
                                        )}

                                        <div className="flex flex-wrap gap-3 text-sm font-semibold">
                                            {selectedMember.github && (
                                                <a
                                                    href={selectedMember.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-2 text-[#22486E] transition hover:bg-[#DCEEFF]"
                                                >
                                                    <Github className="h-4 w-4" />
                                                    GitHub
                                                </a>
                                            )}
                                            {selectedMember.linkedin && (
                                                <a
                                                    href={selectedMember.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full bg-[#FFF1D8] px-4 py-2 text-[#6D5600] transition hover:bg-[#FFE8BE]"
                                                >
                                                    <LinkIcon className="h-4 w-4" />
                                                    LinkedIn
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-6 text-center xxs:text-left sm:grid-cols-2 lg:grid-cols-1">
                        <div className="flex flex-col gap-1 rounded-[1.75rem] border border-white/25 bg-white/60 p-5 font-semibold text-lg xs:text-xl sm:text-2xl backdrop-blur-sm text-[#22486E] shadow-sm">
                            <h3 className="text-xl xs:text-2xl sm:text-3xl mb-1">Saiba mais:</h3>
                            <a className="flex items-center hover:underline" href="https://github.com/Interdiciplinar-3sem" target="_blank">
                                <Github className="inline h-4 w-4" />
                                <h3 className="ml-2 text-sm font-semibold text-[#22486E]">
                                    Repositório do projeto
                                </h3>
                            </a>
                        </div>
                        <div className="flex flex-col gap-1 rounded-[1.75rem] border border-white/25 bg-white/60 p-5 font-semibold text-lg xs:text-xl sm:text-2xl backdrop-blur-sm text-[#22486E] shadow-sm">
                            <div className="w-full flex items-center gap-2">
                                <House className="h-4 w-4" />
                                <Link className="hover:underline" to="/">Home</Link>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <LogInIcon className="h-4 w-4" />
                                <Link className="hover:underline" to="/login">Login</Link>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <Link className="hover:underline" to="/cadastro">Cadastro</Link>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <SquareUser className="h-4 w-4" />
                                <Link className="hover:underline" to="/perfil">Perfil</Link>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <SheetIcon className="h-4 w-4" />
                                <Link className="hover:underline" to="/feed">Feed</Link>
                            </div>
                        </div>

                    </div>
                </div>

                <p className="mt-10 text-center text-[#4C5C6D] text-lg xs:text-xl sm:text-3xl font-bold">
                    Copyright © 2026 Todos os direitos reservados
                </p>
            </div>
        </footer>
    )
}