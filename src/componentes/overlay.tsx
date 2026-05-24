type OverlayProps = {
    onClose?: () => void
}

export function Overlay({ onClose }: OverlayProps){
    return (
        <button
            type="button"
            aria-label="Fechar modais"
            onClick={onClose}
            className="fixed inset-0 z-90 bg-white opacity-80"
        />
    )
}