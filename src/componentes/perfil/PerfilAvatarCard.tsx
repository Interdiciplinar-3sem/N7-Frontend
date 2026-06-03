import { Camera } from 'lucide-react'
import type { PerfilUser } from './types'

type PerfilAvatarCardProps = {
  isOwnProfile: boolean
  user: PerfilUser
  setOpenFollowingList: (open: boolean) => void
  setOpenFollowersList: (open: boolean) => void
  onOpenAvatarPicker: () => void
}

export function PerfilAvatarCard({
  isOwnProfile,
  user,
  onOpenAvatarPicker,
  setOpenFollowersList,
  setOpenFollowingList,
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
            backgroundImage: user.avatar?.url ? `url(${user.avatar.url})` : 'none'
          }}
        />

        {isOwnProfile && (
          <button
            type="button"
            onClick={onOpenAvatarPicker}
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
          <Camera  
            size={18} className="text-gray-500"
          />
        </button>
      )}
      </div>

      <div className="mt-6 flex gap-6 justify-center text-zinc-500">
        <button onClick={() => setOpenFollowersList(true)}>
          <strong>{user.seguidores}</strong>
          <div className="text-xs">seguidores</div>
        </button>

        <div onClick={() => setOpenFollowingList(true)} className="cursor-pointer">
          <strong>{user.seguindo}</strong>
          <div className="text-xs">seguindo</div>
        </div>
      </div>
    </div>
  )
}