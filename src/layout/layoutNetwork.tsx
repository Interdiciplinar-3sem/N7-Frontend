import { Outlet } from "react-router-dom";
import { SideBar } from "../componentes/sideBar";

export function LayoutNetwork() {
    return (
        <main className="flex min-h-screen w-full">
            <SideBar/>
            <div className="w-full sm:ml-20 p-2 sm:p-1">
                <Outlet />
            </div>
        </main>
    )
}