type AvatarOption = {
  id: number
  title: string
  group: 'male' | 'female' | 'neutral'
  url: string
  description: string
}

type PerfilAvatarPickerModalProps = {
  isOpen: boolean
  selectedGender: 'all' | 'male' | 'female'
  onChangeGender: (gender: 'all' | 'male' | 'female') => void
  avatars: AvatarOption[]
  onClose: () => void
  onSelectAvatar: (avatar: AvatarOption) => void | Promise<void>
}

export function PerfilAvatarPickerModal({
  isOpen,
  selectedGender,
  onChangeGender,
  avatars,
  onClose,
  onSelectAvatar
}: PerfilAvatarPickerModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 border-b pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Escolher avatar</h2>
            <p className="text-sm text-zinc-500">Selecione um avatar para o perfil e confirme a alteração.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['all', 'male', 'female'] as const).map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => onChangeGender(gender)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedGender === gender ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
              >
                {gender === 'all' ? 'Todos' : gender === 'male' ? 'Masculinos' : 'Femininos'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onSelectAvatar(avatar)}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 p-3 text-left transition hover:border-blue-400 hover:shadow-lg"
            >
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-zinc-100">
                <img
                  src={avatar.url}
                  alt={avatar.description}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full">
                <p className="truncate text-sm font-semibold text-zinc-900">{avatar.title}</p>
                <p className="text-xs text-zinc-500">
                  {avatar.group === 'male' ? 'Masculino' : avatar.group === 'female' ? 'Feminino' : 'Padrão'}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-zinc-100 px-4 py-2 font-semibold text-zinc-700 transition hover:bg-zinc-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
