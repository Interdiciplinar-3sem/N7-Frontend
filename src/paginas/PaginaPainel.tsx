
import { useNavigate } from "react-router-dom";
import { Bookmark, User, BookCopy, BookOpenIcon, Tag, Badge, Database, ArrowRight } from "lucide-react";

export function PaginaPainel() {
    const navigate = useNavigate();

    const tables = [
        {
            id: "usuarios",
            label: "Usuários",
            description: "Gerencie todos os usuários e estudantes",
            icon: <User className="h-12 w-12" />,
            path: "/painel/user",
            color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
            iconColor: "text-blue-600"
        },
        {
            id: "resumos",
            label: "Resumos",
            description: "Administre resumos e conteúdos",
            icon: <Bookmark className="h-12 w-12" />,
            path: "/painel/resumos",
            color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
            iconColor: "text-purple-600"
        },
        {
            id: "cursos",
            label: "Cursos",
            description: "Organize e gerencie os cursos disponíveis",
            icon: <BookCopy className="h-12 w-12" />,
            path: "/painel/cursos",
            color: "bg-green-50 hover:bg-green-100 border-green-200",
            iconColor: "text-green-600"
        },
        {
            id: "materias",
            label: "Matérias",
            description: "Administre as matérias e disciplinas",
            icon: <BookOpenIcon className="h-12 w-12" />,
            path: "/painel/materias",
            color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
            iconColor: "text-orange-600"
        },
        {
            id: "tags",
            label: "Tags",
            description: "Gerencie tags e categorias",
            icon: <Tag className="h-12 w-12" />,
            path: "/painel/tags",
            color: "bg-red-50 hover:bg-red-100 border-red-200",
            iconColor: "text-red-600"
        },
        {
            id: "selos",
            label: "Selos",
            description: "Administre selos e emblemas",
            icon: <Badge className="h-12 w-12" />,
            path: "/painel/selos",
            color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
            iconColor: "text-pink-600"
        },
    ];

    return (
        <main className="px-16 w-full min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="w-full p-6 md:p-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="h-8 w-8 text-gray-700" />
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Painel de Controle</h1>
                    </div>
                    <p className="text-gray-600 text-lg">Acesse todas as tabelas do banco de dados do sistema</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tables.map((table) => (
                        <button
                            key={table.id}
                            onClick={() => navigate(table.path)}
                            className={`p-6 rounded-lg border-2 transition-all duration-300 text-left group ${table.color}`}
                        >
                            {/* Card Icon */}
                            <div className={`${table.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                {table.icon}
                            </div>

                            {/* Card Title */}
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {table.label}
                            </h2>

                            {/* Card Description */}
                            <p className="text-gray-600 text-sm mb-4">
                                {table.description}
                            </p>

                            {/* Card Action */}
                            <div className="flex items-center text-sm font-medium text-gray-700 group-hover:translate-x-2 transition-transform duration-300">
                                <span>Acessar</span>
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Resumo do Sistema</h3>
                    <div className="flex justify-start gap-16 px-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">6</div>
                            <p className="text-sm text-gray-600">Tabelas</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">Ativo</div>
                            <p className="text-sm text-gray-600">Status</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">v1.0</div>
                            <p className="text-sm text-gray-600">Versão</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
    
}