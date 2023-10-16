import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../Context"

function LoginForm({setSignup}) {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    const [formState, setFormState] = useState({
        username: '',
        password: ''
    })
    
    function onChange(e) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    
    function onSubmit(e) {
        console.log("hello")
        e.preventDefault()
        fetch('http://127.0.0.1:5555/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formState)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user)).then(history.push("/"))
            }
        })
    }

    return (
        <> 
        <h2>Please Log in or Sign up!</h2>
            <form onSubmit = { onSubmit }>
                <label>
                    Username
                </label>
                <input type='text' name='username' value={ formState.username } onChange={ onChange } />
                <>
                <label>
                Password
                </label>
                <input type='password' name='password' value={ formState.password } onChange={ onChange } />
                </>
                <button type='submit'>Submit</button>
            </form>
            {/* <button >{setSignup}</button> */}
        </>
    )
}

export default LoginForm