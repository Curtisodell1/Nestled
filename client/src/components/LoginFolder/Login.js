import React, {useState} from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function Login(){

    const [signup, setSignup] = useState(false)
    

    return(
        <div>
            <div className='PageHeader'>
                <h1 className='HeaderText'>Login</h1>
                <div className='HeaderPageSpacer'></div>
            </div>
            <div className='LoginBody'>
            {signup
            ?
            <div>
            <SignupForm 
            setSignup = {setSignup} >
            </SignupForm>
            <button className="Buttons" onClick={() => setSignup(!signup)}>Login</button>
            </div>
            :
            <div>
            <LoginForm
            setSignUp = {setSignup} >
            </LoginForm>
            <button className='Buttons' onClick={() => setSignup(!signup) }>Signup</button>
            </div>
            }
            </div>
            
        </div>
    )
}

export default Login
