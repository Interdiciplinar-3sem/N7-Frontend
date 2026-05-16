import type { ReactNode } from 'react'

type BotaoProps = {
  children: ReactNode
  onClick?: () => void
  cor?: string
  corHover?: string
}

export function Botao({
  children,
  onClick,
  cor = 'bg-blue-500',
  corHover = 'hover:bg-blue-600'
}: BotaoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-[150px]
        px-4
        py-2
        rounded-md
        cursor-pointer
        text-black
        shadow-md
        hover:scale-105
        transition-all
        duration-200
        relative
        z-50
        ${cor}
        ${corHover}
      `}
    >
      {children}
    </button>
  )
}