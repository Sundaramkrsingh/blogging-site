import { useState } from "react";
import { SignupInput } from "@sundaram_11/medium-common";
import AuthHeader from "./AuthHeader";
import AuthButton from "./AuthButton";
import { InputBox } from "./AuthInputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function() {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: '',
        password: '',
        name: ''
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs)

            const jwt = response.data
            localStorage.setItem('token', jwt)
            navigate('/blogs')
        } catch(e) {
            alert('Error while signing Up')
        }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <AuthHeader type='signup' />
                <div>
                    <InputBox label='Username' placeholder='Enter your username' onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} />

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

                    <AuthButton type='signup' onClick={sendRequest} />
                </div>
            </div>
        </div>
    </div>
}