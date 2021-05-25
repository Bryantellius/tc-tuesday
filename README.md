# tuesday.com

- Clone of monday.com for React practice

## Part 1: Setup

1. Use `create-react-app` to jumpstart a react project
2. Delete unnecessary files/packages
3. Install dayjs, faker, and react-beautiful-dnd npm packages
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

5. Create a 