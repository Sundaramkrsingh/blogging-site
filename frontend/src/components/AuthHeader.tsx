import { Link } from "react-router-dom"

export default function({type}: {type: 'signup' | 'signin'}) {
    return <div className="px-10">
        <div className="text-3xl font-bold">
            {type === 'signup'? 'Create an account': 'Sign in to account'}
        </div>
        <div className="text-gray-500 font-medium text-center">
            {type === 'signup'? 'Already have an account?': "Don't have an account?"}
            <Link to={type === 'signup'? '/signin': '/signup'} className="pl-1 underline">{type === 'signup'? 'Sign in': 'Sign up'}</Link>
        </div>
    </div>
}