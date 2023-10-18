import MyTasksCard from "./MyTasksCard"

function TaskContainer( {myTasks} ) {
    return (
    <div className="Cards">
        {myTasks.map((task) => (
            <MyTasksCard
            {...task}
            >
            </MyTasksCard>))}
    </div>
);
}

export default TaskContainer;