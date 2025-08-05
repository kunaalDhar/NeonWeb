"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ error: "", success: "", loading: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "", loading: true });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ error: "", success: "Message sent successfully!", loading: false });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ error: data.message || "Failed to send message", success: "", loading: false });
      }
    } catch {
      setStatus({ error: "Something went wrong", success: "", loading: false });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-400 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-8 text-black rounded-2xl shadow-2xl flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-cyan-700 text-center mb-2">Contact Us</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded min-h-[120px] resize-none"
          required
        />

        {status.error && <p className="text-red-500 text-sm text-center">{status.error}</p>}
        {status.success && <p className="text-green-600 text-sm text-center">{status.success}</p>}

        <button
          type="submit"
          className="bg-cyan-500 text-white font-semibold rounded-full py-2 px-6 hover:bg-cyan-400 transition"
          disabled={status.loading}
        >
          {status.loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
