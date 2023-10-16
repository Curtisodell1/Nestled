
import React, { useEffect, useState} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Task from "./TaskFolder/TaskPage";
import TaskListPage from "./TaskListFolder/TaskListPage"
import Entry from "./Entry";
import Header from "./Header";
import Home from "./Home";


function Main() {

const [tasks, setTasks] = useState([])

function onAddTask(newTask) {
setTasks([...tasks, newTask]);
}

return (
    <div>
            <Header/>
        <Route exact path = "/">
            <Home></Home>
        </Route>
        <Route exact path = "/task">
            <Task onAddTask={onAddTask}/> 
        </Route>
        <Route path = "/tasklist">
            <TaskListPage/>
        </Route>
        <Route path = "/entry">
            <Entry/>
        </Route>
    </div>
    )
}

export default Main;