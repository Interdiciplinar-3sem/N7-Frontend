import { Outlet } from "react-router";
import { NavBar } from "../componentes/navBar";

export function LayoutDefault() {
    return (
        <main>
            <NavBar />
            <Outlet />
        </main>
    )
}