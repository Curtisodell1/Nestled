import React, {useState, useEffect, useContext} from 'react'
import TaskContainer from './TaskContainer'
import { UserContext } from "../Context"

function Task( {onAddTask}){
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [timeRequirement, setTimeRequirement] = useState("")
    const [tasks, setTasks] = useState([])
    const [presets, setPresets] = useState([])
    const {user} = useContext(UserContext)

    console.log(user)

    function handleSubmit(e) {
        e.preventDefault();
        let newTask = {
            "title" : title,
            "about" : about,
            "time_requirement": parseInt(timeRequirement),
            "user_id" : user.id
        }
        console.log(newTask)
        fetch("/tasks", {
            method: "POST",
            headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(newTask),
        })
            .then((res) => res.json())
    }

    useEffect(() => {
        fetch("/tasks")
        .then((r) => r.json())
        .then((data) => setTasks(data) )
    }, [])

    useEffect(() => {
        fetch("/presets")
        .then((r) => r.json())
        .then((data) => setPresets(data) )
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
                    {presets.map((preset) => 
                    <option value={preset.id}>{preset.name}</option>) }
                </select>
                <button
                type="submit">
                Submit
                </button>
            </form>
            <TaskContainer
            tasks={tasks}
            presets={presets}
            >
            </TaskContainer>
            <div>
                Here
            </div>
        </div>
    )
}

export default Task