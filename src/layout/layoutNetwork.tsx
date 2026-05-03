import { Outlet, useOutletContext } from "react-router-dom";
import { SideBar } from "../componentes/sideBar";
import { useEffect, useState } from "react";
import { FormResumo } from "../componentes/formResumo";
import { Overlay } from "../componentes/overlay";

export function LayoutNetwork() {
    const parentContext = useOutletContext<any | undefined>()
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = html.style.overflow;

        if (isFormOpen) {
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
    }, [isFormOpen]);

    return (
        <main className="flex min-h-screen w-full gap-2 ">
            <SideBar isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}/>
            <div className="w-full sm:ml-20 p-2 sm:p-1">
                { isFormOpen && (
                        <>
                            <FormResumo setIsFormOpen={setIsFormOpen}/>
                            <Overlay />
                        </>
                    )
                }
                <Outlet context={parentContext} />
            </div>
        </main>
    )
}