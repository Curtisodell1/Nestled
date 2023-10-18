import React, {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../Context"

function SignupForm({setSignup}) {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    
    function onChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    function onSubmit(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user)).then(history.push("/"))
            }
        })
    }
    
    return(
    <div>
        <h2>You know what to do (hint: signup)</h2>
        <form onSubmit = { onSubmit }>
            <label>
            Username
            </label>
            <input type='text' name='username' value={ formData.username } onChange={ onChange } />
            <>
            <label>
            Password
            </label>
            <input type='password' name='password' value={ formData.password } onChange={ onChange } />
            </>
            <button type='submit'>Submit</button>
        </form>
    </div>
    )
}

export default SignupForm