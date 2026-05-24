import { useState } from "react";
import { CardPerfil } from "../componentes/ui/cardPerfil";
import { CardResumo } from "../componentes/ui/cardResumo";
import { useOutletContext } from "react-router-dom";
import type { ContextPropsType } from "../types/contextPropsType";
import { useGetFeed } from "../http/feed/useGetFeed";
import { useGetAllSummary } from "../http/summary/useGetAllSummary";
import { useGetRanking } from "../http/feed/useGetRanking";

export function PaginaFeed() {
    const seguindo = [
        {
            id: "1",
            nome: 'Fulano',
            semestre: 4,
            seguidores: 900,
        },
        {
            id: "2",
            nome: 'Cliclano',
            semestre: 6,
            seguidores: 400,
        },
        {
            id: "3",
            nome: 'Fulano',
            semestre: 4,
            seguidores: 900,
        },
        {
            id: "4",
            nome: 'Cliclano',
            semestre: 6,
            seguidores: 400,
        }
    ]

    const parentContext = useOutletContext<ContextPropsType>();
    const [activeTab, setActiveTab] = useState<"explorar" | "seguindo" | "ranking">("explorar");
    const {data: resumosFeed} = useGetFeed(parentContext.id);
    const {data: resumosRanking} = useGetRanking(parentContext.id);
    const {data: resumos} = useGetAllSummary();

    const resumosArray = activeTab === "explorar" ? resumos : activeTab === "seguindo" ? resumosFeed : resumosRanking;
    
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
                
                <section className="
                    lg:w-full min-h-screen p-6 mb-20 sm:mb-0
                    sm:grid sm:grid-cols-2 flex flex-col sm:grid-flow-dense gap-8 grid-auto-rows-[180px]
                    
                ">
                    {resumosArray?.map((resumo, index) => {
                        let formato:'quadrado' | 'horizontal' | 'vertical' = "quadrado";
                        if(index % 5 === 0) formato = "horizontal";
                        if(index % 5 === 3) formato = "vertical";

                        let cores:("verde" | "salmao" | "rosa" | "azul")[] = ["verde", "salmao", "rosa", "azul"]
                        let cor = cores[index % cores.length]

                        console.log("url:", resumo.studentUrl)
                        return (
                            <CardResumo key={resumo.summaryId} titulo={resumo.titulo} texto={resumo.conteudo} formato={formato} cor={cor} imageUrl={resumo.studentUrl} studentName={resumo.studentNome}/>
                        )
                    })}
                    
                    {resumosArray?.length === 0 || resumosArray === undefined && (
                        <div className="col-span-full text-center text-gray-400">
                            {activeTab === "explorar" && "Nosso sistema está vazio. Seja o primeiro a criar um resumo!"}
                            {activeTab === "seguindo" && "Você não está seguindo ninguém ainda."}
                            {activeTab === "ranking" && "Ainda não há resumos suficientes para aparecer no ranking."}
                        </div>
                    )}

                    

                </section>
            </section>

            <section className={`hidden min-w-72 xl:w-96 lg:flex lg:flex-col gap-3`}>
                <CardPerfil className="" nome="SeuNome" seguidores={30} semestre={2}/>

                <h2>Seguindo: </h2>
                {seguindo.map((s) => {

                    return (
                        <CardPerfil key={s.id} className="" nome={s.nome} seguidores={s.seguidores} semestre={s.semestre}/>
                    )
                })}

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
