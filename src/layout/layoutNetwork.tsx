import { Outlet, useOutletContext } from "react-router-dom";
import { SideBar } from "../componentes/sideBar";
import { useState } from "react";
import { FormResumo } from "../componentes/formResumo";
import { Overlay } from "../componentes/overlay";

export function LayoutNetwork() {
    const parentContext = useOutletContext<any | undefined>()
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <main className="flex min-h-screen w-full">
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