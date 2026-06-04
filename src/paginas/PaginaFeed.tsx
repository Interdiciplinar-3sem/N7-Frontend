import { useState } from "react";
import { CardPerfil } from "../componentes/ui/cardPerfil";
import { CardResumo } from "../componentes/ui/cardResumo";
import { useOutletContext } from "react-router-dom";
import type { ContextPropsType } from "../types/contextPropsType";
import { useGetFeed } from "../http/feed/useGetFeed";
import { useGetRanking } from "../http/feed/useGetRanking";
import { useGetFollowingMe } from "../http/follow/useGetFollowingMe";
import { Link } from "react-router-dom";
import { useGetSummaryActivated } from "../http/summary/useGetSummaryActivated";
import { ViweSummary } from "../componentes/ViweSummary";

export function PaginaFeed() {
    const parentContext = useOutletContext<ContextPropsType>();
    const [activeTab, setActiveTab] = useState<"explorar" | "seguindo" | "ranking">("explorar");
    const {data: resumosFeed} = parentContext.role === 'ALUNO' ? useGetFeed(parentContext.id) : { data: undefined };
    const {data: resumosRanking} = useGetRanking(parentContext.id)
    const {data: resumos} = useGetSummaryActivated();
    const {data: following} = parentContext.role === 'ALUNO' ? useGetFollowingMe(parentContext.id) : { data: undefined };
    const [selectedResumoId, setSelectedResumoId] = useState<string | null>(null);

    const resumosArray = activeTab === "explorar" ? resumos : activeTab === "seguindo" ? resumosFeed : resumosRanking;
    const items = resumosArray ?? [];
    
    return (
        <main className="w-full h-full flex justify-around pt-16">
            <section className="lg:w-2/3 min-h-screen p-6 mb-20 sm:mb-0
                flex flex-col
            ">
                <div className="min-h-15 flex items-center justify-between mx-6 mb-6 bg-[#F8FAFC] shadow-lg rounded-lg">
                    <nav className="w-full">
                        <ul role="tablist" className="flex gap-2 p-2 text-sm items-center">
                            <li role="presentation">
                            </li>
                            <li role="presentation">
                                <button
                                    onClick={() => setActiveTab("explorar")}
                                    role="tab"
                                    aria-selected="false"
                                    className={`${activeTab === "explorar" && "bg-white shadow-sm"} px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 tracking-normal`}
                                >
                                    explorar
                                </button>
                                <button
                                    onClick={() => setActiveTab("seguindo")}
                                    role="tab"
                                    aria-selected="false"
                                    className={`${activeTab === "seguindo" && "bg-white shadow-sm"} px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 tracking-normal`}
                                >
                                    Seguindo
                                </button>
                            </li>
                            <li role="presentation">
                                <button
                                    onClick={() => setActiveTab("ranking")}
                                    role="tab"
                                    aria-selected="false"
                                    className={`${activeTab === "ranking" && "bg-white shadow-sm"} px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors`}
                                >
                                    Ranking
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                <section className={`
                    lg:w-full min-h-screen p-6 mb-20 sm:mb-0
                    sm:grid sm:grid-cols-2 flex flex-col sm:grid-flow-dense gap-8 grid-auto-rows-[180px]
                `}>
                    {items.length === 0 ? (
                        <div className="col-span-full text-center text-gray-400">
                            {activeTab === "explorar" && "Nosso sistema está vazio. Seja o primeiro a criar um resumo!"}
                            {activeTab === "seguindo" && "Você não está seguindo ninguém ainda."}
                            {activeTab === "ranking" && "Ainda não há resumos suficientes para aparecer no ranking."}
                        </div>
                    ) : (
                        items.map((resumo, index) => {
                            let formato:'quadrado' | 'horizontal' | 'vertical' = "quadrado";
                            if(index % 5 === 0) formato = "horizontal";
                            if(index % 5 === 3) formato = "vertical";

                            let cores:("verde" | "salmao" | "rosa" | "azul")[] = ["verde", "salmao", "rosa", "azul"]
                            let cor = cores[index % cores.length]

                            return (
                                <CardResumo key={resumo.summaryId} summaryId={resumo.summaryId} setViewSummary={setSelectedResumoId} titulo={resumo.titulo} texto={resumo.conteudo} formato={formato} cor={cor} imageUrl={resumo.studentUrl} studentName={resumo.studentNome} curtidas={resumo.totalCurtidas} />
                            )
                        })
                    )}

                    {items.length > 0 && items.length < 6 && Array.from({ length: 6 - items.length }).map((_, i) => {
                        const index = items.length + i;
                        let formato:'quadrado' | 'horizontal' | 'vertical' = "quadrado";
                        if(index % 5 === 0) formato = "horizontal";
                        if(index % 5 === 3) formato = "vertical";

                        return (
                            <CardResumo key={`ph-${i}`} summaryId={`ph-${i}`} setViewSummary={setSelectedResumoId} titulo={""} texto={""} formato={formato} cor={"invisivel" as any} invisivel={true} imageUrl={""} studentName={""}/>
                        )
                    })}

                </section>

                {selectedResumoId && (
                    <ViweSummary
                        id={selectedResumoId}
                        onClose={() => setSelectedResumoId(null)}
                    />
                )}
            </section>

            <section className={`hidden min-w-72 xl:w-96 lg:flex lg:flex-col gap-3`}>
                <div className="flex items-center justify-between gap-3">
                    <h2>Seguindo:</h2>
                </div>
                {following?.map((s: any) => {

                    return (
                        <CardPerfil key={s.studentId} studentId={s.studentId} className="" nome={s.name} seguidores={s.seguidores} semestre={s.semestre} url={s.studentUrl}/>
                    )
                })}
                {following && following.length >=10 && (
                    <div className="flex items-center justify-start gap-3">
                        <Link
                        to="/feed/students"
                        className="w-72 rounded-full border text-center border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                        >
                            ver +
                        </Link>
                    </div>
                )}
                 

                <div className="min-h-20 min-w-20 relative z-51 flex gap-1 text-xs">
                    
                      <a className="hover:underline" href="#">Sobre</a>
                      <h2>.</h2>
                      <a className="hover:underline">Ajuda</a>
                      <a className="hover:underline" href="#">Contato</a>
                      <h2>.</h2>
                      <a className="hover:underline">API</a>
                      <a className="hover:underline" href="#">Termos</a>
                      <h2>.</h2>
                      <a className="hover:underline">Privacidade</a>
              
                </div>
            </section>
        </main>
    )
}
