import { useState } from "react";
import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "This is the first task.",
      priority: "High",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is the second task.",
      priority: "Medium",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="App">
      <h1>Taskflow</h1>
      <p>Welcome to Taskflow!</p>
      <TaskForm
        onSubmit={(newTask) => {
          setTasks([...tasks, newTask]);
        }}
      />
      Search:{" "}
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search"
      />
      <ol>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ol>
    </div>
  );
}

export default App;
