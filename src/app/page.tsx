"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Category, FormData } from "@/types/inspection";
import AddCategoryForm from "@/components/CategoryManagement";
import Sidebar from "@/components/sideBar";
import Link from "next/link";

export default function Home() {
 
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <Sidebar/>
    </main>
  );
}
