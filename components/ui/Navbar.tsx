"use client";
import { Bell } from "lucide-react"; // Bell icon

export default function Navbar() {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="navbar bg-base-100 rounded-xl border shadow-md px-6 py-2 max-w-4xl w-full flex justify-between items-center">
        {/* Left - App name */}
        <a className="text-xl font-bold text-primary">Blog Summarizer</a>

        {/* Center - Links */}
        <div className="hidden md:flex gap-4">
          <a className="btn btn-ghost text-sm">History</a>
          <a className="btn btn-ghost text-sm">My Summaries</a>
          <a className="btn btn-ghost text-sm">About</a>
          <a className="btn btn-ghost text-sm">Help</a>
        </div>

        {/* Right - Notification Bell */}
        <div className="flex items-center">
          <button className="btn btn-ghost btn-circle">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
