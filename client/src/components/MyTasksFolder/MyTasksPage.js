import React, {useState, useEffect, useContext} from "react"
import MyTasksContainer from "./MyTasksContainer"
import { UserContext } from "../Context"


function MyTasks(){
    const [myTasks, setMyTasks] = useState([])
    const {user} = useContext(UserContext)

    useEffect(() => {
        fetch("/mytasks/" + user.id )
        .then((r) => r.json())
        .then((data) => setMyTasks(data) )
    }, [])

    return (
        <MyTasksContainer
        myTasks={myTasks}
        >   
        </MyTasksContainer>
    )
}

export default MyTasks