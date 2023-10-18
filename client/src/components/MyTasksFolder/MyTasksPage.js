import React, {useState, useEffect} from "react"
import MyTasksContainer from "./MyTasksContainer"

function MyTasks(){
    const [myTasks, setMyTasks] = useState([])

    useEffect(() => {
        fetch("/mytasks")
        .then((r) => r.json())
        .then((data) => 
        {
            console.log(data)
            setMyTasks(data)
        })
    }, [])
        
    return (
        <MyTasksContainer
        myTasks = {myTasks}
        >
        </MyTasksContainer>
        
    )
}

export default MyTasks