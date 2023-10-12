import TaskCard from "./TaskCard";

// UseContext will go here 

function TaskContainer( /*use Context data goes here*/ ) {
    return (
    <div className="cards">
        {data.map((data) => (
            <TaskCard /* data.id etc */ ></TaskCard>
        ))}
    </div>
);
}

export default TaskContainer;