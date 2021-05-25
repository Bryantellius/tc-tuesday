import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const completed = ({ tasks, addTask, setTasks }) => {
  const createTask = (e) => {
    const task = document.getElementById("completedInput");
    if (task.value.trim().length === 0) {
      return;
    } else if (e.keyCode === 13 || e.type === "click") {
      addTask(task.value, "backlog");
      task.value = "";
    }
  };

  return (
    <>
      <Droppable droppableId="backlog">
        {(provided) => (
          <ul
            className="tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index, arr) => {
              return (
                <Draggable
                  key={index + task.id}
                  draggableId={task.id}
                  index={index}
                >
                  {(provided) => (
                    <TaskCard
                      tasks={arr}
                      provided={provided}
                      setTasks={setTasks}
                      task={task}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <div className="row no-gutters">
        <div className="p-0 col-10">
          <input
            id="completedInput"
            type="text"
            placeholder="+ Add"
            className="form-control squared"
            onKeyUp={createTask}
          />
        </div>
        <div className="p-0 col-2">
          <button
            className="btn btn-primary squared w-100"
            onClick={createTask}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default completed;
