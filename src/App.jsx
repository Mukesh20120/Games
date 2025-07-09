import React from "react";
import { Link, Outlet } from "react-router";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
        🎮<Link to={'/'}>Game Hub</Link>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="border-t bg-white border-gray-200 text-center text-sm text-gray-500 py-3">
      © {new Date().getFullYear()} Game Hub. Built with ❤️ using 🧠.
    </footer>
  );
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
