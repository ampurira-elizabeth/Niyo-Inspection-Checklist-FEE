"use client"; 

import { useState, useContext, useEffect, FormEvent } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

import Link from 'next/link';
import AuthContext from '../../../components/AuthContext';
import Layout from '../../../components/Layout';
import { api } from '@/services/api';
import { UserLoginData } from '@/types/user';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const { login, error, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/inspections/inspectionform');
    }
  }, [isAuthenticated, router]);
  
  const handleSubmit2 = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const userData: UserLoginData = { email, password };
      const response = await api.loginUser(userData); 
  
      console.log("Login successful:", response);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("isRegistered", "true"); 
      }
        router.push("/inspections/inspectionform");
      
    } catch (error: any) {
      setFormError(error.message || "Login failed. Please try again.");
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto justify-center mt-40">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
