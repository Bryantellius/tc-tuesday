# tuesday.com

- Clone of monday.com for React practice

## Part 1: Setup

1. Use `create-react-app` to jumpstart a react project
2. Delete unnecessary files/packages
3. Install dayjs, faker, react-beautiful-dnd, and bootstrap npm packages
4. In the App.jsx, import:

```
import "./App.css";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import faker from "faker";
import dayjs from "dayjs";
```

5. Create state arrays for sprint and completed tasks with `useState([])`
6. Return the following JSX to start:

```
<main className="App">
      <h1>
        tuesday.com {" | "}
        {dayjs().format("MM-DD-YY")}
      </h1>
      <hr />
      <section className="container board">
        <DragDropContext>
          <div className="row h-100">
            <div className="col-12">
              <h3 className="text-left">Sprint</h3>
              {/* Sprint Component */}
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12">
              <h3 className="text-left">Backlog</h3>
              {/* Backlog Component */}
            </div>
          </div>
        </DragDropContext>
      </section>
    </main>
```

7. Create a folder named `data/` with a `list.js` file with the following:

```
import faker from "faker";

const seedNum = 7;
const list = [{ name: "", avatar: "" }];

for (let i = 1; i <= seedNum; i++) {
  list.push({ name: faker.name.firstName(), avatar: faker.image.avatar() });
}

export default list;
```

## Part 2: Boards

1. Create a `components/` folder
2. Create a `board.jsx` file
3. Import `import { Droppable, Draggable } from "react-beautiful-dnd";`
4. Return

```
<>
      <Droppable droppableId={droppableId}>
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
                    {/* Task Component */}
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
            id="sprintInput"
            type="text"
            placeholder="+ Add"
            className="form-control squared"
          />
        </div>
        <div className="p-0 col-2">
          <button
            className="btn btn-primary squared w-100"
          >
            Add
          </button>
        </div>
      </div>
    </>
```

5. Create a file `TaskCard.jsx` in `components/`, and import `import list from "../data/list";`
6. Return:

```
<li
      className={"list-item"}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <div className="card bg-dark-info squared w-100">
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-8 align-items-center d-flex pl-2">
              <p>{task.task}</p>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <select
                name="avatar"
                id={task.id + "avatar"}
                style={{
                  backgroundImage: `url(${task.avatar})`,
                  backgroundPosition: "50% 0%",
                  backgroundSize: "contain",
                }}
                className={"tasks-avatar"}
                defaultValue=""
              >
                {list.map((i) => {
                  return (
                    <option
                      key={task.id + i.name}
                      value={i.avatar}
                      className="tasks-avatar"
                    >
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={"col-2"}>
              <select
                name="status"
                id={task.id + "status"}
                defaultValue={task.status}
                className={
                  "form-control squared h-100 text-light bg-" + task.status
                }
              >
                <option value="not-started">Not Started</option>
                <option value="working">Working</option>
                <option value="blocked">Blocked</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </li>
```

7. In `App.jsx`, add `import Board from './components/board.jsx` to the imports list
8. Add a function `addTask`:

```
const addTask = (task, board) => {
    const newTasks = [
      ...(board === "sprint" ? todoTasks : completedTasks),
      {
        id: faker.datatype.uuid(),
        avatar: "",
        task,
        status: "not-started",
      },
    ];
    board === "sprint" ? setToDoTasks(newTasks) : setCompletedTasks(newTasks);
  };
```

9. And a function `updateTaskList`:

```
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
```

10. Add the `updateTaskList` function as props to the DragDropContext component:

```
<DragDropContext onDragEnd={updateTaskList}>
...
</DragDropContext>
```

11. Add the `addTask` function, state array lists, `setTasks` function and droppableId props to the Board component:

```
<h3 className="text-left">Sprint</h3>
<Board
  tasks={todoTasks}
  setTasks={setToDoTasks}
  addTask={addTask}
  droppableId="sprint"
/>
...
<h3 className="text-left">Backlog</h3>
<Board
  tasks={completedTasks}
  setTasks={setCompletedTasks}
  addTask={addTask}
  droppableId="backlog"
/>
```

## Part 3

1. In `board.jsx`, destructure the necessary props for the component:

```
const board = ({ tasks, addTask, setTasks, droppableId }) => {...}
```

2. Create a function `createTask` and add it as the onClick eventhandler to the Add button:

```
const createTask = (e) => {
    const task = document.getElementById(droppableId + "Input");
    if (task.value.trim().length === 0) {
      return;
    } else if (e.keyCode === 13 || e.type === "click") {
      addTask(task.value, droppableId);
      task.value = "";
    }
  };
```

```
<button
  className="btn btn-primary squared w-100"
  onClick={createTask}
>
  Add
</button>
```

3. In `TaskCard.jsx`, destructure the necessary props:

```
const TaskCard = ({ provided, task, tasks, setTasks }) => {...}
```

4. Create a `changeStatus` function and add it as the onChange eventhandler for the status select element:

```
const changeStatus = (e) => {
    const newTasks = [...tasks];
    newTasks.map((t) => {
      if (t.id + "status" === e.target.id) {
        t.status = e.target.value;
      }
      return t;
    });
    setTasks(newTasks);
  };
```

```
<select
  ...
  onChange={changeStatus}
>...</select>
```

5. Create a function `changeAvatar` and add it as the onChange eventhandler for the avatar select element:

```
const changeAvatar = (e) => {
    const newTasks = [...tasks];
    newTasks.map((t) => {
      if (t.id + "avatar" === e.target.id) {
        t.avatar = e.target.value;
      }
      return t;
    });
    setTasks(newTasks);
  };
```

```
<select
  ...
  onChange={changeAvatar}
>...</select>
```

6. Test it out!

## Part 4

1. Style it up!
2. Add the following to the `App.css` file:

```
.App {
  text-align: center;
  background-color: #181b34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #e8e8e8;
  padding: 2rem;
}

.bg-not-started {
  background-color: var(--dark) !important;
}
.bg-working {
  background-color: orange !important;
}
.bg-blocked {
  background-color: tomato !important;
}
.bg-finished {
  background-color: green !important;
}

.squared {
  border-radius: 0px;
}

.card-body {
  padding: 0rem;
}

.board .col-md-6 {
  height: 100%;
  overflow-y: scroll;
}

.tasks {
  margin: 0;
  list-style: none;
  padding-left: 0;
  color: #282c34;
  min-height: 3rem;
}

select {
  user-select: none;
  border: none !important;
}

.tasks li {
  display: flex;
  align-items: center;
  margin: 0;
}

.bg-dark-info {
  background-color: #33354b;
  color: white;
}

.tasks p {
  max-width: none;
  margin: 0;
  text-align: left;
}

.tasks-avatar {
  overflow: hidden;
  flex-shrink: 0;
  display: block;
  width: 3em;
  height: 3em;
  border-radius: 9999px;
  background-color: #133b5c;
  color: white;
  margin-right: 0.5em;
}

/* Width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```
