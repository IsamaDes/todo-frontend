import axiosInstance from "../../utils/AxiosInstance";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axiosInstance.get<Todo[]>("/todos");
  return response.data;
};

export const createTodo = async (title: string, priority: 'low' | 'medium' | 'high', dueDate: string): Promise<Todo> => {
  const response = await axiosInstance.post<Todo>("/todos", { title, priority, dueDate });
  return response.data;
};

export const updateTodo = async (id: string, completed: boolean, priority: 'low' | 'medium' | 'high', dueDate: string): Promise<Todo> => {
  const response = await axiosInstance.put<Todo>(`/todos/${id}`, { completed, priority, dueDate });
  return response.data;
};

 export const searchTodos = async (query: string) => {
    const { data } = await axiosInstance.post("/todos/search", { query });
    return data;
  };

  export const filterTodos = async (date: string) => {
    const { data } = await axiosInstance.post("/todos/filter", { date });
    return data;
  };

export const deleteTodo = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/todos/${id}`);
};
