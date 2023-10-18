import TaskCard from "./TaskCard";

// UseContext will go here 

function TaskContainer( {tasks, presets} ) {
    return (
    <div className="Cards">
        {tasks.map((task) => (
            <TaskCard
            key = {task.id}
            {...task}
            presets={presets}
            >
            </TaskCard>
            ))}
    </div>
);
}

export default TaskContainer;