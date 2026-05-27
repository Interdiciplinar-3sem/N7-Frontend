import { useMemo, useState } from "react"
import { avatarOptions, type AvatarGender } from "../types/AvatarTypes"

export function usePaginaPerfilModais() {
    const [openFotoMenu, setOpenFotoMenu] = useState(false)
    const [openAvatarPicker, setOpenAvatarPicker] = useState(false)
    const [selectedGender, setSelectedGender] = useState<AvatarGender>('all')
    const [showForm, setShowForm] = useState(false)
    const [isOptionsFormOpen, setIsOptionsFormOpen] = useState(false)
    const [selectedResumoId, setSelectedResumoId] = useState<string | null>(null)

    const filteredAvatars = useMemo(() => {
        if (selectedGender === 'all') return avatarOptions
        if (selectedGender === 'male') return avatarOptions.filter((avatar) => avatar.group === 'male')
        return avatarOptions.filter((avatar) => avatar.group === 'female')
      }, [selectedGender])

      return {
        modais: {
            openFotoMenu,
            openAvatarPicker,
            selectedGender,
            showForm,
            isOptionsFormOpen,
            selectedResumoId,
            setOpenFotoMenu,
            setOpenAvatarPicker,
            setSelectedGender,
            setShowForm,
            setIsOptionsFormOpen,
            setSelectedResumoId
        },
        filteredAvatars,
        handlers: {
            toggleEditForm: () => setShowForm((prev) => !prev),
            closeEditForm: () => setShowForm(false),
            openAvatarPicker: () => setOpenAvatarPicker(true),
            closeAvatarPicker: () => {
                setOpenAvatarPicker(false)
                setOpenFotoMenu(false)
            },
            setSelectedGender,
            openFotoMenu: () => setOpenFotoMenu(true),
            closeFotoMenu: () => setOpenFotoMenu(false),
            toggleOptionsForm: () => setIsOptionsFormOpen((prev) => !prev),
            setIsOptionsFormOpen,
            setSelectedResumoId
        }
      }
}