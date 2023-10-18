import MyTasksCard from "./MyTasksCard"

function TaskContainer( {myTasks} ) {
    console.log(myTasks)
    return (
    <div className="Cards">
        {myTasks.map((myTask) => (
            <MyTasksCard
            key = {myTask.task_container.tasks.id}
            {...myTask.task_container.tasks}
            >
            </MyTasksCard>
            ))}
    </div>
);
}

export default TaskContainer;