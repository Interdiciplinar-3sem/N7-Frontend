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
            className="px-1 md:px-4 border font-bold text-gray-300 border-gray-300 hover:bg-blue-100 hover:text-black hover:scale-105 roundedçg
        ">
            {isPending ? "Saindo..." : "Logout"}
        </button>
    )
}