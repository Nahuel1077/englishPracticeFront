'use client'
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const [name, setName] = useState(""); 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/api/students/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
    }

    const data = await response.json();

    localStorage.setItem(
        "student",
        JSON.stringify(data.student)
    );

    router.push("/dashboard");
  };


  return (
    <div className="flex min-h-screen flex-col items-center gap-8 p-18">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl font-bold text-white text-center w-full">English Practice</h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-4 w-[500px] border-[1px] border-gray-300 p-4 rounded-md bg-white">
        <label htmlFor="inputName" className="text-lg font-semibold text-black">
          Enter your name:
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="inputName"
          className="border-[1px] border-gray-300 text-black rounded-md p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
