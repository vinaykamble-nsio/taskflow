import { useReducer, useState, useEffect } from "react";

import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
import { FilterBar } from "./components/FilterBar";
import { taskReducer } from "./reducers/taskReducer";
import { useTheme } from "./context/ThemeProvider";

import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme();

  // Initialize tasks from localStorage
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    try {
      const storedTasks = localStorage.getItem("tasks");

      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const handleAddTask = (newTask) => {
    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    dispatch({
      type: "DELETE_TASK",
      payload: taskId,
    });
  };

  // Change status
  const handleStatusChange = (taskId) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: taskId,
    });
  };

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
