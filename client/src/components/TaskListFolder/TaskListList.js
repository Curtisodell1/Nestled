import TaskListCard from "./TaskListCard";


function TaskListList( {presets} ) {
    return (
    <div>
        {presets.map((preset) => (
            <TaskListCard
            key = {preset.id}
            {...preset}a
            />
        ))}
    </div>
)
}

export default TaskListList;