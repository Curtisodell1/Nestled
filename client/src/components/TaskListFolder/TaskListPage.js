import TaskListList from "./TaskListContainer"
import {useState, useEffect} from 'react'


function TaskList(){

    const [presets, setPresets] = useState([])
    const [presetName, setPresetName] = useState("")
    
    useEffect(() => {
        fetch("/presets")
        .then((r) => r.json())
        .then((data) => setPresets(data) )
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        console.log(presetName)
        fetch()
    }

    function handleSubmit(e) {
        e.preventDefault();
        let newPreset = {
            "name" : presetName,
            
        }
        console.log(newPreset)
        fetch("/presets", {
            method: "POST",
            headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(newPreset),
        })
        .then((res) => res.json())
    }

    return(
        <>
        <span>
            <div>
            <div className='PageHeader'>
                <h1 className='HeaderText'>Preset Library</h1>
                <div className='HeaderPageSpacer'></div>
            </div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <span>
                <input 
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="New Preset Name"
                ></input>
                <button type="submit">submit</button>
                </span>
            </form>
            </div>
        </span>
        <TaskListList presets={presets}></TaskListList>
        </>
    )
}

export default TaskList