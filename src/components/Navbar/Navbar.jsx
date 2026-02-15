import React from "react";
import { Link, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-zinc-200">
      <div className="flex items-center gap-8">
        <div className="flex items-center shrink-0">
          <i className="bi bi-capsule text-3xl text-plum"></i>
        </div>
        <div className="space-x-2">
          <Link
            to="/"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${location.pathname === "/"
              ? "bg-zinc-800 text-white"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
          >
            Db
          </Link>
          <Link
            to="/categories"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${location.pathname === "/categories"
              ? "bg-zinc-800 text-white"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
          >
            Categories
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <Link
          to="/my-list"
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${location.pathname === "/my-list"
            ? "bg-zinc-800 text-white"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
        >
          My Stack
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;