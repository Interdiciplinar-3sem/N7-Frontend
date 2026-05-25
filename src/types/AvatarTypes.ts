export type AvatarGender = 'all' | 'male' | 'female'

export type AvatarOption = {
  id: number
  title: string
  group: 'male' | 'female' | 'neutral'
  url: string
  description: string
}

export const avatarOptions: AvatarOption[] = [
  { id: 0, title: 'default', group: 'neutral', url: '/avatares/default.svg', description: 'Avatar padrão' },
  { id: 1, title: 'male-1', group: 'male', url: '/avatares/male-1.svg', description: 'Avatar masculino 1' },
  { id: 2, title: 'male-2', group: 'male', url: '/avatares/male-2.svg', description: 'Avatar masculino 2' },
  { id: 3, title: 'male-3', group: 'male', url: '/avatares/male-3.svg', description: 'Avatar masculino 3' },
  { id: 4, title: 'male-4', group: 'male', url: '/avatares/male-4.svg', description: 'Avatar masculino 4' },
  { id: 5, title: 'male-5', group: 'male', url: '/avatares/male-5.svg', description: 'Avatar masculino 5' },
  { id: 6, title: 'male-6', group: 'male', url: '/avatares/male-6.svg', description: 'Avatar masculino 6' },
  { id: 7, title: 'male-7', group: 'male', url: '/avatares/male-7.svg', description: 'Avatar masculino 7' },
  { id: 8, title: 'male-8', group: 'male', url: '/avatares/male-8.svg', description: 'Avatar masculino 8' },
  { id: 9, title: 'female-1', group: 'female', url: '/avatares/female-1.svg', description: 'Avatar feminino 1' },
  { id: 10, title: 'female-2', group: 'female', url: '/avatares/female-2.svg', description: 'Avatar feminino 2' },
  { id: 11, title: 'female-3', group: 'female', url: '/avatares/female-3.svg', description: 'Avatar feminino 3' },
  { id: 12, title: 'female-4', group: 'female', url: '/avatares/female-4.svg', description: 'Avatar feminino 4' },
  { id: 13, title: 'female-5', group: 'female', url: '/avatares/female-5.svg', description: 'Avatar feminino 5' },
  { id: 14, title: 'female-6', group: 'female', url: '/avatares/female-6.svg', description: 'Avatar feminino 6' },
  { id: 15, title: 'female-7', group: 'female', url: '/avatares/female-7.svg', description: 'Avatar feminino 7' },
  { id: 16, title: 'female-8', group: 'female', url: '/avatares/female-8.svg', description: 'Avatar feminino 8' },
  { id: 17, title: 'female-9', group: 'female', url: '/avatares/female-9.svg', description: 'Avatar feminino 9' },
  { id: 18, title: 'female-10', group: 'female', url: '/avatares/female-10.svg', description: 'Avatar feminino 10' },
  { id: 19, title: 'female-11', group: 'female', url: '/avatares/female-11.svg', description: 'Avatar feminino 11' },
  { id: 20, title: 'female-12', group: 'female', url: '/avatares/female-12.svg', description: 'Avatar feminino 12' },
  { id: 21, title: 'female-13', group: 'female', url: '/avatares/female-13.svg', description: 'Avatar feminino 13' }
]