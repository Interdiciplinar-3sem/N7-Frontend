import { Outlet } from "react-router-dom";
import { SideBar } from "../componentes/sideBar";
import { Bookmark, User, Home, BookCopy,  PenBox, BookImage, BookOpenIcon, Tag, Badge} from "lucide-react";

export function LayoutAdmin() {
    
    const links = [
        { key: "home", label: "Home", to: "/", icon: <Home className="h-4 w-4 xxs:h-auto xxs:w-auto"/> },
        { key: "feed", label: "Feed", to: "/feed", icon: <Bookmark className="h-4 w-4 xxs:h-auto xxs:w-auto"/> },
        { key: "alunos", label: "Usuarios", to: "/painel/user", icon: <User className="h-4 w-4 xxs:h-auto xxs:w-auto"/> },
        { key: "resumos", label: "Resumos", to: "/painel/resumos", icon: <PenBox className="h-4 w-4 xxs:h-auto xxs:w-auto"/>},
        { key: "cursos", label: "Cursos", to: "/painel/cursos", icon: <BookCopy className="h-4 w-4 xxs:h-auto xxs:w-auto"/>},
        { key: "materias", label: "Materias", to: "/painel/materias", icon: <BookOpenIcon className="h-4 w-4 xxs:h-auto xxs:w-auto"/>},
        { key: "tags", label: "Tags", to: "/painel/tags", icon: <Tag className="h-4 w-4 xxs:h-auto xxs:w-auto"/>},
        { key: "selos", label: "Selos", to: "/painel/selos", icon: <Badge className="h-4 w-4 xxs:h-auto xxs:w-auto"/>},
    ]

    return (
        <main className="w-screen min-h-screen">
            <SideBar links={links} />

            <Outlet />
        </main>
    )
}