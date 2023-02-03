


import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

      const inputRef = useRef(null);


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e) => {
        e.preventDefault();

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text,
        favorite: false,
      },
    ]);
    setText("");
    inputRef.current.focus();
  };

  const handleFavorite = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.favorite = !todo.favorite;
        }
        return todo;
      })
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, newText) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.text = newText;
        }
        return todo;
      })
    );
  };

  return (
    <div className="ToDoList">
      <form onSubmit={handleAdd}>
        <div className="input-row">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <span onClick={() => handleFavorite(todo.id)}>
                {todo.favorite ? "❤️" : "🖤"}
              </span>
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default ToDoList;
