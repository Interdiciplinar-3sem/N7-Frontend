import { Outlet } from "react-router";
import { SideBar } from "../componentes/sideBar";

export function LayoutNetwork() {
    return (
        <main className="flex">
            <SideBar />
            <Outlet />
        </main>
    )
}