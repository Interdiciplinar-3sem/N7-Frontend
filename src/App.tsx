import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PaginaInicial } from './paginas/PaginaInicial'
import { PaginaCadastro } from './paginas/PaginaCadastro'
import { PaginaLogin } from './paginas/PaginaLogin'
import { PaginaPerfil } from './paginas/PaginaPerfil'
import { PaginaPainel } from './paginas/PaginaPainel'
import { PaginaFeed } from './paginas/PaginaFeed'
import { LayoutNetwork } from './layout/layoutNetwork'
import { ProtectedRoute } from './guards/protecRoute'
import { ToastProvider } from './contexto/toastContext'
import { PaginaBuscaMobile } from './paginas/PaginaBuscaMobile'
import { LayoutAdmin } from './layout/layoutAdmin'
import { PaginaUserPainel } from './paginas/admin/PaginaUserPainel'
import { PaginaResumos } from './paginas/admin/PaginaResumos'
import { PaginaCursos } from './paginas/admin/PaginaCursos'
import { PaginaMaterias } from './paginas/admin/PaginaMaterias'
import { PaginaTags } from './paginas/admin/PaginaTags'
import { PaginaTurmas } from './paginas/PaginaTurmas'
import { PaginaResumo } from './paginas/PaginaResumo'
import { PaginaConfirmacaoEmail } from './paginas/PaginaConfirmacaoEmail'

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
            <Route path="/confirm-email" element={<PaginaConfirmacaoEmail />} />
            <Route element={<PaginaLogin />} path='/login' />
              <Route element={<ProtectedRoute />}>
                <Route element={<LayoutNetwork />}>
                  <Route element={<PaginaResumo />} path='/resumo' />
                  <Route element={<PaginaResumo />} path='/resumo/:id' />
                  <Route element={<PaginaPerfil />} path='/perfil' />
                  <Route element={<PaginaPerfil />} path='/perfil/:studentId' />
                  <Route element={<PaginaFeed />} path='/feed' />
                  <Route element={<PaginaTurmas />} path='/turmas' />
                </Route>
                <Route element={<PaginaBuscaMobile />} path='/busca' />
                <Route element={<LayoutAdmin />} path='/painel'>
                  <Route element={<PaginaPainel />} index/>
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