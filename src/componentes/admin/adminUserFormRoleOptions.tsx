import type { ReactNode } from "react";

interface UserRoleCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    color: "red" | "green" | "blue";
    onClick: () => void;
}

const colorVariants = {
    red: {
        container:
            "bg-red-500/10 border-red-500/20 hover:bg-red-500/20",
        icon: "bg-red-500",
    },
    green: {
        container:
            "bg-green-500/10 border-green-500/20 hover:bg-green-500/20",
        icon: "bg-green-500",
    },
    blue: {
        container:
            "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
        icon: "bg-blue-500",
    },
};

export function AdminUserFormRoleOptions({
    title,
    description,
    icon,
    color,
    onClick,
}: UserRoleCardProps) {
    const styles = colorVariants[color];

    return (
        <button
            onClick={onClick}
            className={`
                w-full
                flex items-center gap-4
                p-4
                rounded-xl
                border
                transition-all
                hover:scale-[1.02]
                hover:shadow-lg
                ${styles.container}
            `}
        >
            <div
                className={`
                    w-12 h-12
                    flex items-center justify-center
                    rounded-lg
                    text-white
                    text-xl
                    ${styles.icon}
                `}
            >
                {icon}
            </div>

            <div className="text-left">
                <h3 className="font-semibold text-gray-800">
                    {title}
                </h3>

                <p className="text-sm text-gray-500">
                    {description}
                </p>
            </div>
        </button>
    );
}