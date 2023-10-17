import { Link } from "react-router-dom"
import React, {useContext, useState} from 'react'
import { UserContext } from "./Context"

function Header(){
    
    const {user, setUser} = useContext(UserContext)

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
                    <Link to = "/entry">
                        <button>
                            Entry
                        </button>
                    </Link>
                    <Link to = "/">
                        <button>
                            TBD
                        </button>
                    </Link>
                </button>
            </span>
            <span className="LoginButtonContainer">
                <button
                onClick={() => setUser(null)}>
                Logout
                </button>
            </span>
        </div>
    )
}

export default Header