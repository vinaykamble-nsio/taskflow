import "./TaskForm.css";

export const TaskForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newTask = {
      id: Date.now(),
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
    };

    onSubmit(newTask);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="form-title">Create New Task</h2>
      <p className="form-subtitle">Add a task and organize your work.</p>

      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your task..."
          rows="4"
          required
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
