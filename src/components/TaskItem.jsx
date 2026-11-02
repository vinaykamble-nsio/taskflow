import "./TaskItem.css";

export function TaskItem({ task, handleDelete, handleStatusChange }) {
  return (
    <li className="task-item">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>

        <span className={`task-priority ${task.priority?.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>
      <div>
        <button
          onClick={handleStatusChange}
          className={`status-btn ${task.status?.toLowerCase().replace(" ", "-")}`}
        >
          {task.status}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
}
