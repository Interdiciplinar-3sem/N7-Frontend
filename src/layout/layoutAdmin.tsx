import { createContext, useCallback, useContext, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { SideBar } from "../componentes/sideBar";
import { User, BookCopy, PenBox, BookOpenIcon, Tag, GroupIcon, Bookmark } from "lucide-react";
import { SummaryPreviewerDrawer } from "../componentes/previwer/SummaryPreviewerDrawer";
import { UserPreviewDrawer } from "../componentes/previwer/UserPreviewerDrawer";
import { TagPreviewDrawer } from "../componentes/previwer/TagPreviwerDrawer";
import { CoursePreviewer } from "../componentes/previwer/coursePreviewer"; 
import { SubjectPreviewer } from "../componentes/previwer/subjectPreviewer"; 
import type { ContextPropsType } from "../types/contextPropsType";

type AdminPreviewerContextType = {
    openSummary: (id: number) => void;
    openUser: (studentId: number) => void;
    openTag: (id: number) => void;
    openCourse: (id: number) => void;
    openSubject: (id: number) => void;
    closeSummary: () => void;
    closeUser: () => void;
    closeTag: () => void;
    closeCourse: () => void;
    closeSubject: () => void;
};

export const AdminPreviewerContext = createContext<AdminPreviewerContextType | null>(null);

export function useAdminPreviewer() {
    const ctx = useContext(AdminPreviewerContext);
    if (!ctx) throw new Error("useAdminPreviewer deve ser usado dentro de LayoutAdmin");
    return ctx;
}

export function LayoutAdmin() {
    const {role} = useOutletContext<ContextPropsType>()
    const [summaryId, setSummaryId] = useState<number | null>(null);
    const [previewUserId, setPreviewUserId] = useState<number | null>(null);
    const [previewTagId, setPreviewTagId] = useState<number | null>(null);
    const [previewCourseId, setPreviewCourseId] = useState<number | null>(null);
    const [previewSubjectId, setPreviewSubjectId] = useState<number | null>(null);

    const openSummary = useCallback((id: number) => {
        setPreviewUserId(null);
        setPreviewTagId(null);
        setPreviewCourseId(null);
        setPreviewSubjectId(null);
        setSummaryId(id);
    }, []);

    const openUser = useCallback((studentId: number) => {
        setSummaryId(null);
        setPreviewTagId(null);
        setPreviewCourseId(null);
        setPreviewSubjectId(null);
        setPreviewUserId(studentId);
    }, []);

    const openTag = useCallback((id: number) => {
        setSummaryId(null);
        setPreviewUserId(null);
        setPreviewCourseId(null);
        setPreviewSubjectId(null);
        setPreviewTagId(id);
    }, []);

    const openCourse = useCallback((id: number) => {
        setSummaryId(null);
        setPreviewUserId(null);
        setPreviewTagId(null);
        setPreviewSubjectId(null);
        setPreviewCourseId(id);
    }, []);

    const openSubject = useCallback((id: number) => {
        setSummaryId(null);
        setPreviewUserId(null);
        setPreviewTagId(null);
        setPreviewCourseId(null);
        setPreviewSubjectId(id); 
    }, []);

    const closeSummary = useCallback(() => setSummaryId(null), []);
    const closeUser = useCallback(() => setPreviewUserId(null), []);
    const closeTag = useCallback(() => setPreviewTagId(null), []);
    const closeCourse = useCallback(() => setPreviewCourseId(null), []);
    const closeSubject = useCallback(() => setPreviewSubjectId(null), []);

    const links = [
        { key: "Feed",   label: "feed",    to: "/feed",         icon: <Bookmark     className="h-4 w-4 xxs:h-auto xxs:w-auto" /> },
        { key: "geral",   label: "geral",    to: "/painel",         icon: <GroupIcon     className="h-4 w-4 xxs:h-auto xxs:w-auto" /> },
        { key: "alunos",   label: "Usuarios", to: "/painel/user",    icon: <User         className="h-4 w-4 xxs:h-auto xxs:w-auto" /> },
        { key: "resumos",  label: "Resumos",  to: "/painel/resumos", icon: <PenBox       className="h-4 w-4 xxs:h-auto xxs:w-auto" /> },
        { key: "cursos",   label: "Cursos",   to: "/painel/cursos",  icon: <BookCopy     className="h-4 w-4 xxs:h-auto xxs:w-auto" /> },
        { key: "materias", label: "Materias", to: "/painel/materias",icon: <BookOpenIcon className="h-4 w-4 xxs:h-auto xxs:w-auto" /> },
        { key: "tags",     label: "Tags",     to: "/painel/tags",    icon: <Tag          className="h-4 w-4 xxs:h-auto xxs:w-auto" /> },
    ];

    return (
        <AdminPreviewerContext.Provider value={{ openSummary, openUser, openTag, openCourse, openSubject, closeSummary, closeUser, closeTag, closeCourse, closeSubject }}>
            <main className="w-screen min-h-screen">
                <SideBar role={role} links={links} />

                <Outlet />
                
                {previewUserId && (
                    <UserPreviewDrawer
                        studentId={previewUserId}
                        onClose={closeUser}
                        onOpenSummary={(id) => {
                            closeUser();
                            openSummary(id);
                        }}
                    />
                )}

                {summaryId && (
                    <SummaryPreviewerDrawer
                        id={summaryId}
                        onClose={closeSummary}
                    />
                )}

                {previewTagId && (
                    <TagPreviewDrawer
                        id={previewTagId}
                        onClose={closeTag}
                    />
                )}

                <CoursePreviewer 
                    courseId={previewCourseId} 
                    onClose={closeCourse} 
                />

                <SubjectPreviewer 
                    subjectId={previewSubjectId} 
                    onClose={closeSubject} 
                />
            </main>
        </AdminPreviewerContext.Provider>
    );
}