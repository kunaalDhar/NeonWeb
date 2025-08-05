import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Demo: Hardcoded user
  const demoUser = {
    email: 'user@1.com',
    password: '123',
  };

  if (email === demoUser.email && password === demoUser.password) {
    // In a real app, set a cookie or session here
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }
} 