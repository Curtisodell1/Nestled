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

// function handleDelete(){
//     fetch('/assignment' + id, 
//     {
//     method: 'DELETE',
//     })
//     .then(res => res.json())
// }

    return(
        <div className='PresetCards'>
        <h1
        className='PresetHeader'>{name}</h1>
        <button
        className='Buttons' onClick={(e) => assignPresetToUser(e)}>Add to my list</button>
        {/* <button onClick={(e) => handleDelete(e)}>Remove from my ToDo list</button> */}
        </div>
    )
}

export default TaskListCard