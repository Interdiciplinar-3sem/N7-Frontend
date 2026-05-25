import { useOutletContext } from "react-router-dom";
import { CardPerfil } from "../componentes/ui/cardPerfil";
import { useGetFollowing } from "../http/follow/useGetFollowing";
import type { ContextPropsType } from "../types/contextPropsType";
import { StudentsListPage } from "../componentes/ui/StudentsListPage";

export function PaginaStudents() {
  const parentContext = useOutletContext<ContextPropsType>();
  const { data: following, isPending } = useGetFollowing(parentContext.id);

  return (
    <StudentsListPage
      title="Usuários que você segue"
      description="Lista completa dos perfis que aparecem no bloco de seguindo do feed."
      backHref="/feed"
      backLabel="Voltar ao feed"
      isPending={isPending}
      pendingLabel="Carregando usuários seguidos..."
      items={following}
      emptyMessage="Você ainda não segue ninguém."
      renderItem={(user) => (
        <CardPerfil
          key={user.studentId}
          studentId={user.studentId}
          nome={user.name}
          seguidores={user.seguidores}
          semestre={user.semestre}
          url={user.studentUrl}
          className="w-full max-w-none"
        />
      )}
    />
  );
}