import { type ChangeEvent, type MutableRefObject } from 'react'
import type { PerfilUser } from './types'

type PerfilAvatarCardProps = {
  user: PerfilUser
  openFotoMenu: boolean
  onToggleFotoMenu: () => void
  onChoosePhoto: (event: ChangeEvent<HTMLInputElement>) => void
  onRemovePhoto: () => void
  fileInputRef: MutableRefObject<HTMLInputElement | null>
}

export function PerfilAvatarCard({
  user,
  openFotoMenu,
  onToggleFotoMenu,
  onChoosePhoto,
  onRemovePhoto,
  fileInputRef
}: PerfilAvatarCardProps) {
  return (
    <div className="foto-area flex flex-col items-center relative">
      <div className="relative w-37.5 h-37.5">
        <div
          className="
            w-full
            h-full
            rounded-full
            bg-cover
            bg-center
            bg-zinc-300
            pointer-events-none
          "
          style={{
            backgroundImage: user.foto ? `url(${user.foto})` : 'none'
          }}
        />

        <button
          type="button"
          onClick={onToggleFotoMenu}
          className="
            absolute
            bottom-0
            right-0
            w-10
            h-10
            rounded-full
            bg-white
            shadow-lg
            flex
            items-center
            justify-center
            cursor-pointer
            hover:scale-105
            transition-all
            z-70
            touch-manipulation
          "
        >
          📷
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={onChoosePhoto}
        />

        {openFotoMenu && (
          <div
            className="
              absolute
              top-[110%]
              left-1/2
              -translate-x-1/2
              bg-white
              rounded-xl
              p-3
              flex
              flex-col
              gap-2
              shadow-2xl
              z-1100
              min-w-40
            "
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="
                px-3
                py-2
                rounded-md
                bg-blue-500
                text-white
                hover:bg-blue-600
                transition-all
              "
            >
              Escolher foto
            </button>

            {user.foto && (
              <button
                type="button"
                onClick={onRemovePhoto}
                className="
                  px-3
                  py-2
                  rounded-md
                  bg-red-500
                  text-white
                  hover:bg-red-600
                  transition-all
                "
              >
                Remover foto
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-6 justify-center text-zinc-500">
        <div>
          <strong>{user.seguidores}</strong>
          <div className="text-xs">seguidores</div>
        </div>

        <div>
          <strong>{user.seguindo}</strong>
          <div className="text-xs">seguindo</div>
        </div>
      </div>
    </div>
  )
}