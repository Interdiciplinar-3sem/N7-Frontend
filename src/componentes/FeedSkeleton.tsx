import { SideBar } from "./sideBar";

export function FeedSkeleton() {
    return (
        <main className="flex min-h-screen w-full">
            <SideBar />
            <div className="w-full sm:ml-20 p-2 sm:p-1">
                <div className="w-full min-h-screen p-6 mb-20 sm:mb-0 sm:grid lg:grid-cols-3 sm:grid-cols-2 flex flex-col sm:grid-flow-dense gap-8 grid-auto-rows-[180px]">
                    {/* Card 1 - Horizontal */}
                    <div className="sm:col-span-2 bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 2 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 3 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 4 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 5 - Vertical */}
                    <div className="sm:row-span-2 bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 6 - Horizontal */}
                    <div className="sm:col-span-2 bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 7 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 8 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 9 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 10 - Vertical */}
                    <div className="sm:row-span-2 bg-gray-300 rounded-2xl animate-pulse"></div>
                    
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 9 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>
                    
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>

                    {/* Card 9 - Quadrado */}
                    <div className="bg-gray-300 rounded-2xl animate-pulse"></div>
                </div>
            </div>
        </main>
    );
}
