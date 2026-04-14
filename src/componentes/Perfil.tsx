import { useState, useRef } from 'react'

export function Perfil() {
  const [user, setUser] = useState({
    nome: '',
    curso: '',
    faculdade: '',
    descricao: '',
    seguidores: 0,
    seguindo: 0,
    selo: null as string | null,
    foto: ''
  })

  const [openSelo, setOpenSelo] = useState(false)
  const [openFotoMenu, setOpenFotoMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const isOwnProfile = true
  const isFollowing = false
  
  const [resumos, setResumos] = useState<{id: number, titulo: string, materia: string, curtidas: number}[]>([])
  const [showResumos, setShowResumos] = useState(false)

  function excluirResumo(id: number) {
  setResumos(prev => prev.filter(r => r.id !== id))
}

  function Botao({ children, onClick, cor = '#3b5bfd', corHover = '#2f4ae0' }: { children: React.ReactNode, onClick?: () => void, cor?: string, corHover?: string }) {
    const [hover, setHover] = useState(false)
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '150px',
          padding: '10px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: hover ? corHover : cor,
          color: 'black',
          boxShadow: hover ? '0 0 12px rgba(94, 94, 94, 0.6)' : '0 0 8px rgba(0,0,0,0.2)',
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.2s ease',
          zIndex: 100
        }}
      >
        {children}
      </button>
    )
}

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <main
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest('.foto-area')) {
          setOpenFotoMenu(false)
          setOpenSelo(false)
        }
      }}
    >
      {/* HEADER */}
      <header style={{ backgroundColor: '#3b5bfd', color: 'white', display: 'flex', justifyContent: 'space-between', padding: '15px 30px' }}>
        <h1>N7</h1>
        <span>Feed</span>
      </header>

      {/* PERFIL */}
      <section style={{ padding: '30px' }}>
        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* FOTO + BOTÕES */}
          <div className="foto-area" style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'inline-block', width: '150px', height: '150px' }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: user.foto ? 'transparent' : '#ccc',
                backgroundImage: user.foto ? `url(${user.foto})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid #858585ff',
                margin: '0 auto'
              }}></div>

              {/* BOTÃO FOTO */}
              <button
                onClick={(e) => { e.stopPropagation(); setOpenFotoMenu(prev => !prev) }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#fff',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '-10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 1000,
                  fontSize: '20px'
                }}>📷</button>

              {/* BOTÃO SELO */}
              <button
                onClick={(e) => { e.stopPropagation(); setOpenSelo(prev => !prev) }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#fff',
                  position: 'absolute',
                  bottom: '-10px',
                  right: '-10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 1000,
                  fontSize: '20px'
                }}>
                {user.selo === 'verificado' && '✔️'}
                {user.selo === 'top' && '🔥'}
                {user.selo === 'novo' && '⭐'}
                {!user.selo && '➕'}
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setUser(prev => ({ ...prev, foto: url }))
                    setOpenFotoMenu(false)
                  }
                }}
              />

              {openFotoMenu && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  left: '0',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                  zIndex: 10000
                }}>
                  <button onClick={() => fileInputRef.current?.click()}>Escolher foto</button>
                  {user.foto && <button onClick={() => setUser(prev => ({ ...prev, foto: '' }))}>Remover foto</button>}
                </div>
              )}

              {openSelo && (
                <div
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: '0',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    padding: '8px',
                    display: 'flex',
                    gap: '5px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    zIndex: 10000
                  }}
                >
                  <button onClick={() => { setUser({ ...user, selo: 'verificado' }); setOpenSelo(false) }}>✔️</button>
                  <button onClick={() => { setUser({ ...user, selo: 'top' }); setOpenSelo(false) }}>🔥</button>
                  <button onClick={() => { setUser({ ...user, selo: 'novo' }); setOpenSelo(false) }}>⭐</button>
                  <button onClick={() => { setUser({ ...user, selo: null }); setOpenSelo(false) }}>❌</button>
                </div>
              )}
            </div>

            {/* SEGUIDORES */}
            <div style={{ marginTop: '15px', display: 'flex', gap: '15px', justifyContent: 'center', color: '#999' }}>
              <div>
                <strong>{user.seguidores}</strong>
                <div style={{ fontSize: '12px' }}>seguidores</div>
              </div>
              <div>
                <strong>{user.seguindo}</strong>
                <div style={{ fontSize: '12px' }}>seguindo</div>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div style={{ flex: 1 }}>
            <h2>{user.nome || 'Nome do usuário'}</h2>
            <p style={{ color: '#aaa' }}>{user.curso || 'Curso'}</p>
            <p style={{ color: '#aaa' }}>{user.faculdade || 'Faculdade'}</p>
            <p style={{ color: '#bbb' }}>{user.descricao || 'Adicione uma descrição...'}</p>
          </div>

          {/* BOTÕES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!isOwnProfile && <Botao>{isFollowing ? 'Seguindo' : 'Seguir'}</Botao>}

            <Botao onClick={() => setShowForm(prev => !prev)} cor="#2CD76E" corHover="#2CD76E">Editar Perfil</Botao>
            <Botao onClick={() => setShowResumos(prev => !prev)} cor="#F4EB8C" corHover="#F4EB8C">Meus Resumos</Botao>
            <Botao cor="#F8B7E2" corHover="#F8B7E2">Minhas Turmas</Botao>
          </div>
        </div>

        {showResumos && (
            <div style={{
                maxWidth: '800px',
                margin: '20px auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
            }}>
                {resumos.length === 0 && <p style={{ color: '#888' }}>Nenhum resumo criado ainda.</p>}
                {resumos.map((resumo) => (
                <div key={resumo.id} style={{
                    padding: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    backgroundColor: '#fdfdfd',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '8px',
                    minHeight: '120px'
                }}>
                    <h3 style={{ margin: 0 }}>{resumo.titulo}</h3>
                    <p style={{ margin: 0, color: '#555' }}>{resumo.materia}</p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>❤️ {resumo.curtidas}</p>
                    <button
                    onClick={() => excluirResumo(resumo.id)}
                    style={{
                        padding: '6px 10px',
                        border: 'none',
                        borderRadius: '6px',
                        backgroundColor: '#ff4d4f',
                        color: '#fff',
                        cursor: 'pointer',
                        alignSelf: 'flex-end'
                    }}
                    >
                    Excluir
                    </button>
                </div>
                ))}
            </div>
            )}

        {/* FORMULÁRIO FUNCIONAL E DIGITÁVEL */}
        
        {showForm && (
          
          <form
            style={{
              maxWidth: '600px',
              margin: '20px auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              padding: '20px',
              border: '1px solid #888',
              borderRadius: '10px',
              backgroundColor: '#fff',
              zIndex: 1000,
              position: 'relative'
            }}
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
          > <h2>Edite Seus Dados</h2>
            
            <label>
              Nome:
              <input
                name="nome"
                type="text"
                defaultValue={user.nome}
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #888', borderRadius: '5px' }}
              />
            </label>
            <label>
              Curso:
              <input
                name="curso"
                type="text"
                defaultValue={user.curso}
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #888', borderRadius: '5px' }}
              />
            </label>
            <label>
              Faculdade:
              <input
                name="faculdade"
                type="text"
                defaultValue={user.faculdade}
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #888', borderRadius: '5px' }}
              />
            </label>
            <label>
              Descrição:
              <textarea
                name="descricao"
                defaultValue={user.descricao}
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #888', borderRadius: '5px', minHeight: '80px' }}
              />
            </label>
            <button
              type="submit"
              style={{ padding: '10px', backgroundColor: '#3b5bfd', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Alterar Perfil
            </button>
          </form>
        )}
      </section>
    </main>
      
    </div>
  )
}