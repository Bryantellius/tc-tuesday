import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const todo = ({ tasks, updateTaskList }) => {
  return (
    <>
      <Droppable droppableId="todo">
        {(provided) => (
          <ul
            className="tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((user, index) => {
              return (
                <Draggable
                  key={index + user.name}
                  draggableId={index + user.name}
                  index={index}
                >
                  {(provided) => <TaskCard provided={provided} user={user} />}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <hr />
      <div className="row">
        <div className="p-0 col-10">
          <input
            type="text"
            placeholder="Some Task..."
            className="form-control"
          />
        </div>
        <div className="p-0 col-2">
          <input
            type="text"
            name="user"
            id="userForTask"
            className="form-control"
            placeholder="User"
            list="users"
          />
          <datalist id="users">
            <option value="Ben">BB</option>
            <option value="Whit">WS</option>
            <option value="John">JW</option>
            <option value="Jeremy">JH</option>
            <option value="Michael">MD</option>
            <option value="Martin">MM</option>
          </datalist>
        </div>
      </div>
    </>
  );
};

export default todo;
