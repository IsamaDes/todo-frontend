"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import signupService from "../../services/signupService";
import Image from "next/image";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("please enter a valid email address")
      return
    }

    if (password.length < 6) {
      setError("password must be atleast 6 characters long");
      return;
    }

    setError("");

    const response = await signupService(name, email, password);
    console.log(response)
    const verificationToken = response.verificationToken;
    console.log(verificationToken);
    if (!verificationToken) return;
    localStorage.setItem("verificationToken", verificationToken);
    router.push("/verify-user");
  };


  return (
    <div className="grid md:grid-cols-2 gap-12 items-center w-full bg-white shadow-xl rounded-2xl overflow-hidden">

      {/* Left image section */}
      <div className="hidden md:block bg-gray-100 h-full">
        <Image
          src="/plant.png"
          alt="plant"
          width={600}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Right form section */}
      <div className="p-8 md:p-12">
        <h1 className="text-gray-800 mb-6">
          Plant the seed today and watch your goals grow tomorrow.
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="name"
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl text-lg transition"
          >
            Register
          </button>
        </form>
      </div>

    </div>

  );
}










