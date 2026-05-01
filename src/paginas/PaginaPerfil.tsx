import { useOutletContext } from 'react-router-dom'
import { Perfil } from '../componentes/Perfil'

export function PaginaPerfil() {
   type OutletContextProps  = {
        id: string
    }

    let outletContext: OutletContextProps | undefined = undefined
    try {
        outletContext = useOutletContext<OutletContextProps | undefined>()
    } catch (e) {
        console.warn("useOutletContext não disponível:", e)
    }

    const id = outletContext?.id

  return (
    <main className="w-full min-h-screen p-4">
      <Perfil />
    </main>
  )
}