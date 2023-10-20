import { Link } from "react-router-dom"
import React, {useContext} from 'react'
import { UserContext } from "./Context"
import CheckSession from "./CheckSession"

function Header(){
    
    const {user, setUser} = useContext(UserContext)

    function logout(){
        fetch('/logout', 
        {
        method: 'DELETE',
        })
        .then((r) => 
        {
        if (r.ok) 
        {
            setUser(null)
        }})}

    
    return(
        <div className="HeaderStyle">
            <span className="NavBarButtonContainer">
                    <Link to = "/" >
                        <button className="Buttons">
                            Home
                        </button>
                    </Link> 
                    <Link to = "/task">
                        <button className="Buttons">
                            Task
                        </button>
                    </Link>
                    <Link to ="/tasklist">
                        <button className="Buttons">
                            Preset Tasks
                        </button>
                    </Link>
                    {/* <Link to = "/entry">
                        <button>
                            Entry
                        </button>
                    </Link> */}
                    <Link to = "/mytasks">
                        <button className="Buttons">
                            MyTasks
                        </button>
                    </Link>
            </span>
            <span className="LoginButtonContainer">
                <button
                className="Buttons"
                onClick = { () => logout()}
                >
                Logout
                </button>
            </span>
        </div>
    )
}


export default Header