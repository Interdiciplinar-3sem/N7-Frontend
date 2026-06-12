import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PaginaInicial } from './paginas/static/PaginaInicial'
import { PaginaCadastro } from './paginas/auth/PaginaCadastro'
import { PaginaLogin } from './paginas/auth/PaginaLogin'
import { PaginaPerfil } from './paginas/PaginaPerfil'
import { PaginaPainel } from './paginas/PaginaPainel'
import { PaginaFeed } from './paginas/PaginaFeed'
import { LayoutNetwork } from './layout/layoutNetwork'
import { ProtectedRoute } from './guards/protecRoute'
import { ToastProvider } from './contexto/toastContext'
import { PaginaBusca } from './paginas/PaginaBusca'
import { LayoutAdmin } from './layout/layoutAdmin'
import { PaginaUserPainel } from './paginas/admin/PaginaUserPainel'
import { PaginaResumos } from './paginas/admin/PaginaResumos'
import { PaginaCursos } from './paginas/admin/PaginaCursos'
import { PaginaMaterias } from './paginas/admin/PaginaMaterias'
import { PaginaTags } from './paginas/admin/PaginaTags'
import { PaginaTurmas } from './paginas/PaginaTurmas'
import { PaginaConfirmacaoEmail } from './paginas/auth/PaginaConfirmacaoEmail'
import { PaginaCriacaoResumoWrapper } from './paginas/PaginaCriacaoResumoWrapper'
import { PaginaEsqueciSenha } from './paginas/auth/PaginaEsqueciSenha'
import { PaginaRedefinirSenha } from './paginas/auth/PaginaRedefinirSenha'

export default App;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PaginaInicial />} path='/' />
            <Route element={<PaginaCadastro />} path='/cadastro' />
            <Route path="/confirm-email/:type" element={<PaginaConfirmacaoEmail />} />
            <Route element={<PaginaEsqueciSenha />} path='/esqueci-senha' />
            <Route element={<PaginaRedefinirSenha />} path='/redefinir-senha' />
            <Route element={<PaginaLogin />} path='/login' />
            <Route element={<ProtectedRoute />}>
              <Route element={<LayoutNetwork />}>
                <Route element={<PaginaCriacaoResumoWrapper />} path='/resumo' />
                <Route element={<PaginaCriacaoResumoWrapper />} path='/resumo/:id' />
                <Route element={<PaginaPerfil />} path='/perfil' />
                <Route element={<PaginaPerfil />} path='/perfil/:studentId' />
                <Route element={<PaginaFeed />} path='/feed' />
                <Route element={<PaginaTurmas />} path='/turmas' />
                <Route element={<PaginaBusca />} path='/busca' />
              </Route>
              <Route element={<LayoutAdmin />} path='/painel'>
                <Route element={<PaginaPainel />} index />
                <Route element={<PaginaUserPainel />} path='/painel/user' />
                <Route element={<PaginaResumos />} path='/painel/resumos' />
                <Route element={<PaginaCursos />} path='/painel/cursos' />
                <Route element={<PaginaMaterias />} path='/painel/materias' />
                <Route element={<PaginaTags />} path='/painel/tags' />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  )
}