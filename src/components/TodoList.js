import React, { useState } from "react";

function TodoList({ tasks, toggleComplete, deleteTask, startEditing, saveTask }) {
  const [editText, setEditText] = useState("");

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          {task.editing ? (
            <>
              <input
                type="text"
                defaultValue={task.text}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => saveTask(task.id, editText)}>💾 Save</button>
            </>
          ) : (
            <>
              <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
              {task.dueDate && <small>📅 {task.dueDate}</small>}
              <button onClick={() => startEditing(task.id)}>✏️ Edit</button>
              <button onClick={() => deleteTask(task.id)}>🗑️ Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
