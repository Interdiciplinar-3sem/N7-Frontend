import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { PaginaInicial } from './paginas/PaginaInicial'
import { PaginaCadastro } from './paginas/PaginaCadastro'
import { PaginaLogin } from './paginas/PaginaLogin'
import { PaginaPerfil } from './paginas/PaginaPerfil'
import { PaginaPainel } from './paginas/PaginaPainel'
import { PaginaFeed } from './paginas/PaginaFeed'
import { PaginaCriacaoResumo } from './paginas/PaginaCriacaoResumo'
import { LayoutDefault } from './layout/layoutDefault'
import { LayoutNetwork } from './layout/layoutNetwork'

export default App;

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutDefault />}>
            <Route element={<PaginaInicial />} path='/' />
            <Route element={<PaginaCadastro />} path='/cadastro' />
            <Route element={<PaginaLogin />} path='/login' />
          </Route>
          <Route element={<LayoutNetwork />}>
            <Route element={<PaginaPerfil />} path='/perfil' />
            <Route element={<PaginaFeed />} path='/feed' />
            <Route element={<PaginaCriacaoResumo />} path='/criacao/resumo' />
          </Route>
          <Route element={<PaginaPainel />} path='/painel' />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}