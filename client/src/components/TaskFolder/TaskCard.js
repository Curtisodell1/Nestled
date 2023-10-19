import React, {useState, useEffect} from 'react'

function TaskCard({id, title, about, time_requirement, task_container_id, presets}){

    const [presetId, setPresetId] = useState("")

    useEffect(() => setPresetId(task_container_id) ,[])

    function handleDelete(id){
        fetch('/task/' + id, 
        {
        method: 'DELETE',
        })
        .then(res => res.json())
        
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
            <div className="TaskCard">
                <select className="Dropdown" 
                value={presetId}
                onChange={(e) => handlePresetChange(e)}
                id = "PresetDropDown"
                >
                    {presets.map((preset) => 
                    <option 
                    value={preset.id}
                    >
                    {preset.name}
                    </option>) }
                </select>
                <h1>{title}</h1>
                <p>{about}</p>
                <p>{time_requirement}</p>
                <button onClick={(e) => handleDelete(id)}>Delete</button>
            </div>
    )
}

export default TaskCard
