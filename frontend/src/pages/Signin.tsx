import Quote from "../components/Quote"
import AuthSignin from "../components/AuthSignin"

export default function() {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthSignin />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
} 