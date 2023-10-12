import TaskListList from "./TaskListList"
import {useState, useEffect} from 'react'



function TaskList(){
    const [presets, setPresets] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:5555/presets")
        .then((r) => r.json())
        .then((data) => setPresets(data) )
    }, [])
    
    return(
        <TaskListList presets={presets}></TaskListList>
    )
}

export default TaskList