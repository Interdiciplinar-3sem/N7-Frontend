import { useLogout } from "../http/auth/useLogout"

export function ButtonLogOut() {

    const { mutateAsync: logout, isPending } = useLogout();

    const handdleLogOut = async () => {
        await logout();
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