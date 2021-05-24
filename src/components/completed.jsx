import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const completed = ({ tasks }) => {
  return (
    <Droppable droppableId="completed">
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
  );
};

export default completed;
