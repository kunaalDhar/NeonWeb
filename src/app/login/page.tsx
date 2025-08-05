"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-400 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 p-6 sm:p-8 text-black rounded-2xl shadow-2xl flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-cyan-700 text-center">Login</h2>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded outline-cyan-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded outline-cyan-500"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-cyan-600 text-white font-semibold rounded-full py-2 px-6 hover:bg-cyan-500 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-2 text-gray-700">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-cyan-700 font-medium underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
