import TaskListList from "./TaskListContainer"
import {useState, useEffect} from 'react'



function TaskList(){
    const [presets, setPresets] = useState([])
    useEffect(() => {
        fetch("/presets")
        .then((r) => r.json())
        .then((data) => setPresets(data) )
    }, [])
    
    return(
        <TaskListList presets={presets}></TaskListList>
    )
}

export default TaskList