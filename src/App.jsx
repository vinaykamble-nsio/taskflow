import { useState, useEffect } from "react";
import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fix 1: Added a default empty string to handle the initial blank state safely
  const filteredTasks = tasks.filter(
    (task) =>
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Fix 2: Dedicated effect to seamlessly save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Fix 3: Initial loading effect with an empty dependency array running exactly once
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  // Fix 4: Clean, direct function to completely remove a task by its ID
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="App">
      <h1>Taskflow</h1>
      <p>Welcome to Taskflow!</p>

      <TaskForm onSubmit={(newTask) => setTasks([...tasks, newTask])} />

      <div className="search-container">
        <label htmlFor="search-input">Search: </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
        />
      </div>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id}>
              {/* Fix 5: Pass a clean execution callback reference down to the child component */}
              <TaskItem
                task={task}
                handleDelete={() => handleDeleteTask(task.id)}
              />
            </li>
          ))
        ) : (
          <li>No tasks found.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
