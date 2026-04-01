import { useState, useEffect } from "react";
import Todo from "./Todo"; 

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  // Kunin ang lahat ng todos mula sa database pag-load ng page
  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    }
    getTodos();
  }, []);

  // Function para magdagdag ng bagong Todo
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await res.json();
      
      if (res.ok) {
        setContent(""); // Linisin ang input field
        setTodos([...todos, newTodo]); // I-update ang UI list
      }
    }
  };

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>

      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form__input"
          required
        />
        <button type="submit">Create Todo</button>
      </form>

      <div className="todos">
        {/* I-render ang bawat Todo gamit ang hiwalay na component */}
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
      </div>
    </main>
  );
}