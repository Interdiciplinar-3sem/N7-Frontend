import { useGetUser } from "../../http/user/useGetUser";
import { useState } from "react";
import { StudentForm } from "../../componentes/admin/adminStudentForm";
import { ADMform } from "../../componentes/admin/admForm";
import { X } from "lucide-react";
import { AdminCrudPage } from "../../componentes/admin/adminCrudPage";
import type { Column } from "../../componentes/ui/Table";
import { useUpdateActiveStudent } from "../../http/student/StudentUpdateStatus";
import { useGetUserDesactivated } from "../../http/user/useGetUserDesactivated";
import { StudentEditForm } from "../../componentes/admin/adminStudentEditForm";
import type { ResponseGetUserType } from "../../http/types/responseGetUserType";
import { Overlay } from "../../componentes/overlay";
import { useAdminPreviewer } from "../../layout/layoutAdmin";

type UserRow = ResponseGetUserType & {
    ativo?: boolean;
    nome?: string;
    semestre?: number;
    bio?: string;
    foto?: string;
    studentId?: number;
};

export function PaginaUserPainel() {
    const { openUser } = useAdminPreviewer();

    const { mutateAsync: updateActiveStudent } = useUpdateActiveStudent();
    const [isPostForm, setIsPostForm] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false);
    const [userRole, setUserRole] = useState<"ALUNO" | "ADM" | "PROFESSOR" | "">("");
    const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [editingStudent, setEditingStudent] = useState<UserRow | null>(null);

    const { data, isPending } = useGetUser();
    const { data: desactivatedData } = useGetUserDesactivated();

    const totalUsers = isPending ? "carregando..." : (data?.length ?? 0);

    const totalStudent = isPending
        ? { estudantes: "carregando..." }
        : data?.reduce(
              (acc, user) => ({ estudantes: acc.estudantes + (user.role === "ALUNO" ? 1 : 0) }),
              { estudantes: 0 }
          );

    const totalUserDesactivated = isPending ? "carregando..." : (desactivatedData?.length ?? 0);

    const totalAdmin = isPending
        ? { adm: "carregando..." }
        : data?.reduce(
              (acc, user) => ({ adm: acc.adm + (user.role === "ADM" ? 1 : 0) }),
              { adm: 0 }
          );

    const columns: Column<UserRow>[] = [
        {
            key: "userId",
            header: "Usuário",
            width: "300px",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {row.email.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{row.email}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                            USER ID: {row.userId}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: "role",
            header: "Papel",
            width: "120px",
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        row.role === "ADM"
                            ? "bg-purple-100 text-purple-700"
                            : row.role === "ALUNO"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {row.role}
                </span>
            ),
        },
        {
            key: "createdAt",
            header: "Membro desde",
            width: "160px",
            render: (row) => (
                <span className="text-gray-500 text-sm">
                    {new Date(row.createdAt).toLocaleDateString()}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Ações",
            width: "180px",
            align: "center",
            render: (row) => (
                <div onClick={(e) => e.stopPropagation()}>
                    {row.role === "ALUNO" && (
                        <div className="flex gap-2 justify-center">
                            <button
                                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors"
                                onClick={() => {
                                    setEditingUserId(row.userId);
                                    setEditingStudent(row);
                                    setIsEditForm(true);
                                }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(row.userId)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    row.ativo
                                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                                        : "bg-green-50 text-green-600 hover:bg-green-100"
                                }`}
                                disabled={updatingUserId === row.userId}
                            >
                                {updatingUserId === row.userId
                                    ? "..."
                                    : row.ativo
                                    ? "Desativar"
                                    : "Ativar"}
                            </button>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const handleStatusUpdate = async (userId: number) => {
        setUpdatingUserId(userId);
        try {
            await updateActiveStudent(userId);
        } finally {
            setUpdatingUserId(null);
        }
    };

    return (
        <>
            <AdminCrudPage
                title="Admin Dashboard"
                description="Gerencie usuários e recursos do sistema"
                stats={[
                    { title: "Total de usuários",     value: totalUsers.toString(),                         cor: "azul"     },
                    { title: "Estudantes",            value: totalStudent?.estudantes.toString() ?? "0",    cor: "verde"    },
                    { title: "ADM",                   value: totalAdmin?.adm.toString() ?? "0",             cor: "amarelo"  },
                    { title: "Professores",           value: "0",                                           cor: "vermelho" },
                    { title: "Usuarios Desativados",  value: totalUserDesactivated?.toString() ?? "0",      cor: "vermelho" },
                ]}
                columns={columns}
                data={data ?? []}
                dataDesactivated={desactivatedData ?? []}
                rowKey={(r) => r.userId}
                tableTitle="usuários"
                emptyPlaceholder={
                    <div className="p-6 text-center text-gray-400">Nenhum usuário encontrado</div>
                }
                primaryActionLabel="Novo Usuário"
                onPrimaryAction={() => setIsPostForm(true)}
                onRowClick={(row) => {
                    if (row.role === "ALUNO" && row.studentId) {
                        openUser(row.studentId);
                    }
                }}
            />

            {isEditForm && editingUserId && editingStudent && (
                <>
                    <Overlay />
                    <div className="fixed z-100 top-1/2 left-1/2 w-[92vw] max-w-3xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
                        <div className="flex justify-end mb-4">
                            <button
                                className="p-1 bg-gray-300 text-gray-700 rounded-md"
                                onClick={() => {
                                    setIsEditForm(false);
                                    setEditingUserId(null);
                                    setEditingStudent(null);
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <StudentEditForm
                            studentId={editingStudent.studentId || editingUserId}
                            onClose={() => {
                                setIsEditForm(false);
                                setEditingUserId(null);
                                setEditingStudent(null);
                            }}
                        />
                    </div>
                </>
            )}

            {isPostForm && (
                <>
                    <Overlay />
                    <div className="fixed z-100 top-1/2 left-1/2 w-[94vw] max-w-4xl max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-2xl">
                        <div className="flex flex-col items-center w-full h-full relative p-4">
                            <button
                                className="ml-auto mb-4 p-1 bg-gray-300 text-gray-700 rounded-md"
                                onClick={() => {
                                    setIsPostForm(false);
                                    setUserRole("");
                                }}
                            >
                                <X size={16} />
                            </button>
                            <h4 className="font-semibold mb-2">Formulário de criação de usuário</h4>

                            {userRole === "" && (
                                <div className="flex flex-col sm:flex-row justify-between h-full w-full gap-4 p-4 max-h-40">
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
                                <div className="w-full">
                                    <ADMform setIsPostForm={setIsPostForm} setUserRole={setUserRole} />
                                </div>
                            )}
                            {userRole === "PROFESSOR" && <div>Em breve</div>}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}