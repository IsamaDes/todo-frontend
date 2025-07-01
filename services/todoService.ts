import axiosInstance from "../utils/axiosInstance";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

// Use env variable or fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/todos';

// GET all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axiosInstance.get<Todo[]>(API_URL);
  return response.data;
};

// POST a new todo
export const createTodo = async (title: string, priority: 'low' | 'medium' | 'high', dueDate: string): Promise<Todo> => {
  const response = await axiosInstance.post<Todo>(API_URL, { title, priority, dueDate });
  return response.data;
};

// PUT (update) a todo
export const updateTodo = async (id: string, completed: boolean,   priority: 'low' | 'medium' | 'high'
): Promise<Todo> => {
  const response = await axiosInstance.put<Todo>(`${API_URL}/${id}`, { completed, priority });
  return response.data;
};

// DELETE a todo
export const deleteTodo = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};
