// information from DB will be imported here


function TaskCard({id, title, about, time_requirement}){
    function handleDelete(id){
        fetch('http://localhost:5555/task/' + id, 
        {
        method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    return(
            <div className="TaskCard">
                <select className="Dropdown">
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Engineering">Engineering</option>
                </select>
                <h1>{title}</h1>
                <p>{about}</p>
                <p>{time_requirement}</p>
                <button onClick={(e) => handleDelete(id)}>Delete</button>
            </div>
    )
}

export default TaskCard
