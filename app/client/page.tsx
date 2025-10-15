"use client";

import React, { useEffect, useState } from "react";
import { Loader2, User, Mail , Calendar, Search} from "lucide-react";
import { ClientData, clientUser } from "../services/authService";
import { fetchTodos, searchTodos, Todo, filterTodos } from "../services/todoService";


export default function ClientProfilePage() {
  const [client, setClient] = useState<ClientData | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
      const [filterDate, setFilterDate] = useState("");


 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
    
        const response = await clientUser();
        setClient(response)

        if(response?.id){
         const todosData = await fetchTodos();
          setTodos(todosData || []);
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);


  const handleSearch = async() => {
  if (!searchQuery) return;

  setLoading(true);
  try{
  const [loading, setLoading] = useState(true);
  const data = await searchTodos(searchQuery);
  setTodos(data.data || []);
  }catch(err){
     console.error(err);
  }finally{setLoading(false)}
  }


    const handleFilter = async () => {
    if (!filterDate) return;

    setLoading(true);
    try {
      const data = await filterTodos(filterDate);
      setTodos(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!client)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No client data available
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Client Profile
      </h1>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-medium">{client.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-600" />
          <span>{client.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-600 font-medium">Role:</span>
          <span>{client.role}</span>
        </div>

        {client.createdAt && (
          <div className="text-sm text-gray-500 mt-4">
            Joined: {new Date(client.createdAt).toLocaleDateString()}
          </div>
        )}

         <div className="mt-10 text-center">
           <button
            onClick={() => alert("Edit feature coming soon!")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

           {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-green-600 rounded-md text-white hover:bg-green-700"
          >
            <Search size={18} />
          </button>
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Calendar size={18} />
          </button>
        </div>
      </div>


      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        </div>
      ) : todos.length === 0 ? (
        <div className="text-gray-500 text-center">No todos found</div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="p-3 border border-gray-200 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{todo.title}</h3>
                <p className="text-gray-500 text-sm">{todo.title}</p>
                <p className="text-gray-400 text-xs">
                  Created: {new Date(todo.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                {todo.completed ? (
                  <span className="text-green-600 font-medium">Done</span>
                ) : (
                  <span className="text-red-500 font-medium">Pending</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



