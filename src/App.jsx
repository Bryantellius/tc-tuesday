import "./App.css";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import faker from "faker";
import dayjs from "dayjs";
import Board from "./components/board";

const App = () => {
  const [todoTasks, setToDoTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = (task, board) => {
    const newTasks = [
      ...(board === "sprint" ? todoTasks : completedTasks),
      {
        id: faker.datatype.uuid(),
        avatar: "",
        task,
        status: "dark",
      },
    ];
    board === "sprint" ? setToDoTasks(newTasks) : setCompletedTasks(newTasks);
  };

  const updateTaskList = (e) => {
    console.log(e);
    if (!e.destination) return;
    if (
      e.destination.droppableId === "backlog" &&
      e.source.droppableId === "sprint"
    ) {
      const newList = [...completedTasks];
      const [movedItem] = todoTasks.splice(e.source.index, 1);
      newList.splice(e.destination.index, 0, movedItem);

      setCompletedTasks(newList);
    } else if (
      e.destination.droppableId === "sprint" &&
      e.source.droppableId === "backlog"
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
            <div className="col-12">
              <h3 className="text-left">Sprint</h3>
              <Board
                tasks={todoTasks}
                setTasks={setToDoTasks}
                addTask={addTask}
                droppableId="sprint"
              />
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12">
              <h3 className="text-left">Backlog</h3>
              <Board
                tasks={completedTasks}
                addTask={addTask}
                droppableId="backlog"
                setTasks={setCompletedTasks}
              />
            </div>
          </div>
        </DragDropContext>
      </section>
    </main>
  );
};

export default App;
