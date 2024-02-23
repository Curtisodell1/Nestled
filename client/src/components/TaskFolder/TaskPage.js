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
    // Come back and change form to be dynamic and update to default state after submit
    // const [form, setForm] = useState({
    //     title:'',
    //     about:'',
    //     timeRequirement:''
    // })

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
        .then(task => setTasks([...tasks, task]))
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
            <div className='PageHeader'>
                <h1 className='HeaderText'>Task Library</h1>
                <div className='HeaderPageSpacer'></div>
            </div>
            <div className="CenterContainer">
                <div className="FormHolder">
                    <form onSubmit={handleSubmit} className="TaskPageForm">
                        <input 
                        className='FormInputField'
                        placeholder="Task Title"
                        type = "text"
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <input 
                        className='FormInputField'
                        placeholder="Task Description"
                        onChange={(e) => setAbout(e.target.value)}
                        />
                        <input 
                        className='FormInputField'
                        placeholder="time to complete"
                        onChange={(e) => setTimeRequirement(e.target.value)}
                        />
                        <select 
                        className="FormInputField">
                            {presets.map((preset) => 
                            <option value={preset.id}>{preset.name}</option>) }
                        </select>
                        <button
                        type="submit">
                        Submit
                        </button>
                    </form>
                </div>
            </div>
            <TaskContainer
            tasks={tasks}
            presets={presets}
            setTasks={setTasks}
            >
            </TaskContainer>
        </div>
    )
}

export default Task