import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        dueDate: action.payload.dueDate,
        completed: false,
        editing: false,
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    startEditing: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, editing: true } : task
      );
    },
    saveTask: (state, action) => {
      const { id, newText } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, text: newText, editing: false } : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((task) => !task.completed);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const {
  addTask,
  toggleComplete,
  deleteTask,
  startEditing,
  saveTask,
  clearCompleted,
  toggleDarkMode,
} = todoSlice.actions;

export default todoSlice.reducer;
