import { useLogout } from "../http/auth/useAuth"

export function ButtonLogOut() {

    const { mutateAsync: logout, isPending } = useLogout();

    const handdleLogOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    return (
        <button 
            disabled={isPending}
            onClick={() => handdleLogOut()} 
            className="px-1 md:px-2 border font-bold border-gray-300 hover:bg-blue-100 hover:text-black hover:scale-105 rounded-md cursor-pointer
             text-black shadow-md transition-all duration-200 relative z-50
        ">
            {isPending ? "Saindo..." : "Logout"}
        </button>
    )
}