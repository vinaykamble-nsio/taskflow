import { useState, useEffect } from "react";
import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
import { FilterBar } from "./components/FilterBar";
import { useTheme } from "./context/ThemeProvider";
import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme();
  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
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

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on status
  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  // Search and filter tasks together
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      task.status?.toLowerCase().replace(" ", "-") === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Add new task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Change task status
  const statusOrder = ["Pending", "In Progress", "Completed"];

  const handleStatusChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const currentIndex = statusOrder.indexOf(task.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;

          return {
            ...task,
            status: statusOrder[nextIndex],
          };
        }

        return task;
      }),
    );
  };

  return (
    <div className={`App ${theme}`}>
      <h1>Taskflow</h1>
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
