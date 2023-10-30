import MyTasks from "./MyTasksPage"

function MyTaskCard( {about, title} ) {
return(
    <div className="MyTasksCards">
            <h2
            id="MyTaskTitle">{title}</h2>
            <div
            id="MyTaskAbout"
            >{about}
            </div>
    </div>
)
}

export default MyTaskCard
