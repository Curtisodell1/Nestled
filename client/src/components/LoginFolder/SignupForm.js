// import React, {useState, useContext} from "react"
// import { useHistory } from "react-router-dom"
// import { UserContext } from "../../context/UserContext"

// function SignupForm({setSignup}) {
//     const history = useHistory()
//     const {user, setUser} = useContext(UserContext)

//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//     })
    
//     function onChange(e) {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })
//     }
    
//     function onSubmit(e) {
//         e.preventDefault()
//         fetch("/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//             },
//             body: JSON.stringify(formData)
//         }).then((r) => {
//             if (r.ok) {
//                 r.json().then((user) => setUser(user)).then(history.push("/"))
//             }
//         })
//     }

// function SignupForm(){
    
//     return(
//     <div>
//         <form handleSubmit={handleSubmit}>
//             <h1>Signup</h1>
//             <div>
//                 <input></input>
//             </div>
//             <div>
//                 <input></input>
//             </div>
//             <div>
//                 <button>
//                     Submit
//                 </button>
//             </div>
//         </form>
//     </div>
//     )
// }

// export default SignupForm