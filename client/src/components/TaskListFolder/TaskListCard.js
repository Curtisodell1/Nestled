import React, {useState, useContext} from 'react'
import { UserContext } from '../Context'


function TaskListCard({name, id}){
    const {user} = useContext(UserContext)

    function assignPresetToUser(e, id){{
        let addToUser = {
            "user_id": (user.id),
            "task_container_id": id,
            "complete": false
        }
        console.log(addToUser)
        fetch("/presets", {
            method: "POST",
            headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(addToUser),
        })
            .then((res) => res.json())
    }
}

    return(
        <div>
        <h1>{name}</h1>
        <p>{id}</p>
        <button onClick={() => assignPresetToUser}>Add to my list</button>
        </div>
    )
}

export default TaskListCard