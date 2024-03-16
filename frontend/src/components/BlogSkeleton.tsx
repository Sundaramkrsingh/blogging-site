import { Dot } from "./BlogCard";

export default function() {
    return <div role="status" className="animate-pulse">
        <div className="p-4 border-b border-gray-200 drop-shadow-md w-screen pb-4 max-w-screen-lg">
            <div className="flex">
                <div className="flex flex-col justify-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="pl-2 text-xs text-gray-500 flex flex-col justify-center">
                    <Dot />
                </div>
                <div className="pl-2 text-gray-500 text-sm flex flex-col justify-center">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div> 
            </div>
            <div className="pt-3 text-2xl font-bold">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-lg pt-3">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-gray-500 text-xs pt-5">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
    </div>
}