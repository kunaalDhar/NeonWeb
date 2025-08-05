import { NextResponse } from 'next/server';

// In-memory user store (demo only, resets on server restart)
const users: { name: string; phone: string; email: string; password: string }[] = [];

export async function POST(request: Request) {
  const { name, phone, email, password } = await request.json();

  if (!name || !phone || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  users.push({ name, phone, email, password });
  return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
} 