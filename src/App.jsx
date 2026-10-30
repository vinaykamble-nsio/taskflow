import { useState } from "react";
import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
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
  return (
    <div className="App">
      <h1>Taskflow</h1>
      <p>Welcome to Taskflow!</p>
      <TaskForm
        onSubmit={(newTask) => {
          setTasks([...tasks, newTask]);
        }}
      />
      <ol>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ol>
    </div>
  );
}

export default App;
