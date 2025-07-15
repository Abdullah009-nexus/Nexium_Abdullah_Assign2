"use client";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="navbar bg-base-100 rounded-xl border shadow-md px-6 py-2 max-w-4xl w-full flex justify-between items-center">
        
        {/* Left - App name */}
        <Link href="/" className="text-xl font-bold text-black hover:text-gray-700 transition">
          Blog Summariser
        </Link>

        {/* Center - Links */}
        <div className="hidden md:flex gap-4">
          <Link href="/history" className="btn btn-ghost text-sm text-black hover:bg-gray-100">
            History
          </Link>
          <Link href="/my-summaries" className="btn btn-ghost text-sm text-black hover:bg-gray-100">
            My Summaries
          </Link>
          <Link href="/about" className="btn btn-ghost text-sm text-black hover:bg-gray-100">
            About
          </Link>
          <Link href="/help" className="btn btn-ghost text-sm text-black hover:bg-gray-100">
            Help
          </Link>
        </div>

        {/* Right - Notification Bell */}
        <div className="flex items-center">
          <button className="btn btn-ghost btn-circle">
            <Bell className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
