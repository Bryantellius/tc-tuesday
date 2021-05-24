const TaskCard = ({ provided, user }) => {
  return (
    <li
      className={"list-item bg-" + user.defaultColor}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <div className="card w-100">
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-3">
              <img
                className="tasks-avatar"
                src={user.avatar}
                alt={user.title}
                title={user.name}
              />
            </div>
            <div className="col-9">
              <p>{user.task}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
