import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Smartphone, Info } from "lucide-react";

const LAST_UPDATED = "junho de 2026";
const PLATFORM_NAME = "Resumify";
const CONTACT_EMAIL = "resumify@gmail.com";

export function PaginaTermos() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#F5F5F5]">
            <div className="bg-gradient-to-br from-[#78a3ff]/70 via-[#286fbd]/90 to-[#78a3ff]/70 px-4 sm:px-6 py-8 sm:py-10">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors mb-5"
                    >
                        <ArrowLeft className="w-4 h-4 shrink-0" />
                        Voltar
                    </button>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 bg-amber-400/20 border border-amber-400/40 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                            <AlertTriangle size={10} strokeWidth={2.5} />
                            VERSÃO BETA
                        </span>
                        <span className="text-white/50 text-[11px]">
                            Plataforma em fase de testes — instabilidades podem ocorrer
                        </span>
                    </div>

                    <div className="mb-1">
                        <span className="text-2xl sm:text-3xl font-bold text-white">Resumi</span>
                        <span className="text-2xl sm:text-3xl font-bold text-[#aac9f7]">FY</span>
                    </div>
                    <h1 className="text-xl sm:text-3xl font-bold text-white leading-tight">
                        Termos de Uso & Política de Privacidade
                    </h1>
                    <p className="text-white/60 text-xs sm:text-sm mt-2">
                        Última atualização: {LAST_UPDATED}
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
                    <Smartphone size={18} strokeWidth={1.75} className="text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                        <p className="text-amber-800 text-xs font-semibold">Usuários de iPhone</p>
                        <p className="text-amber-700 text-xs leading-relaxed">
                            O Safari no iOS pode bloquear cookies de sessão em certos contextos. Quando isso ocorre, a plataforma utiliza um método alternativo para manter sua sessão ativa, porém com <strong>nível de segurança reduzido</strong>. Este modo não é recomendado. Bugs visuais e de comportamento também podem ocorrer neste ambiente. Estamos trabalhando para melhorar a compatibilidade.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10">

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">1. Sobre a Plataforma</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        O <strong>{PLATFORM_NAME}</strong> é uma plataforma acadêmica desenvolvida por alunos da <strong>Fatec Itaquera</strong> como projeto interdisciplinar do curso de Desenvolvimento de Sistemas Multiplataforma (DSM). Seu objetivo é facilitar o compartilhamento de resumos e materiais de estudo entre estudantes e professores da mesma instituição.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
                        <AlertTriangle size={14} strokeWidth={2} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-amber-800 text-xs leading-relaxed">
                            <strong>Versão Beta:</strong> a plataforma está em fase de desenvolvimento e testes. Funcionalidades podem ser alteradas ou apresentar comportamentos inesperados. Não é recomendado armazenar conteúdos críticos sem backup externo. O serviço pode ser descontinuado ou alterado a qualquer momento sem aviso prévio.
                        </p>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">2. Aceitação dos Termos</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Ao criar uma conta e utilizar o {PLATFORM_NAME}, você declara que leu, entendeu e concorda com estes Termos de Uso. Caso não concorde com qualquer cláusula, não utilize a plataforma.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">3. Cadastro e Conta</h2>
                    <ul className="text-[#4D667D] text-sm leading-7 list-disc list-inside space-y-1.5">
                        <li>O cadastro é restrito a e-mails institucionais válidos da Fatec.</li>
                        <li>Você é responsável por manter a confidencialidade da sua senha.</li>
                        <li>Não é permitido criar contas falsas, duplicadas ou em nome de terceiros.</li>
                        <li>A equipe do {PLATFORM_NAME} nunca solicitará sua senha por qualquer canal.</li>
                        <li>Contas suspeitas de uso malicioso podem ser suspensas sem aviso prévio.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">4. Conduta e Responsabilidade sobre o Conteúdo</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Ao publicar qualquer conteúdo no {PLATFORM_NAME} — resumos, comentários, bio ou qualquer outro material — você assume <strong>total responsabilidade</strong> pelo que publica. É estritamente proibido:
                    </p>
                    <ul className="text-[#4D667D] text-sm leading-7 list-disc list-inside space-y-1.5">
                        <li>Publicar conteúdo ofensivo, discriminatório, racista, homofóbico, misógino ou que incite ódio contra qualquer grupo.</li>
                        <li>Publicar material pornográfico, violento ou impróprio para ambiente acadêmico.</li>
                        <li>Assediar, ameaçar ou constranger outros usuários.</li>
                        <li>Publicar informações falsas ou enganosas com intenção de prejudicar terceiros.</li>
                        <li>Reproduzir material protegido por direitos autorais sem autorização ou referência.</li>
                        <li>Utilizar a plataforma para fins comerciais, spam ou distribuição de malware.</li>
                        <li>Tentar burlar mecanismos de segurança, autenticação ou moderação da plataforma.</li>
                    </ul>
                    <div className="bg-[#FFF3CD] border border-[#FFCC00]/50 rounded-xl px-4 py-3 flex gap-3">
                        <Info size={14} strokeWidth={2} className="text-[#856404] shrink-0 mt-0.5" />
                        <p className="text-[#856404] text-xs leading-relaxed">
                            <strong>Responsabilidade compartilhada:</strong> a moderação é feita pelos administradores, mas depende da colaboração de todos os usuários. Ao identificar conteúdo impróprio, utilize a função de denúncia. Conteúdos que violem estas regras serão removidos e os responsáveis poderão ser banidos permanentemente.
                        </p>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">5. Propriedade Intelectual</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Os resumos e materiais publicados pertencem aos seus respectivos autores. Ao publicar no {PLATFORM_NAME}, você concede à plataforma uma licença não exclusiva para exibir e distribuir o conteúdo para outros usuários cadastrados. Essa licença se encerra quando o conteúdo é removido pelo autor.
                    </p>
                    <p className="text-[#4D667D] text-sm leading-7">
                        O código-fonte da plataforma, logotipos e identidade visual são propriedade da equipe desenvolvedora.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">6. Cookies e Autenticação</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Utilizamos cookies seguros para gerenciar sua sessão de forma protegida. Esses cookies:
                    </p>
                    <ul className="text-[#4D667D] text-sm leading-7 list-disc list-inside space-y-1.5">
                        <li>Contêm apenas um token de sessão criptografado — nenhum dado pessoal é armazenado diretamente.</li>
                        <li>Expiram automaticamente ao encerrar a sessão ou após período de inatividade.</li>
                        <li>São utilizados exclusivamente para fins de autenticação.</li>
                    </ul>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
                        <AlertTriangle size={14} strokeWidth={2} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-amber-800 text-xs leading-relaxed">
                            <strong>Modo alternativo:</strong> em dispositivos que bloqueiam cookies, a plataforma utiliza um método alternativo para manter a sessão ativa. Este modo possui <strong>nível de segurança reduzido e não é recomendado</strong>. Para maior proteção, utilize um navegador com suporte a cookies habilitado.
                        </p>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">7. Google Analytics</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Com seu consentimento, utilizamos o <strong>Google Analytics</strong> para coletar dados anônimos de uso, como páginas visitadas e tempo de navegação. Isso nos ajuda a identificar melhorias.
                    </p>
                    <ul className="text-[#4D667D] text-sm leading-7 list-disc list-inside space-y-1.5">
                        <li>O endereço IP é anonimizado antes do processamento.</li>
                        <li>Nenhum dado identificável (nome, e-mail, matrícula) é enviado ao Google Analytics.</li>
                        <li>Você pode recusar o Analytics — isso não afeta o funcionamento da plataforma.</li>
                        <li>
                            Dados tratados conforme a{" "}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2d5be3] underline underline-offset-2">
                                Política de Privacidade do Google
                            </a>{" "}e a{" "}
                            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#2d5be3] underline underline-offset-2">
                                página de parceiros do Google
                            </a>.
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">8. Proteção de Dados (LGPD)</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei 13.709/2018)</strong>, você tem direito a:
                    </p>
                    <ul className="text-[#4D667D] text-sm leading-7 list-disc list-inside space-y-1.5">
                        <li>Acessar os dados que temos sobre você.</li>
                        <li>Solicitar a correção de dados incorretos.</li>
                        <li>Solicitar a exclusão da sua conta e dos seus dados.</li>
                        <li>Revogar o consentimento para uso de Analytics a qualquer momento.</li>
                    </ul>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Para exercer qualquer um desses direitos, entre em contato pelo e-mail{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2d5be3] underline underline-offset-2 break-all">
                            {CONTACT_EMAIL}
                        </a>.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">9. Limitação de Responsabilidade</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        O {PLATFORM_NAME} é um projeto acadêmico fornecido "como está", sem garantia de disponibilidade contínua. A equipe não se responsabiliza por:
                    </p>
                    <ul className="text-[#4D667D] text-sm leading-7 list-disc list-inside space-y-1.5">
                        <li>Conteúdo publicado por usuários que viole direitos de terceiros.</li>
                        <li>Perda de dados por falha técnica ou descontinuação da plataforma.</li>
                        <li>Danos decorrentes do uso indevido da plataforma por terceiros.</li>
                        <li>Comportamentos inesperados em dispositivos iOS/Safari durante a fase beta.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#22486E]">10. Alterações nestes Termos</h2>
                    <p className="text-[#4D667D] text-sm leading-7">
                        Estes termos podem ser atualizados a qualquer momento. A data de última atualização sempre ficará visível no topo desta página. O uso continuado da plataforma após alterações implica aceitação dos novos termos.
                    </p>
                </section>

                <section className="bg-white border border-[#D9E8F8] rounded-2xl px-4 sm:px-5 py-4 sm:py-5 space-y-2">
                    <h2 className="text-base font-bold text-[#22486E]">Dúvidas ou solicitações?</h2>
                    <p className="text-[#4D667D] text-sm">
                        Entre em contato com a equipe pelo e-mail{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2d5be3] font-medium underline underline-offset-2 break-all">
                            {CONTACT_EMAIL}
                        </a>.
                    </p>
                </section>

                <p className="text-center text-[#4D667D]/50 text-xs pb-6">
                    © {new Date().getFullYear()} {PLATFORM_NAME} — Projeto acadêmico Fatec Itaquera · DSM
                </p>
            </div>
        </main>
    );
}