
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import login from "../../services/loginService";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        router.push("/dashboard");
    };

    return (
        <div className="grid md:grid-cols-2 gap-12 items-center  w-full bg-white shadow-xl rounded-2xl overflow-hidden">

            {/* Left image section */}
            <div className="hidden md:block bg-gray-100 h-full">
                <Image
                    src="/study.png"
                    alt="study"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>

            {/* Right form section */}
            <div className="p-8 md:p-12">
                <h1 className=" mb-6 font-bold text-gray-800">
                    Every small step takes you closer to the finish line. 🏁
                </h1>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-3 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
