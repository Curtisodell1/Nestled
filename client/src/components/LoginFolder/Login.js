import React, {useState} from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function Login (){

    const [signup, setSignup] = useState(false)

    return(
        <div>
            {signup
            ?
            <SignupForm 
            setSignup = {setSignup} >
            </SignupForm>
            :
            <LoginForm
            setSignUp = {setSignup} >
            </LoginForm>
            }
        </div>
    )
}

export default Login
