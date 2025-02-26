"use client";


import Sidebar from "@/components/sideBar";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/inspections/inspectionform");
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 py-8 flex">
      <Sidebar />
    </main>
  );
};

export default Home;
