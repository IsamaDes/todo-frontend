'use client';

import { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem';
import { fetchTodos, createTodo, updateTodo, deleteTodo, Todo } from '@/services/todoService';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    const newTodo = await createTodo(title);
    setTodos((prev) => [...prev, newTodo]);
    setTitle('');
  };

  const handleToggle = async (id: string, completed: boolean) => {
    const updated = await updateTodo(id, !completed);
    setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)));
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">My To-Do App</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded w-full"
          placeholder="Enter a task..."
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={() => handleToggle(todo._id, todo.completed)}
            onDelete={() => handleDelete(todo._id)}
          />
        ))}
      </div>
    </main>
  );
}
