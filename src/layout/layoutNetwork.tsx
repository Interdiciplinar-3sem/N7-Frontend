import { Outlet, useOutletContext } from "react-router-dom";
import { SideBar } from "../componentes/sideBar";
import { useEffect, useState } from "react";
import { FormResumo } from "../componentes/formResumo";
import { Overlay } from "../componentes/overlay";
import { OptionsResumo } from "../componentes/optionsResumo";

export function LayoutNetwork() {
    const parentContext = useOutletContext<any | undefined>()
    const [isOptionsFormOpen, setIsOptionsFormOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const outletContext = {
        ...(parentContext ?? {}),
        isOptionsFormOpen,
        setIsOptionsFormOpen
    };
    const closeAllModals = () => {
        setIsFormOpen(false);
        setIsOptionsFormOpen(false);
    };

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = html.style.overflow;

        if (isFormOpen || isOptionsFormOpen) {
            body.style.overflow = "hidden";
            html.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
            html.style.overflow = "";
        }

        return () => {
            body.style.overflow = previousBodyOverflow;
            html.style.overflow = previousHtmlOverflow;
        };
    }, [isFormOpen, isOptionsFormOpen]);

    return (
        <main className="flex min-h-screen w-full gap-2 ">
            <SideBar role={parentContext.role} isOptionsFormOpen={isOptionsFormOpen} setIsOptionsFormOpen={setIsOptionsFormOpen}/>
            <div className="w-full sm:ml-20 p-2 sm:p-1">
                { isOptionsFormOpen && (
                        <>
                            <OptionsResumo setIsFormOpen={setIsFormOpen} setIsOptionsFormOpen={setIsOptionsFormOpen}/>
                            <Overlay onClose={closeAllModals} />
                        </>
                    )
                }
                { isFormOpen && (
                        <>
                            <FormResumo setIsFormOpen={setIsFormOpen}/>
                            <Overlay onClose={closeAllModals} />
                        </>
                    )
                }
                <Outlet context={outletContext} />
            </div>
        </main>
    )
}