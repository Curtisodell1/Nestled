import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Task from "./TaskFolder/Task";
import TaskList from "./TaskListFolder/TaskList";
import Entry from "./Entry";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";

function App() {
  return (
  <div>
    
    <Header> </Header>
      <Route exact path = "/">
        <Home>
          <h1>hi</h1>
        </Home>
      </Route>
      <Route exact path = "/task">
        <Task></Task> 
      </Route>
      <Route exact path = "/tasklist">
      <TaskList> </TaskList>
      </Route>
      <Route exact path = "/entry">
        <Entry> </Entry>
      </Route>
      <Route exact path = "/login">
        <Login> </Login>
      </Route>
      <Route exact path = "/signup">
        <Signup> </Signup>
      </Route>
  </div>
  )
}

export default App;
