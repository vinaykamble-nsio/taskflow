import "./TaskItem.css";
import { useRef } from "react";

export function TaskItem({ task, handleDelete, handleStatusChange, counter }) {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };
  return (
    <li className="task-item">
      <div className="task-header">
        <h3 className="task-title">
          {counter} {"\t"} {task.title}
        </h3>

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
        <button onClick={openDialog} className="delete-btn">
          Delete
        </button>

        <dialog ref={dialogRef} className="delete-dialog">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={closeDialog}>No</button>
        </dialog>
      </div>
    </li>
  );
}
