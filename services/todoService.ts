import axiosInstance from "../utils/axiosInstance";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}


export const createTodo = async (title: string, priority: 'low' | 'medium' | 'high', dueDate: string): Promise<Todo> => {
  const response = await axiosInstance.post<Todo>("auth/todos", { title, priority, dueDate });
  return response.data;
};

export const updateTodo = async (id: string, completed: boolean, priority: 'low' | 'medium' | 'high', dueDate: string): Promise<Todo> => {
  const response = await axiosInstance.put<Todo>(`auth/todos/${id}`, { completed, priority, dueDate });
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axiosInstance.delete(`auth/todos/${id}`);
};
