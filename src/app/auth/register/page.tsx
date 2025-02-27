"use client"; 

import { useState, useContext, useEffect, FormEvent } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

import Link from 'next/link';
import AuthContext from '../../../components/AuthContext';
import Layout from '../../../components/Layout';
import { UserData } from '@/types/user';
import { api } from "@/services/api";


const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const { register, error, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/inspections/inspectionform');
    }
  }, [isAuthenticated, router]);

  const handleSubmit2 = (e: FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setFormError('Passwords do not match');
      return;
    }

    register({ name, email, password });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (password !== passwordConfirm) {
      setFormError("Passwords do not match");
      return;
    }
  
    try {
      const userData: UserData = { name, email, password };
  
      const response = await api.registerUser(userData);
  
      console.log("User registered successfully:", response);
      // Handle success (e.g., redirect, show message, etc.)
  
    } catch (error: any) {
      setFormError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto justify-center mt-40">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
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
              minLength={6}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              minLength={6}
            />
          </div>
          {(formError || error) && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {formError || error}
            </div>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
