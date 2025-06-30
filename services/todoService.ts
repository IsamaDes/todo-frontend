export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const API_URL = 'http://localhost:5000/api/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createTodo = async (title: string): Promise<Todo> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  return res.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
