

function TaskCard({id, title, about, time_requirement, task_container_id, presets}){
    
    function handleDelete(id){
        fetch('http://localhost:5555/task/' + id, 
        {
        method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    function handlePresetChange(){
        console.log("Hi")
        // build patch method here 
    }

    return(
            <div className="TaskCard">
                <select className="Dropdown" 
                value={task_container_id}
                onChange={() => handlePresetChange()}
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
                <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
    )
}

export default TaskCard
