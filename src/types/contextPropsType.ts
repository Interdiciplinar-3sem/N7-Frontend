export type ContextPropsType = {
    id: string;
    role: string;
}

export type ContextPropsTypeNetwork = ContextPropsType & {
    isOptionsFormOpen: boolean;
    setIsOptionsFormOpen: (isOpen: boolean) => void;
}