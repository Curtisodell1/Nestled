import React, {useState, useContext} from 'react'
import { UserContext } from '../Context'


function TaskListCard({name, id}){
    const {user} = useContext(UserContext)
    const [taskId, setTaskId] = useState(id)


    function assignPresetToUser(){{
        let addToUser = {
            "user_id": user.id,
            "task_container_id": taskId,
            "complete": parseInt(0)
        }
        console.log(addToUser)
        fetch("/assignments", {
            method: "POST",
            headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(addToUser),
        })
        .then((res) => res.json())
    }
}

    // function deletePresetForUser(){

    // }

    return(
        <div className='TaskCard'>
        <h1>{name}</h1>
        <p>{id}</p>
        <button onClick={(e) => assignPresetToUser(e)}>Add to my list</button>
        {/* <button onClick={(e)=> deletePresetForUser(e)}>Remove from my list</button> */}
        </div>
    )
}

export default TaskListCard