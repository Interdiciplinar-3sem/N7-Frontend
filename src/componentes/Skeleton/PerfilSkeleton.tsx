import { SideBar } from "../sideBar";

export function PerfilSkeleton() {
    return (
        <main className="flex min-h-screen w-full bg-gray-100">
            <SideBar />
            <div className="flex w-full flex-col items-center gap-4 px-4 py-6 sm:ml-20 sm:gap-6 sm:px-6 lg:px-8">
                <div className="h-80 w-full max-w-4xl animate-pulse rounded-3xl bg-white shadow-lg sm:h-96" />

                <div className="w-full max-w-4xl">
                    <div className="grid gap-4 sm:max-w-md">
                        <div className="h-24 w-full animate-pulse rounded-2xl bg-white shadow-lg" />
                    </div>
                </div>

                <div className="flex w-full max-w-4xl flex-col gap-3">
                    <div className="h-16 w-full animate-pulse rounded-2xl bg-white shadow-lg" />
                    <div className="h-16 w-full animate-pulse rounded-2xl bg-white shadow-lg" />
                    <div className="h-16 w-full animate-pulse rounded-2xl bg-white shadow-lg" />
                    <div className="h-16 w-full animate-pulse rounded-2xl bg-white shadow-lg" />
                    <div className="h-16 w-full animate-pulse rounded-2xl bg-white shadow-lg" />
                </div>
            </div>
        </main>
    );
}
