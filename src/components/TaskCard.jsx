import list from "../data/list";

const TaskCard = ({ provided, task, tasks, setTasks }) => {
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

  return (
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
                onChange={changeAvatar}
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
            <div className={"col-2"} onChange={changeStatus}>
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
  );
};

export default TaskCard;
