import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome to Blogs App</h1>
        <p className="text-xl text-gray-600 mb-8">Your personal blogging platform</p>
        <a 
          href="/blogs" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          View Blogs
        </a>
      </div>
      
      {/* Test div to verify Tailwind is working */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
        Tailwind Test - If you see this styled, Tailwind is working!
      </div>
    </div>
  );
}
