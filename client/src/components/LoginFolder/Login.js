import React, {useState} from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function Login(){

    const [signup, setSignup] = useState(false)


    return(
        <div>
            {signup
            ?
            <div>
            <SignupForm 
            setSignup = {setSignup} >
            </SignupForm>
            <button onClick={() => setSignup(!signup)}>Login</button>
            </div>
            :
            <div>
            <LoginForm
            setSignUp = {setSignup} >
            </LoginForm>
            <button onClick={() => setSignup(!signup) }>Signup</button>
            </div>
            }
        </div>
    )
}

export default Login
