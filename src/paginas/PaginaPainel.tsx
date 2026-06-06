import { Link } from "react-router-dom";
import { User, PenBox, BookCopy, Tag, ArrowUpRight, Loader2, BookOpenIcon } from "lucide-react";
import { useAdminPreviewer } from "../layout/layoutAdmin";
import { useGetAllTags } from "../http/tags/useGetAllTags"; 
import { useGetCourses } from "../http/course/useGetCourse"; 
import { useGetUser } from "../http/user/useGetUser";
import { useGetAllSummary } from "../http/summary/useGetAllSummary";
import { Table, type Column } from "../componentes/ui/Table";
import { useGetAllSubjects } from "../http/subject/useGetAllSubjects";

export function PaginaPainel() {
    const { openTag, openUser, openSummary, openCourse, openSubject } = useAdminPreviewer();

    const { data: tags, isPending: loadingTags } = useGetAllTags();
    const { data: cursos, isPending: loadingCursos } = useGetCourses();
    const { data: usuarios, isPending: loadingUsuarios } = useGetUser();
    const { data: resumos, isPending: loadingResumos } = useGetAllSummary();
    const { data: materias, isPending: loadingMaterias } = useGetAllSubjects();

    const totalTags = tags?.length ?? 0;
    const totalCursos = cursos?.length ?? 0;
    const totalUsuarios = usuarios?.length ?? 0;
    const totalResumos = resumos?.length ?? 0;
    const totalMaterias = materias?.length ?? 0;
    const colunasTags: Column<any>[] = [
        {
            key: "name",
            header: "Nome",
            render: (tag) => <span className="font-medium text-gray-900 group-hover:text-cyan-600">#{tag.name}</span>
        },
        {
            key: "ativo",
            header: "Status",
            width: "96px",
            render: (tag) => (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${tag.ativo ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {tag.ativo ? 'Ativo' : 'Inativo'}
                </span>
            )
        }
    ];

    const colunasCursos: Column<any>[] = [
        {
            key: "name",
            header: "Curso",
            render: (curso) => <span className="font-medium text-gray-900">{curso.name}</span>
        },
        {
            key: "ativo",
            header: "Status",
            width: "96px",
            render: (curso) => (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${curso.ativo ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {curso.ativo ? 'Ativo' : 'Inativo'}
                </span>
            )
        }
    ];

    const colunasUsuarios: Column<any>[] = [
        {
            key: "email",
            header: "Nome / Email",
            render: (user) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px] shrink-0">
                        {user.email.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-blue-600 truncate">{user.email}</span>
                </div>
            )
        },
        {
            key: "role",
            header: "Papel",
            width: "112px",
            render: (user) => (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    user.role === "ADM" ? "bg-purple-100 text-purple-700" : user.role === "ALUNO" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                }`}>
                    {user.role}
                </span>
            )
        }
    ];

    const colunasResumos: Column<any>[] = [
        {
            key: "titulo",
            header: "Título",
            render: (r) => <span className="font-medium text-gray-900 group-hover:text-indigo-600 truncate">{r.titulo}</span>
        },
        {
            key: "ativo",
            header: "Status",
            width: "96px",
            render: (r) => (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${r.ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {r.ativo ? 'Ativo' : 'Desativado'}
                </span>
            )
        }
    ];

    const colunasMaterias: Column<any>[] = [
        {
            key: "name",
            header: "Nome da Matéria",
            render: (m) => <span className="font-medium text-gray-900 group-hover:text-amber-600 truncate">{m.name}</span>
        },
        {
            key: "semester",
            header: "Período",
            width: "96px",
            render: (m) => <span className="text-xs text-gray-500 font-medium">{m.semestre}º Semestre</span>
        }
    ];

    return (
        <div className="p-6 space-y-8 ml-25 min-h-screen bg-gray-50/50">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Administrative</h1>
                <p className="text-sm text-gray-500">Visão geral e controle rápido de todas as entidades do Techub.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Usuários</span>
                        <h3 className="text-2xl font-bold text-gray-900">{loadingUsuarios ? "..." : totalUsuarios}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><User size={20} /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Resumos</span>
                        <h3 className="text-2xl font-bold text-gray-900">{loadingResumos ? "..." : totalResumos}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><PenBox size={20} /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Cursos</span>
                        <h3 className="text-2xl font-bold text-gray-900">{loadingCursos ? "..." : totalCursos}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><BookCopy size={20} /></div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tags Criadas</span>
                        <h3 className="text-2xl font-bold text-gray-900">{loadingTags ? "..." : totalTags}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600"><Tag size={20} /></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Materias Criadas</span>
                        <h3 className="text-2xl font-bold text-gray-900">{loadingMaterias ? "..." : totalMaterias}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600"><Tag size={20} /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-[380px]">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <Tag size={18} className="text-cyan-600" />
                            <h2 className="font-semibold text-gray-900">Tags Recentes</h2>
                        </div>
                        <Link to="/painel/tags" className="text-xs font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5 group">
                            Gerenciar <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto min-h-0 border border-gray-100 rounded-xl">
                        {loadingTags ? (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm"><Loader2 className="animate-spin mr-2" size={16} /> Carregando...</div>
                        ) : (
                            <Table 
                                columns={colunasTags}
                                data={tags?.slice(0, 5) ?? []}
                                rowKey={(tag) => tag.id}
                                onRowClick={(tag) => openTag(tag.id)}
                                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhuma tag cadastrada.</div>}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-[380px]">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <BookCopy size={18} className="text-emerald-600" />
                            <h2 className="font-semibold text-gray-900">Cursos Disponíveis</h2>
                        </div>
                        <Link to="/painel/cursos" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 group">
                            Gerenciar <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto min-h-0 border border-gray-100 rounded-xl">
                        {loadingCursos ? (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm"><Loader2 className="animate-spin mr-2" size={16} /> Carregando...</div>
                        ) : (
                            <Table 
                                columns={colunasCursos}
                                data={cursos?.slice(0, 5) ?? []}
                                rowKey={(curso) => curso.id}
                                onRowClick={(curso) => openCourse(curso.id)}
                                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum curso cadastrado.</div>}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-[380px]">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <User size={18} className="text-blue-600" />
                            <h2 className="font-semibold text-gray-900">Últimos Usuários</h2>
                        </div>
                        <Link to="/painel/user" className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5 group">
                            Gerenciar <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto min-h-0 border border-gray-100 rounded-xl">
                        {loadingUsuarios ? (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm"><Loader2 className="animate-spin mr-2" size={16} /> Carregando...</div>
                        ) : (
                            <Table 
                                columns={colunasUsuarios}
                                data={usuarios?.slice(0, 5) ?? []}
                                rowKey={(user) => user.userId}
                                onRowClick={(user) => {
                                    if (user.role === "ALUNO" && user.studentId) {
                                        openUser(user.studentId);
                                    }
                                }}
                                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum usuário cadastrado.</div>}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-[380px]">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <PenBox size={18} className="text-indigo-600" />
                            <h2 className="font-semibold text-gray-900">Resumos Publicados</h2>
                        </div>
                        <Link to="/painel/resumos" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 group">
                            Gerenciar <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto min-h-0 border border-gray-100 rounded-xl">
                        {loadingResumos ? (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm"><Loader2 className="animate-spin mr-2" size={16} /> Carregando...</div>
                        ) : (
                            <Table 
                                columns={colunasResumos}
                                data={resumos?.slice(0, 5) ?? []}
                                rowKey={(r) => r.summaryId}
                                onRowClick={(r) => openSummary(r.summaryId)}
                                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum resumo encontrado.</div>}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-[380px] xl:col-span-2">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <BookOpenIcon size={18} className="text-amber-600" />
                            <h2 className="font-semibold text-gray-900">Matérias Cadastradas</h2>
                        </div>
                        <Link to="/painel/materias" className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-0.5 group">
                            Gerenciar <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto min-h-0 border border-gray-100 rounded-xl">
                        {loadingMaterias ? (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm"><Loader2 className="animate-spin mr-2" size={16} /> Carregando...</div>
                        ) : (
                            <Table 
                                columns={colunasMaterias}
                                data={materias ?? []}
                                rowKey={(m) => m.id}
                                onRowClick={(m) => openSubject(m.id)}
                                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhuma matéria cadastrada.</div>}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}