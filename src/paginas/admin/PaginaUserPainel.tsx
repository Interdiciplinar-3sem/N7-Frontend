import { useGetUser } from "../../http/user/useGetUser"
import { useState } from "react"
import { StudentForm } from "../../componentes/admin/studentForm";
import { ADMform } from "../../componentes/admin/admForm";
import { X } from "lucide-react";
import { AdminCrudPage } from "../../componentes/admin/AdminCrudPage";
import type { Column } from "../../componentes/ui/Table";

export function PaginaUserPainel() {


    const [isPostForm, setIsPostForm] = useState(false);
    const [userRole, setUserRole] = useState<"ALUNO" | "ADM" | "PROFESSOR" | "">("")
    const { data, isPending} = useGetUser()

    const totalUsers = isPending ? "carregando..." : data?.length ?? 0
    const totalStudent = isPending ? { estudantes: "carregando..." } : data?.reduce(
        (acc, user) => ({ estudantes: acc.estudantes + (user.role === "ALUNO" ? 1 : 0) }),
        { estudantes: 0 }
    )

    const totalAdmin = isPending ? { adm: "carregando..." } : data?.reduce(
        (acc, user) => ({adm: acc.adm + (user.role === "ADM" ? 1 : 0)}),
        {adm: 0}
    )

    const columns: Column<any>[] = [
        { key: 'userId', header: 'ID', width: '180px' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Role', width: '120px' },
        { key: 'createdAt', header: 'Criado em', width: '160px', render: (row: any) => new Date(row.createdAt).toLocaleString() },
        {
            key: 'actions',
            header: 'Ações',
            width: '180px',
            align: 'center',
            render: (row: any) => (
                <div>
                    {row.role === "ALUNO" && (
                    <div className="flex gap-2 justify-center">
                        <button className="px-2 py-1 bg-gray-300 text-white rounded-sm cursor-not-allowed" disabled>Editar</button>
                        <button onClick={() => {}} className="px-2 py-1 bg-yellow-500 text-white rounded-sm">Desativar</button>
                    </div>
                    )}
                    {row.role === "ADM" && (
                    <div className="flex gap-2 justify-center">
                        <button className="px-2 py-1 bg-gray-300 text-white rounded-sm cursor-not-allowed" disabled>Editar</button>
                        <button className="px-2 py-1 bg-gray-300 text-white rounded-sm cursor-not-allowed" disabled>Remover</button>
                    </div>
                    )}
                </div>
            )
        }
    ]
    
   
    return (
        <AdminCrudPage
            title="Admin Dashboard"
            description="Gerencie usuários e recursos do sistema"
            stats={[
                { title: "Total de usuários", value: totalUsers.toString(), cor: "azul" },
                { title: "Estudantes", value: totalStudent?.estudantes.toString() ?? "0", cor: "verde" },
                { title: "ADM", value: totalAdmin?.adm.toString() ?? "0", cor: "amarelo" },
                { title: "Resumos publicados", value: "0", cor: "vermelho" },
            ]}
            columns={columns}
            data={data ?? []}
            rowKey={(r: any) => r.userId}
            tableTitle="Lista de usuários"
            emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum usuário encontrado</div>}
            primaryActionLabel="Novo Usuário"
            onPrimaryAction={() => setIsPostForm(true)}
            showTable={!isPostForm}
        >
            {isPostForm && (
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col items-center w-full h-full relative p-4">
                        <button
                            className="ml-auto mb-4 p-1 bg-gray-300 text-gray-700 rounded-md"
                            onClick={() => {
                                setIsPostForm(false)
                                setUserRole("")
                            }}
                        >
                            <X size={16} />
                        </button>
                        <h4 className="font-semibold mb-2">Formulário de criação de usuário</h4>

                        {userRole === "" && (
                            <div className="flex justify-between h-full w-full gap-8 p-4 max-h-40">
                                <div className="w-full h-full flex-1 bg-red-900/50 rounded-2xl shadow-2xl flex justify-center items-center">
                                    <button className="px-3 py-2 text-white rounded-md" onClick={() => setUserRole("ALUNO")}>
                                        Criar aluno
                                    </button>
                                </div>
                                <div className="flex-1 bg-green-900/50 rounded-2xl shadow-2xl flex justify-center items-center">
                                    <button className="w-full h-full px-3 py-2 text-white rounded-md" onClick={() => setUserRole("ADM")}>
                                        Criar ADM
                                    </button>
                                </div>

                                <div className="flex-1 bg-blue-900/50 rounded-2xl shadow-2xl flex justify-center items-center">
                                    <button className="w-full h-full px-3 py-2 text-white rounded-md" onClick={() => setUserRole("PROFESSOR")}>
                                        Criar professor
                                    </button>
                                </div>
                            </div>
                        )}

                        {userRole === "ALUNO" && (
                            <StudentForm setIsPostForm={setIsPostForm} setUserRole={setUserRole} />
                        )}

                        {userRole === "ADM" && (
                            <div>
                                <ADMform setIsPostForm={setIsPostForm} setUserRole={setUserRole} />
                            </div>
                        )}
                        {userRole === "PROFESSOR" && (
                            <div>
                                form professor
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminCrudPage>
    )
}