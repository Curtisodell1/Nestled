import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Task from "./TaskFolder/Task";
import TaskList from "./TaskListFolder/TaskList";
import Entry from "./Entry";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return 
  <div>
    <Header> </Header>
    <Route >

    </Route>
    <Task> </Task> 
    <TaskList> </TaskList>
    <Entry> </Entry>
    <Login> </Login>
    <Signup> </Signup>
  </div>
  
  
  
}

export default App;
