import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { PaginaInicial } from './paginas/PaginaInicial'
import { PaginaCadastro } from './paginas/PaginaCadastro'
import { PaginaLogin } from './paginas/PaginaLogin'
import { PaginaPerfil } from './paginas/PaginaPerfil'
import { PaginaPainel } from './paginas/PaginaPainel'
import { PaginaFeed } from './paginas/PaginaFeed'

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PaginaInicial />} path='/' />
          <Route element={<PaginaCadastro />} path='/cadastro' />
          <Route element={<PaginaLogin />} path='/login' />
          <Route element={<PaginaPerfil />} path='/perfil' />
          <Route element={<PaginaFeed />} path='/feed' />
          <Route element={<PaginaPainel />} path='/painel' />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}