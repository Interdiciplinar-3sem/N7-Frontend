import type { PerfilUser } from './types'

type PerfilInfoProps = {
  user: PerfilUser
}

export function PerfilInfo({ user }: PerfilInfoProps) {
  return (
    <div className="flex-1">
      <h2 className="text-xs lg:text-2xl font-bold">
        {user.nome || 'Nome do usuário'}
      </h2>

      <p className="text-zinc-500 mt-2">{user.curso || 'Curso'}</p>

      <p className="text-zinc-500">{user.faculdade || 'Faculdade'}</p>

      <p className="text-zinc-400 mt-3">
        {user.descricao || 'Adicione uma bio...'}
      </p>
    </div>
  )
}