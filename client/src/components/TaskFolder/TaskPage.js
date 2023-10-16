import React, {useState, useEffect} from 'react'
import TaskContainer from './TaskContainer'


function Task( {onAddTask}){
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [timeRequirement, setTimeRequirement] = useState("")
    const [tasks, setTasks] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        let newTask = {
            "title" : title,
            "about" : about,
            "time_requirement": parseInt(timeRequirement)
        }
        console.log(newTask)
        fetch("http://localhost:5555/tasks", {
            method: "POST",
            headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(newTask),
        })
            .then((res) => res.json())
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5555/tasks")
        .then((r) => r.json())
        .then((data) => setTasks(data) )
    }, [])

    return(
        <div id="TaskPageContainer">
            <div>
                <h1>Task Currently being worked on</h1>
            </div>
            <form onSubmit={handleSubmit} className="TaskPageForm">
                <input placeholder="Task Title"
                type = "text"
                onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                placeholder="Task Description"
                onChange={(e) => setAbout(e.target.value)}
                />
                <input 
                placeholder="time to complete"
                onChange={(e) => setTimeRequirement(e.target.value)}
                />
                <select className="Dropdown">
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Engineering">Engineering</option>
                </select>
                <button
                type="submit">
                Submit
                </button>
            </form>
            <TaskContainer
            tasks={tasks}
            >
            </TaskContainer>
            <div>
                Here
            </div>
        </div>
    )
}

export default Task