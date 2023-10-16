import React from "react";
import CheckSession from "./CheckSession"
import { UserProvider } from "./Context";


function App() {
  return (
      <UserProvider>
        <CheckSession/>
      </UserProvider>
  )
}

export default App;

// import React, { useEffect, useState} from "react";
// import { Switch, Route, useHistory } from "react-router-dom";
// import Task from "./TaskFolder/TaskPage";
// import TaskListPage from "./TaskListFolder/TaskListPage"
// import Entry from "./Entry";
// import Header from "./Header";
// import Login from "./Login"
// import Home from "./Home";


// function App() {

//   const [tasks, setTasks] = useState([])


//   // const [user, setUser] = useState(null)
//   // const history = useHistory()

//   // useEffect(() => {
//   //   fetchUser()
//   // },[])

//   // const fetchUser = () => {
//   //     fetch( '/auto_login' )
//   //     .then( r => {
//   //       console.log( r )
//   //       if ( r.status === 200 ) {
//   //         r.json().then( setUser )
//   //       }
//   //     })
//   //   }

//   function onAddTask(newTask) {
//     setTasks([...tasks, newTask]);
//   }

//   return (
//   <div>
//     <
//     {/* <Header></Header>
//       <Route exact path = "/">
//         <Home></Home>
//       </Route>
//       <Route exact path = "/task">
//         <Task onAddTask={onAddTask}></Task> 
//       </Route>
//       <Route path = "/tasklist">
//         <TaskListPage></TaskListPage>
//       </Route>
//       <Route path = "/entry">
//         <Entry> </Entry>
//       </Route>
//       <Route path = "/login">
//         <Login> </Login>
//       </Route> */}
//   </div>
//   )
// }

// export default App;
