import TaskCard from "./TaskCard";

// UseContext will go here 

function TaskContainer( {tasks, presets, setTasks} ) {
    return (
    <div className="Cards">
        {tasks.map((task) => (
            <TaskCard
            key = {task.id}
            {...task}
            tasks={tasks}
            presets={presets}
            setTasks={setTasks}
            >
            </TaskCard>
            ))}
    </div>
);
}

export default TaskContainer;