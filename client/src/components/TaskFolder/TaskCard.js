import React, {useState, useEffect} from 'react'

function TaskCard({id, title, about, time_requirement, task_container_id, presets, tasks, setTasks}){

    const [presetId, setPresetId] = useState("")

    useEffect(() => setPresetId(task_container_id) ,[])

    function handleDelete(id){
        fetch('/task/' + id, 
        {
        method: 'DELETE',
        })
        .then(setTasks(tasks.filter( ( task ) => {
            if ( task.id === id ) {
                return false }
            }))
        )
    }

    function handlePresetChange(e){
        fetch('/task/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            task_container_id: e.target.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then(setPresetId(task_container_id))
    }
    

    return(
    <div>
        <div className='Card'>
            <div
            className='CardHeader'>
            <h1 
            
            >{title}</h1>
            </div>
            <p 
            className='CardBodyText'
            >{about}
            </p>
            
            <p

            >Time Required: {time_requirement} minutes
            </p>
            <span>
            <select
            className="Buttons"
            value={presetId}
            onChange={(e) => handlePresetChange(e)}
            >
                {presets.map((preset) => 
                <option 
                value={preset.id}
                >
                {preset.name}
                </option>) }
            </select>
            <button 
            className='Buttons'
            onClick={(e) => handleDelete(id)}
            >
            Delete
            </button>
            </span>
        </div>
    </div>
    )
}

export default TaskCard
