import { Outlet } from "react-router";
import { NavBar } from "./componentes/navBar";

export function Layout() {
    return (
        <main>
            <NavBar />
            <Outlet />
        </main>
    )
}