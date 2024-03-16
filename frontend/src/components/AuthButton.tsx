interface buttonInputs {
    type: 'signup' | 'signin';
    onClick: () => void;
}

export default function({type, onClick}: buttonInputs) {

    return <button type="button" onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900    focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">{type === 'signup'? 'Sign up': 'Sign in'}</button>
}