"use client"

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const handleSignup = () => router.push('/register');
  const handleLogin = () => router.push('/login');

  return (
    <main>
      <div className="flex justify-between items-center mb-4 h-[50px]  rounded-lg p-8">

        <div className="flex justify-end gap-2 ">
          <a
            href="https://github.com/IsamaDes/todo-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Frontend GitHub
          </a>
          <a
            href="https://github.com/IsamaDes/todo-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Backend GitHub
          </a>
        </div>


        <div className="flex justify-between items-center gap-2 rounded-lg">
          <button className="bg-blue-500 text-white px-4 rounded" onClick={() => handleSignup()}>
            Sign Up
          </button>
          <button className="bg-blue-500 text-white px-4 rounded" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
      </div>



    </main>
  );
}
