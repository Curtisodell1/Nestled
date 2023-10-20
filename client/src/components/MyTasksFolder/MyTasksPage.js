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
        <div>
        <div className='PageHeader'>
            <h1 className='HeaderText'>Assigned Tasks</h1>
            <div className='HeaderPageSpacer'></div>
        </div>
        <MyTasksContainer
        myTasks = {myTasks}
        >
        </MyTasksContainer>
        </div>
    )
}

export default MyTasks