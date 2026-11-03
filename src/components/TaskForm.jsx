import "./TaskForm.css";
import { useState } from "react";
import { Input } from "./Input";
export const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      priority: formData.get("priority"),
      status: "Pending",
    };

    onSubmit(newTask);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="form-title">Create New Task</h2>
      <p className="form-subtitle">Add a task and organize your work.</p>

      <div className="form-group">
        <Input
          title="Task Title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <Input
          title="Task Description"
          type="text"
          placeholder="Describe your task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select id="priority" name="priority" required defaultValue="">
          <option value="" disabled>
            Select priority
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        <span>+</span> Add Task
      </button>
    </form>
  );
};
