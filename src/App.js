import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  toggleComplete,
  deleteTask,
  startEditing,
  saveTask,
  clearCompleted,
  toggleDarkMode,
} from "./store/todoSlice";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const { tasks, darkMode } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Add task handler
  const handleAddTask = (task, dueDate) => {
    dispatch(addTask({ text: task, dueDate }));
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="app-container">
        <h1>✅ To-Do List</h1>

        {/* Dark mode toggle */}
        <button
          className="dark-toggle"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Input form */}
        <TodoInput addTask={handleAddTask} />

        {/* Task list */}
        <TodoList
          tasks={tasks}
          toggleComplete={(id) => dispatch(toggleComplete(id))}
          deleteTask={(id) => dispatch(deleteTask(id))}
          startEditing={(id) => dispatch(startEditing(id))}
          saveTask={(id, newText) => dispatch(saveTask({ id, newText }))}
        />

        {/* Clear completed button */}
        {tasks.some((task) => task.completed) && (
          <button className="clear-btn" onClick={() => dispatch(clearCompleted())}>
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
