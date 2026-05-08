import { tv, type VariantProps } from "tailwind-variants";

type CardProps = VariantProps<typeof cardStyle> & {
    title: string;
    value: string;
}

const cardStyle = tv({
    base: "p-4 rounded-lg flex flex-col ",
    variants: {
        cor: {
            azul: 'bg-blue-50',
            verde: 'bg-green-50',
            amarelo: 'bg-yellow-50',
            vermelho: 'bg-red-50',
        }
    }
})

export function CardStatics({ title, value, cor }: CardProps) {
    return (
        <div className={cardStyle({ cor })}>
                <span className="text-sm text-gray-500">{title}</span>
                <span className="text-2xl font-bold">{value}</span>
        </div>
    )
}