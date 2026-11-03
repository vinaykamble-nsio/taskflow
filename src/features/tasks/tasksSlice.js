import { createSlice } from "@reduxjs/toolkit";

const loadTasks = () => {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadTasks,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) =>
      state.filter((task) => task.id !== action.payload),
    changeStatus: (state, action) => {
      const statusOrder = ["Pending", "In Progress", "Completed"];
      const task = state.find((task) => task.id === action.payload);

      if (task) {
        const nextIndex =
          (statusOrder.indexOf(task.status) + 1) % statusOrder.length;
        task.status = statusOrder[nextIndex];
      }
    },
  },
});

export const { addTask, deleteTask, changeStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
