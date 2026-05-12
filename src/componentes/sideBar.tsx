import { Bookmark, ChevronDown, FilePlusIcon, Search, SlidersHorizontal, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SideBar() {
  const [open, setOpen] = useState(false);
  const [filtrosOpen, setFiltrosOpen] = useState(false);
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

              {/* Filtros — aba expansível */}
              <li className="flex flex-col">
                {/* Botão de abrir filtros */}
                <button
                  className="flex items-center gap-2 w-full py-1"
                  onClick={() => setFiltrosOpen(prev => !prev)}
                >
                  <SlidersHorizontal className="flex-shrink-0" size={22} />
                  <span className={`text-sm whitespace-nowrap transition-opacity duration-200 flex items-center gap-1 flex-1 ${
                    open ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"
                  }`}>
                    Filtros
                    <ChevronDown
                      size={14}
                      className={`ml-auto transition-transform duration-300 ${filtrosOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </span>
                </button>

                {/* Conteúdo dos filtros — desliza para baixo */}
                <div
                  style={{ maxHeight: filtrosOpen && open ? "400px" : "0px" }}
                  className="flex flex-col gap-3 overflow-hidden transition-[max-height] duration-300 ease-in-out"
                >
                  <div className="flex flex-col gap-1 pt-2 pl-1">

                    {/* Matéria */}
                    <div className="flex flex-col gap-1">
                      <label className="text-white/60 text-[11px] uppercase tracking-widest">Matéria</label>
                      <select className="bg-white/20 text-white text-sm rounded-md px-2 py-1 outline-none cursor-pointer">
                        <option value="" className="text-black">Todas</option>
                        <option value="banco de dados" className="text-black">Banco de Dados</option>
                        <option value="dev-web" className="text-black">Dev-Web</option>
                        <option value="algebra linear" className="text-black">Álgebra Linear</option>
                        <option value="tec programação" className="text-black">Tecnicas de Programação</option>
                      </select>
                    </div>
                    {/* Curso */}
                    <div className="flex flex-col gap-1">
                      <label className="text-white/60 text-[11px] uppercase tracking-widest">Curso</label>
                      <select className="bg-white/20 text-white text-sm rounded-md px-2 py-1 outline-none cursor-pointer">
                        <option value="" className="text-black">Todos</option>
                        <option value="DSM" className="text-black">DSM</option>
                        <option value="automação" className="text-black">Automação Industrial</option>
                        <option value="soldagem" className="text-black">Soldagem</option>
                        <option value="refrigeração" className="text-black">Refrigeração</option>
                      </select>
                    </div>

                    {/* Nível de ensino */}
                    <div className="flex flex-col gap-1">
                      <label className="text-white/60 text-[11px] uppercase tracking-widest">Semestres</label>
                      <select className="bg-white/20 text-white text-sm rounded-md px-2 py-1 outline-none cursor-pointer">
                        <option value="" className="text-black">Todos</option>
                        <option value="1sem" className="text-black">1º</option>
                        <option value="2sem" className="text-black">2º</option>
                        <option value="3sem" className="text-black">3º</option>
                        <option value="4sem" className="text-black">4º</option>
                        <option value="5sem" className="text-black">5º</option>
                        <option value="6sem" className="text-black">6º</option>



                      </select>
                    </div>

                    {/* Data */}
                    <div className="flex flex-col gap-1">
                      <label className="text-white/60 text-[11px] uppercase tracking-widest">Data</label>
                      <select className="bg-white/20 text-white text-sm rounded-md px-2 py-1 outline-none cursor-pointer">
                        <option value="" className="text-black">Qualquer</option>
                        <option value="hoje" className="text-black">Hoje</option>
                        <option value="semana" className="text-black">Esta semana</option>
                        <option value="mes" className="text-black">Este mês</option>
                      </select>
                    </div>

                    {/* Popularidade */}
                    <div className="flex flex-col gap-1">
                      <label className="text-white/60 text-[11px] uppercase tracking-widest">Popularidade</label>
                      <div className="flex gap-1 flex-wrap">
                        {["Todos", "Mais curtidos", "Com selos"].map((op) => (
                          <button
                            key={op}
                            className="text-[11px] px-2 py-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors whitespace-nowrap"
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              {/* Criar resumo */}
              <li>
                <button
                  className="flex items-center gap-2 w-full py-1"
                  onClick={() => navigate("/criacao/resumo")}
                >
                  <FilePlusIcon className="flex-shrink-0" />
                  <span className={`text-sm whitespace-nowrap transition-opacity duration-200 ${
                    open ? "opacity-100 delay-100" : "opacity-0"
                  }`}>
                    Criar resumo
                  </span>
                </button>
              </li>

              {/* Feed */}
              <li>
                <button
                  className="flex items-center gap-2 w-full py-1"
                  onClick={() => navigate("/feed")}
                >
                  <Bookmark className="flex-shrink-0" />
                  <span className={`text-sm whitespace-nowrap transition-opacity duration-200 ${
                    open ? "opacity-100 delay-100" : "opacity-0"
                  }`}>
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
            <span className={`text-sm whitespace-nowrap transition-opacity duration-200 ${
              open ? "opacity-100 delay-100" : "opacity-0"
            }`}>
              User
            </span>
          </div>

        </nav>
      </section>
    </header>
  );
}