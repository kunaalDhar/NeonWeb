'use client';   
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Product } from '../components/types';

const ADMIN_PASSWORD = 'admin123';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', price: '', image: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, image: ev.target?.result as string }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === 'password') {
      setPassword(value);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return;
    setProducts((prev) => [
      ...prev,
      { id: Date.now().toString(), name: form.name, price: form.price, image: form.image },
    ]);
    setForm({ name: '', price: '', image: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-400">
        <form onSubmit={handleLogin} className="bg-white/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 w-80">
          <h2 className="text-2xl font-bold text-cyan-700 mb-2 text-center">Admin Login</h2>
          <input
            type="password"
            name="password"
            placeholder="Enter admin password"
            value={password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="bg-cyan-400 text-black font-semibold rounded-full py-2 px-6 mt-2 hover:bg-cyan-300 transition">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-400 py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-10 drop-shadow-lg">Admin: Add New Product</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 mb-12">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {form.image && (
          <img src={form.image} alt="Preview" className="w-32 h-32 object-contain mx-auto rounded-full border-4 border-cyan-200" />
        )}
        <button type="submit" className="bg-cyan-400 text-black font-semibold rounded-full py-2 px-6 mt-2 hover:bg-cyan-300 transition">Add Product</button>
      </form>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        {products.map((item) => (
          <div key={item.id} className="bg-white/90 rounded-2xl shadow-2xl p-6 flex flex-col items-center hover:scale-105 transition-transform border-2 border-cyan-200">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-contain mb-4 rounded-full border-4 border-cyan-300 shadow" />
            <h3 className="text-xl font-semibold text-cyan-800 mb-2 drop-shadow">{item.name}</h3>
            <p className="text-lg text-cyan-600 font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage; 