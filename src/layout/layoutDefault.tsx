import { Outlet } from "react-router-dom";
import { NavBar } from "../componentes/navBar";

export function LayoutDefault() {
    return (
        <main>
            <NavBar />
            <Outlet />
        </main>
    )
}