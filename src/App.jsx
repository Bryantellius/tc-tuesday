import "./App.css";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import list from "./data/list";
import dayjs from "dayjs";
import Todo from "./components/todo";
import Completed from "./components/completed";

const App = () => {
  const [todoTasks, setToDoTasks] = useState(list);
  const [completedTasks, setCompletedTasks] = useState([]);

  const updateTaskList = (e) => {
    console.log(e);
    if (!e.destination) return;
    if (
      e.destination.droppableId === "completed" &&
      e.source.droppableId === "todo"
    ) {
      const newList = [...completedTasks];
      const [movedItem] = todoTasks.splice(e.source.index, 1);
      newList.splice(e.destination.index, 0, movedItem);

      setCompletedTasks(newList);
    } else if (
      e.destination.droppableId === "todo" &&
      e.source.droppableId === "completed"
    ) {
      const newList = [...todoTasks];
      const [movedItem] = completedTasks.splice(e.source.index, 1);
      newList.splice(e.destination.index, 0, movedItem);

      setToDoTasks(newList);
    }
  };

  return (
    <main className="App">
      <h1>
        tuesday.com {" | "}
        {dayjs().format("MM-DD-YY")}
      </h1>
      <hr />
      <section className="container board">
        <DragDropContext onDragEnd={updateTaskList}>
          <div className="row h-100">
            <div className="col-md-6">
              <h3 className="text-center">To Do</h3>
              <Todo tasks={todoTasks} updateTaskList={updateTaskList} />
            </div>
            <div className="col-md-6">
              <h3 className="text-center">Completed</h3>
              <Completed
                tasks={completedTasks}
                updateTaskList={updateTaskList}
              />
            </div>
          </div>
        </DragDropContext>
      </section>
    </main>
  );
};

export default App;
