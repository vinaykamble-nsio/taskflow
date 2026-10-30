import { TaskItem } from "./components/TaskItem";
function App() {
  const tasks = [
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
  ];
  return (
    <div className="App">
      <h1>Taskflow</h1>
      <p>Welcome to Taskflow!</p>
      <ol>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ol>
    </div>
  );
}

export default App;
