"use client";

import React, { useEffect, useState } from "react";
 // your axios instance
import { Loader2, User, Mail } from "lucide-react";
import { ClientData, clientUser } from "../services/authService";




export default function ClientProfilePage() {
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
    
        const response = await clientUser();
        setClient(response.data)
      } catch (err: any) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
      </div>
    </div>
  );
}
