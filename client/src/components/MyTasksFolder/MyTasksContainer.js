import MyTasksCard from "./MyTasksCard"

function TaskContainer( {myTasks} ) {
    return (
    <div className="MyTasksCardContainer">
        {myTasks.map((task) => (
            <MyTasksCard
            {...task}
            >
            </MyTasksCard>))}
    </div>
);
}

export default TaskContainer;