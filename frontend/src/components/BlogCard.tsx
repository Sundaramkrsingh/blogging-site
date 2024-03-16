import clsx from "clsx";
import { Link } from "react-router-dom";

interface cardInputs {
    id: string;
    authorName: string;
    title: string;
    content: string; 
    publishedDate: string;
}

export default function({
    id,
    authorName,
    title,
    content, 
    publishedDate
}: cardInputs) {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-gray-200 drop-shadow-md pb-4 max-w-screen-lg">
            <div className="flex">
                <div className="flex flex-col justify-center">
                    <Avatar name={authorName} size="small" /> 
                </div>
                <div className="pl-1 text-sm flex flex-col justify-center">{authorName}</div> 
                <div className="pl-2 text-xs text-gray-500 flex flex-col justify-center">
                    <Dot />
                </div>
                <div className="pl-2 text-gray-500 text-sm flex flex-col justify-center">{publishedDate}</div> 
            </div>
            <div className="pt-3 text-2xl font-bold">
                {title}
            </div>
            <div className="text-lg pt-3">
                {content.slice(0, 100) + '...'}
            </div>
            <div className="text-gray-500 text-xs pt-5">
                {`${Math.ceil(content.length/100)} min read`}
            </div>
        </div>
    </Link>
}

export function Avatar({name, size}: { name: string, size: 'small' | 'big' }) {
    const divSizeClass = (size === 'small'? 'w-5 h-5': 'w-10 h-10')
    const textSizeClass = (size === 'small'? 'text-xs': 'text-md')
    return <div className={clsx("relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600", divSizeClass)}>
        <span className={clsx(" text-gray-600 dark:text-gray-300", textSizeClass)}>
            {name[0]}
        </span>
    </div>
}

export function Dot() {
    return <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
}