
export function PaginaFeed() {
    const parentContext = useOutletContext<ContextPropsType>();
    const [activeTab, setActiveTab] = useState<"explorar" | "seguindo" | "ranking">("explorar");
    const {data: resumosFeed} = parentContext.role === 'ALUNO' ? useGetFeed(parentContext.id) : { data: undefined };
    const {data: resumosRanking} = useGetRanking(parentContext.id)
    const {data: resumos} = useGetAllSummary();
    const {data: following} = parentContext.role === 'ALUNO' ? useGetFollowing(parentContext.id) : { data: undefined };

    const resumosArray = activeTab === "explorar" ? resumos : activeTab === "seguindo" ? resumosFeed : resumosRanking;
    const items = resumosArray ?? [];
    
    return (
        
<div className="p-10 min-h-screen w-220  bg-gray-400 grid grid-cols-2 gap-4 font-mono ">
    <div className="p-5 bg-green-400 rounded-4xl max-h-70">
        <h1 className="titulo">Título do resumo</h1>
        <p className="descricao">Descrição do resumo</p>
    </div>

    <div className="p-5 bg-green-400 rounded-4xl max-h-70">
        <h1 className="titulo">Título do resumo</h1>
        <p className="descricao">Descrição do resumo</p>
    </div>

    <div className="p-5 bg-green-400 rounded-4xl max-h-70">
        <h1 className="titulo">Título do resumo</h1>
        <p className="descricao">Descrição do resumo</p>
    </div>

    <div className="p-5 bg-green-400 rounded-4xl max-h-70">
        <h1 className="titulo">Título do resumo</h1>
        <p className="descricao">Descrição do resumo</p>
    </div>

    <div className="p-5 bg-green-400 rounded-4xl max-h-70">
        <h1 className="titulo">Título do resumo</h1>
        <p className="descricao">Descrição do resumo</p>
    </div>

    <div className="p-5 bg-green-400 rounded-4xl max-h-70">
        <h1 className="titulo">Título do resumo</h1>
        <p className="descricao">Descrição do resumo</p>
    </div>
</div>

   )
}
