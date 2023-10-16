import TaskCard from "./TaskCard";

// UseContext will go here 

function TaskContainer( {tasks} ) {
    return (
    <div className="Cards">
        {tasks.map((task) => (
            <TaskCard
            key = {task.id}
            {...task}
            >
            </TaskCard>
            ))}
    </div>
);
}

export default TaskContainer;