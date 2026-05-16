import { twMerge } from "tailwind-merge"

type Props = {
    text: string;
    active?: boolean;
    className?: string;
}

export const ToggleText = ({ text, active, className }: Props) => {
    return (
        <div className={twMerge(`absolute ${active ? "flex" : "hidden"} bg-gray-400 rounded-lg p-1 px-2 items-center gap-2`, className)}>
            <span className={`text-sm font-semibold ${active && "text-white"}`}>
                {text}
            </span>
        </div>
    )
}