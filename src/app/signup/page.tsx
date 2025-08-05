"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Sign up successful! Redirecting...");
        setTimeout(() => router.push("/Products"), 1500);
      } else {
        setError(data.message || "Sign up failed");
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
        className="w-full max-w-md bg-white/90 p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-cyan-700 text-center">Sign Up</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded border-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm mb-1 font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded border-black"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            required
          />
        </div>

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
            className="border p-2 rounded  border-black"
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
            className="border-1  border-black p-2 rounded "
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

        <button
          type="submit"
          className="bg-cyan-600 text-white font-semibold rounded-full py-2 px-6 hover:bg-cyan-500 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-2 text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-700 font-medium underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
