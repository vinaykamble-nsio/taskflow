import "./TaskItem.css";

export function TaskItem({ task, handleDelete }) {
  return (
    <li className="task-item">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>

        <span className={`task-priority ${task.priority?.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
