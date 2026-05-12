import { useRef, useState } from 'react'
import { Botao } from './ui/Botao'

export function Perfil() {
  const [user, setUser] = useState({
    nome: '',
    curso: '',
    faculdade: '',
    descricao: '',
    seguidores: 0,
    seguindo: 0,
    foto: ''
  })

  const [openFotoMenu, setOpenFotoMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showResumos, setShowResumos] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const isOwnProfile = true
  const isFollowing = false

  const [resumos, setResumos] = useState<
    {
      id: number
      titulo: string
      materia: string
      curtidas: number
    }[]
  >([])


  const [showTurmas, setShowTurmas] = useState(false)

        const [turmas] = useState([
          {
            id: 1,
            materia: 'Banco de Dados',
            professor: 'Prof. João',
            color: '#F8B7E2',
          },
          {
            id: 2,
            materia: 'Programação Web',
            professor: 'Prof. Ana',
            color: '#F4EB8C'
          }
        ])
  function excluirResumo(id: number) {
    setResumos((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="font-sans min-h-[100dvh] bg-zinc-100 flex flex-col">
      <main className="flex-1 pb-[120px]">
        {/* HEADER */}
       <header className="bg-blue-600 text-white flex justify-between px-8 py-4 shadow-md"> <h1 className="text-2xl font-bold">N7</h1> <span className="text-lg">Feed</span> </header>

        {/* PERFIL -*/}
        <section className="p-8 pb-32 md:pb-8">
          <div
            className="
              bg-zinc-100
              rounded-2xl
              p-10 pb-24
              flex
              flex-col
              md:flex-row
              items-center md:items-start
              gap-6
              max-w-[900px]
              mx-auto
              relative
              shadow-md
             
           
            "
          >
            {/* FOTO */}
            <div className="foto-area flex flex-col items-center relative">
              <div className="relative w-[150px] h-[150px]">
                
                {/* FOTO */}
                <div
                className="
                  w-full
                  h-full
                  rounded-full
                  
                  bg-cover
                  bg-center
                  bg-zinc-300
                  pointer-events-none
                "
                style={{
                  backgroundImage: user.foto ? `url(${user.foto})` : 'none'
                }}
              />

                {/* BOTÃO FOTO */}
               
               <button
                  type="button"
                  onClick={() => setOpenFotoMenu(prev => !prev)}
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:scale-105
                    transition-all
                    
                    z-[1000]
                    touch-manipulation
                  "
                >
                  📷
                </button>

                {/* INPUT */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]

                    if (file) {
                      const url = URL.createObjectURL(file)

                      setUser((prev) => ({
                        ...prev,
                        foto: url
                      }))

                      setOpenFotoMenu(false)
                    }
                  }}
                />

                {/* MENU FOTO */}
                {openFotoMenu && (
                   <div
                  className="
                    absolute
                    top-[110%]
                    left-1/2
                    -translate-x-1/2
                    bg-white
                    rounded-xl
                    p-3
                    flex
                    flex-col
                    gap-2
                    shadow-2xl
                   
                    z-[1100]
                    min-w-[160px]
                  "
                >
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="
                        px-3
                        py-2
                        rounded-md
                        bg-blue-500
                        text-white
                        hover:bg-blue-600
                        transition-all
                      "
                    >
                      Escolher foto
                    </button>

                    {user.foto && (
                      <button
                        type="button"
                        onClick={() =>
                          setUser((prev) => ({
                            ...prev,
                            foto: ''
                          }))
                        }
                        className="
                          px-3
                          py-2
                          rounded-md
                          bg-red-500
                          text-white
                          hover:bg-red-600
                          transition-all
                        "
                      >
                        Remover foto
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* SEGUIDORES */}
              <div className="mt-6 flex gap-6 justify-center text-zinc-500">
                <div>
                  <strong>{user.seguidores}</strong>
                  <div className="text-xs">seguidores</div>
                </div>

                <div>
                  <strong>{user.seguindo}</strong>
                  <div className="text-xs">seguindo</div>
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold">
                {user.nome || 'Nome do usuário'}
              </h2>

              <p className="text-zinc-500 mt-2">
                {user.curso || 'Curso'}
              </p>

              <p className="text-zinc-500">
                {user.faculdade || 'Faculdade'}
              </p>

              <p className="text-zinc-400 mt-3">
                {user.descricao ||
                  'Adicione uma descrição...'}
              </p>
            </div>

            {/* BOTÕES  */}
            <div className="flex flex-col gap-3 mt-10 md:mt-0 pointer-events-auto pb-6 md:pb-0">
              {!isOwnProfile && (
                <Botao>
                  {isFollowing ? 'Seguindo' : 'Seguir'}
                </Botao>
              )}

              <Botao
                onClick={() => setShowForm(prev => !prev)}
                cor="bg-green-400"
                corHover="hover:bg-green-500"
              >
                Editar Perfil
              </Botao>

              <Botao
                onClick={() => setShowResumos(prev => !prev)}
                cor="bg-yellow-300"
                corHover="hover:bg-yellow-400"
              >
                Meus Resumos
              </Botao>

              {/* Minhas Turmas */}
              <Botao
                onClick={() => setShowTurmas(prev => !prev)}
                cor="bg-pink-300"
                corHover="hover:bg-pink-400"
              >
                Minhas Turmas
              </Botao>
            </div>
          </div>

          {/* RESUMOS */}
          {showResumos && (
            <div
              className="
                max-w-[900px]
                mx-auto
                mt-6
                grid
                grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
                gap-4
              "
            >
              {resumos.length === 0 && (
                <p className="text-zinc-500">
                  Nenhum resumo criado ainda.
                </p>
              )}

              {resumos.map((resumo) => (
                <div
                  key={resumo.id}
                  className="
                    p-4
                    
                    rounded-xl
                    bg-white
                    flex
                    flex-col
                    justify-between
                    gap-2
                    shadow-sm
                  "
                >
                  <h3 className="font-bold text-lg">
                    {resumo.titulo}
                  </h3>

                  <p className="text-zinc-600">
                    {resumo.materia}
                  </p>

                  <p className="text-sm text-zinc-400">
                    ❤️ {resumo.curtidas}
                  </p>

                  <button
                    onClick={() => excluirResumo(resumo.id)}
                    className="
                      self-end
                      px-3
                      py-1
                      rounded-md
                      bg-red-500
                      text-white
                      hover:bg-red-600
                      transition-all
                    "
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}

          {showTurmas && (
  <div className="max-w-[900px] mx-auto mt-6 flex flex-col gap-3">
    
    {/* título + contador */}
    <h2 className="text-xl font-bold text-zinc-700">
      Minhas Turmas ({turmas.length})
    </h2>

    {turmas.length === 0 && (
      <p className="text-zinc-500">
        Nenhuma turma associada ao usuário.
      </p>
    )}

    {turmas.map((turma) => (
      <div
        key={turma.id}
        style={{ backgroundColor: turma.color }}
        className="
          
          rounded-xl
          shadow-sm
          p-4
          flex
          items-center
          justify-between
          hover:shadow-md
          transition
        "
      >
        {/* lado esquerdo */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-zinc-800">
            {turma.materia}
          </h3>

          <p className="text-sm text-zinc-500">
            {turma.professor}
          </p>
        </div>

        {/* opcional: indicador */}
        <span className="text-xs text-zinc-400">
          turma
        </span>
      </div>
    ))}
  </div>
)}

          {/* FORMULÁRIO */}
          {showForm && (
            <div
              className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
                z-[1000]
                p-4
              "
              onClick={() => setShowForm(false)}
            >
              <form
                className="
                  w-full
                  max-w-[600px]
                  flex
                  flex-col
                  gap-4
                  p-6
                  border
                  rounded-2xl
                  bg-white
                  shadow-md
                "
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                  e.preventDefault()

                  const formData = new FormData(e.currentTarget)

                  setUser({
                    ...user,
                    nome: formData.get('nome') as string,
                    curso: formData.get('curso') as string,
                    faculdade: formData.get('faculdade') as string,
                    descricao: formData.get('descricao') as string
                  })

                  setShowForm(false)
                }}
              >
                <h2 className="text-2xl font-bold">
                  Edite Seus Dados
                </h2>

                <label className="flex flex-col gap-1">
                  Nome
                  <input
                    name="nome"
                    type="text"
                    defaultValue={user.nome}
                    className="
                      w-full
                      p-2
                      border
                      rounded-md
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </label>

                <label className="flex flex-col gap-1">
                  Curso
                  <input
                    name="curso"
                    type="text"
                    defaultValue={user.curso}
                    className="
                      w-full
                      p-2
                      border
                      rounded-md
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </label>

                <label className="flex flex-col gap-1">
                  Faculdade
                  <input
                    name="faculdade"
                    type="text"
                    defaultValue={user.faculdade}
                    className="
                      w-full
                      p-2
                      border
                      rounded-md
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </label>

                <label className="flex flex-col gap-1">
                  Descrição
                  <textarea
                    name="descricao"
                    defaultValue={user.descricao}
                    className="
                      w-full
                      p-2
                      border
                      rounded-md
                      min-h-[100px]
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </label>

                <button
                  type="submit"
                  className="
                    p-3
                    bg-blue-600
                    text-white
                    rounded-md
                    hover:bg-blue-700
                    transition-all
                  "
                >
                  Alterar Perfil
                </button>
              </form>
            </div>
          )}
        </section>
        
        
        
      </main>
      
    </div>
    
  )
}