import { useState, useEffect } from "react";

import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
import { FilterBar } from "./components/FilterBar";
import { useTheme } from "./context/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, changeStatus } from "./features/tasks/tasksSlice";

import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme();
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  // Initialize tasks from localStorage

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleAddTask = (task) => dispatch(addTask(task));
  const handleDeleteTask = (taskId) => dispatch(deleteTask(taskId));
  const handleStatusChange = (taskId) => dispatch(changeStatus(taskId));

  // Filter tasks
  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  // Search and filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      task.status?.toLowerCase().replace(" ", "-") === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`App ${theme}`}>
      <h1 style={{ color: theme === "light" ? "#333" : "#fff" }}>Taskflow</h1>
      <p>Welcome to Taskflow!</p>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <TaskForm onSubmit={handleAddTask} />

      <div className="search-container">
        <label htmlFor="search-input">Search:</label>

        <input
          id="search-input"
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
        />

        <FilterBar filter={activeFilter} handleFilter={handleFilter} />
      </div>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleDelete={() => handleDeleteTask(task.id)}
              handleStatusChange={() => handleStatusChange(task.id)}
              counter={tasks.indexOf(task) + 1}
            />
          ))
        ) : (
          <li className="empty-message">No tasks found.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
