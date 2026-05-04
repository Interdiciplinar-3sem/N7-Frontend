import { Bookmark, FilePlusIcon, Search, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SideBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed bottom-0 left-0 right-0 z-50 sm:static sm:h-screen">
      <section
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{ width: open ? "200px" : "64px" }}
        className="h-full bg-[#4C9AE4] text-white transition-[width] duration-300 ease-in-out overflow-hidden"
      >
        <nav className="h-full flex sm:flex-col p-2 justify-between">

          {/* Topo: Logo + itens */}
          <div className="flex sm:flex-col gap-2 md:gap-8">
            {/* Logo */}
            <div className="bg-white text-black font-semibold w-10 h-10 flex items-center justify-center flex-shrink-0">
              <button onClick={() => navigate("/")}>Logo</button>
            </div>

            {/* Nav items */}
            <ul className="flex sm:flex-col gap-2">
              {/* Input de pesquisa */}
              <li className="flex items-center gap-2 py-1">
                <Search className="flex-shrink-0" size={22} />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className={`text-sm bg-white/20 placeholder-white/60 text-white rounded-md px-2 py-1 outline-none w-full transition-opacity duration-200 ${
                    open ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              </li>

              <li>
                <button
                  className="flex items-center gap-2 w-full py-1"
                  onClick={() => navigate("/criacao/resumo")}
                >
                  <FilePlusIcon className="flex-shrink-0" />
                  <span
                    className={`text-sm whitespace-nowrap transition-opacity duration-200 ${
                      open ? "opacity-100 delay-100" : "opacity-0"
                    }`}
                  >
                    Criar resumo
                  </span>
                </button>
              </li>

              <li>
                <button
                  className="flex items-center gap-2 w-full py-1"
                  onClick={() => navigate("/feed")}
                >
                  <Bookmark className="flex-shrink-0" />
                  <span
                    className={`text-sm whitespace-nowrap transition-opacity duration-200 ${
                      open ? "opacity-100 delay-100" : "opacity-0"
                    }`}
                  >
                    Feed
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Rodapé: User */}
          <div className="flex items-center gap-2">
            <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <button onClick={() => navigate("/perfil")}>
                <User size={18} />
              </button>
            </div>
            <span
              className={`text-sm whitespace-nowrap transition-opacity duration-200 ${
                open ? "opacity-100 delay-100" : "opacity-0"
              }`}
            >
              User
            </span>
          </div>

        </nav>
      </section>
    </header>
  );
}