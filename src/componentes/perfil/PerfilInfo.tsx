import type { PerfilUser } from './types'

type PerfilInfoProps = {
  isOwnProfile: boolean
  user: PerfilUser
}

export function PerfilInfo({ user, isOwnProfile }: PerfilInfoProps) {
  return (
    
    <div className="flex flex-col items-center md:items-start flex-1">
      <h2 className="text-xs lg:text-2xl font-bold">
        {user.nome || 'Nome do usuário'}
      </h2>

      <p className="text-zinc-500 mt-2">{user.curso || 'Curso'}</p>

      <p className="text-zinc-500">{user.faculdade || 'Faculdade'}</p>

      <p className="text-zinc-400 mt-3">
        {user.descricao || (isOwnProfile ? 'Sem descrição' : 'Este usuário ainda não adicionou uma descrição.')}
      </p>
    </div>
  )
}