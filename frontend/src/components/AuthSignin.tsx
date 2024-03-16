import { useState } from "react";
import { SigninInput } from "@sundaram_11/medium-common";
import AuthHeader from "./AuthHeader";
import AuthButton from "./AuthButton";
import { InputBox } from "./AuthInputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function() {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: '',
        password: ''
    })
    
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs)

            const jwt = response.data
            localStorage.setItem('token', jwt)
            navigate('/blogs')
        } catch(e) {
            alert('Error while Signing In')
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <AuthHeader type='signin' />
                <div>
                    <InputBox label='Email' placeholder='abc@gmail.com' onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />

                    <InputBox label='Password' type='password' placeholder='' onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />

                    <AuthButton type='signin' onClick={sendRequest} />
                </div>
            </div>
        </div>
    </div>
}