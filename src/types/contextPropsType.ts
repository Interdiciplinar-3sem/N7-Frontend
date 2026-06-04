export type ContextPropsType = {
    id: number;
    studentId: number;
    role: string;
}

export type ContextPropsTypeNetwork = ContextPropsType & {
    isOptionsFormOpen: boolean;
    setIsOptionsFormOpen: (isOpen: boolean) => void;
}