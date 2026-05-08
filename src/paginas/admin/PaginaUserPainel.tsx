import { CardStatics } from "../../componentes/ui/cardStatics"
import { useGetUser } from "../../http/user/useGetUser"
import Table from "../../componentes/ui/Table"
import { useState } from "react"
import { StudentForm } from "../../componentes/admin/studentForm";
import { ADMform } from "../../componentes/admin/admForm";

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
   
    return (
        <main className="w-screen min-h-screen flex justify-center pl-8 p-4">
            <div className="w-11/12 min-h-80 bg-white rounded-3xl shadow-[0_12px_30px_rgba(76,154,228,0.12)]
                grid grid-cols-12 gap-6 text-gray-800 p-6
            ">
                <div className="col-span-12 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                        <p className="text-sm text-gray-500">Gerencie usuários e recursos do sistema</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-3 py-2 bg-blue-600 text-white rounded-md" onClick={() => setIsPostForm(true)}>
                            Novo Usuário
                        </button>
                    </div>
                </div>

                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <CardStatics title="Total de usuários" value={totalUsers.toString()} cor="azul"/>
                    <CardStatics title="Estudantes" value={totalStudent?.estudantes.toString() ?? "0"} cor="verde" />
                    <CardStatics title="ADM" value={totalAdmin?.adm.toString() ?? "0"} cor="amarelo" />
                    <CardStatics title="Resumos publicados" value="0" cor="vermelho" />
                </div>

                {!isPostForm && (
                    <div className="col-span-12 row-span-6 mt-4 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Lista de usuários</h4>
                        <div className="w-full">
                            <Table
                                columns={[
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
                                            <div className="flex gap-2 justify-center">
                                                <button className="px-2 py-1 bg-yellow-500 text-white rounded-sm">Editar</button>
                                                <button className="px-2 py-1 bg-red-500 text-white rounded-sm">Remover</button>
                                            </div>
                                        )
                                    }
                                ]}
                                data={data ?? []}
                                rowKey={(r: any) => r.userId}
                                emptyPlaceholder={<div className="p-6 text-center text-gray-400">Nenhum usuário encontrado</div>}
                            />
                        </div>
                    </div>
                )}

                 {isPostForm && (
                    <div className="col-span-12 row-span-6 mt-4 bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-col items-center w-full h-full relative p-4">
                            <button className="absolute right-0 top-0 mb-4 px-3 py-2 bg-gray-300 text-gray-700 rounded-md" 
                                onClick={() => {
                                    setIsPostForm(false) 
                                    setUserRole("")
                                }
                            }> 
                                Voltar para lista
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


            </div>
        </main>
    )
}