import { useEffect, useMemo, useState } from "react"
import { avatarOptions, type AvatarGender } from "../types/AvatarTypes"

export function usePaginaPerfilModais() {
    const [openFotoMenu, setOpenFotoMenu] = useState(false)
    const [openAvatarPicker, setOpenAvatarPicker] = useState(false)
    const [openBioPicker, setOpenBioPicker] = useState(false)
    const [selectedGender, setSelectedGender] = useState<AvatarGender>('all')
    const [showForm, setShowForm] = useState(false)
    const [isOptionsFormOpen, setIsOptionsFormOpen] = useState(false)
    const [selectedResumoId, setSelectedResumoId] = useState<string | null>(null)
    const [openFollowersList, setOpenFollowersList] = useState(false)
    const [openFollowingList, setOpenFollowingList] = useState(false)

    useEffect(() => {
        avatarOptions.forEach(element => {
            const img = new Image()
            img.src = element.url
        });
    }, [])

    const filteredAvatars = useMemo(() => {
        if (selectedGender === 'all') return avatarOptions
        if (selectedGender === 'male') return avatarOptions.filter((avatar) => avatar.group === 'male')
        return avatarOptions.filter((avatar) => avatar.group === 'female')
      }, [selectedGender])

      return {
        modais: {
            openFotoMenu,
            openAvatarPicker,
            openBioPicker,
            selectedGender,
            showForm,
            isOptionsFormOpen,
            selectedResumoId,
            setOpenFotoMenu,
            setOpenAvatarPicker,
            setOpenBioPicker,
            setSelectedGender,
            setShowForm,
            setIsOptionsFormOpen,
            setSelectedResumoId,
            openFollowersList,
            setOpenFollowersList,
            openFollowingList,
            setOpenFollowingList
        },
        filteredAvatars,
        handlers: {
            toggleEditForm: () => setShowForm((prev) => !prev),
            closeEditForm: () => setShowForm(false),
            openAvatarPicker: () => setOpenAvatarPicker(true),
            openBioPicker: () => setOpenBioPicker(true),
            closeAvatarPicker: () => {
                setOpenAvatarPicker(false)
                setOpenFotoMenu(false)
            },
            closeBioPicker: () => setOpenBioPicker(false),
            setSelectedGender,
            openFotoMenu: () => setOpenFotoMenu(true),
            closeFotoMenu: () => setOpenFotoMenu(false),
            toggleOptionsForm: () => setIsOptionsFormOpen((prev) => !prev),
            setIsOptionsFormOpen,
            setSelectedResumoId
        }
      }
}