import { Link } from "react-router-dom"
import React, {useContext, useState} from 'react'
import { UserContext } from "./Context"
import CheckSession from "./CheckSession"

function Header(){
    
    const {user, setUser} = useContext(UserContext)

    function logout(){
        fetch('/logout', 
        {
        method: 'DELETE',
        })
        .then(res => res.json())
        .then(setUser())
        .then(CheckSession())
        }
    
    return(
        <div className="HeaderStyle">
            <span className="NavBarButtonContainer">
                <button>
                    <Link to = "/" >
                        <button>
                            Home
                        </button>
                    </Link> 
                    <Link to = "/task">
                        <button>
                            Task
                        </button>
                    </Link>
                    <Link to ="/tasklist">
                        <button>
                            Preset Tasks
                        </button>
                    </Link>
                    {/* <Link to = "/entry">
                        <button>
                            Entry
                        </button>
                    </Link> */}
                    <Link to = "/mytasks">
                        <button>
                            MyTasks
                        </button>
                    </Link>
                </button>
            </span>
            <span className="LoginButtonContainer">
                <button
                onClick={() => logout}
                >
                Logout
                </button>
            </span>
        </div>
    )
}

export default Header