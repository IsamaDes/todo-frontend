"use client"

import { useState, FormEvent } from "react";
import { registerUser, RegisterData } from "../services/authService";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    role: "client",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => (
      {...prev,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await registerUser(formData);
      setSuccess(response.message);
     if(response) console.log(response)
     router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => router.push("/login");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
      <input
          type="text"
          name="name"
          placeholder="Enter your username"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 mb-3 w-full rounded-md"
        />
      </div>
        
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 mb-3 w-full rounded-md"
        />
       </div>
        

        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
        />

        <button type="button" onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18}/>}
        </button>
        </div>

        <select  name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded-md"
          required>
          <option value="">Select Role</option>
          <option value="client">Client</option>
          <option value="nutritionist">Nutritionist</option>
          <option value="admin">Admin</option>
          </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-blue-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button onClick={handleLogin} className="text-green-600 font-medium hover:underline">
              Login here
            </button>
          </p>
    </div>
  );
};

export default Register;
