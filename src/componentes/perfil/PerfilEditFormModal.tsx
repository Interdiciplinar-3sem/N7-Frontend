import type { PerfilUser } from './types'

type PerfilEditFormModalProps = {
  isOpen: boolean
  user: PerfilUser
  onClose: () => void
  onSubmit: (formData: FormData) => Promise<void> | void
}

export function PerfilEditFormModal({
  isOpen,
  user,
  onClose,
  onSubmit
}: PerfilEditFormModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-100
        p-4
      "
      onClick={onClose}
    >
      <form
        className="
          w-full
          max-w-150
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
          onSubmit(new FormData(e.currentTarget))
        }}
      >
        <h2 className="text-2xl font-bold">Edite Seus Dados</h2>

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
              min-h-25
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
  )
}