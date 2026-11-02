export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "CHANGE_STATUS": {
      const statusOrder = ["Pending", "In Progress", "Completed"];

      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }

        const currentIndex = statusOrder.indexOf(task.status);

        const nextIndex = (currentIndex + 1) % statusOrder.length;

        return {
          ...task,
          status: statusOrder[nextIndex],
        };
      });
    }

    case "LOAD_TASKS":
      return action.payload;

    default:
      return state;
  }
};
