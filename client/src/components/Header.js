import { Link } from "react-router-dom"

function Header(){
    
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
            <Link to ="/">
                <button>
                    Login
                </button>
            </Link>
            {/* <Link to = "/signup" >
                <button>
                    Signup
                </button>
            </Link> */}
            </span>
        </div>
    )
}

export default Header