"use client";

import { useState } from "react";
import verifyUser from "../../services/verifyUserService";
import { useRouter } from "next/navigation";

export default function VerifyUser() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");


    const handleVerify = async (e: any) => {
        e.preventDefault();
        const data = await verifyUser(token);
        setMessage(`✅ ${data.message || "Verification successful"}`);
        router.push("/login")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleVerify}
                className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Verify Your Account
                </h2>

                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste your verification token"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                    Verify
                </button>

                {message && (
                    <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
                )}
            </form>
        </div>
    );
}
