import TaskListCard from "./TaskListCard";


function TaskListList( {presets} ) {
    return (
    <div className="PresetCard">
        {presets.map((preset) => (
            <TaskListCard
            key = {preset.id}
            {...preset}
            />
        ))}
    </div>
)
}

export default TaskListList;