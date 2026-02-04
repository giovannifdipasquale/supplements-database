import React from "react";

function Navbar() {
  return (
    <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <i className="bi bi-capsule text-2xl text-teal-500"></i>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/" ? "bg-gray-950/50 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
                >
                  Db
                </a>
                <a
                  href="/categories"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/categories" ? "bg-gray-950/50 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
                >
                  Categories
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a
              href="/my-list"
              className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/my-supplements" ? "bg-gray-950/50 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
            >
              My Supplements
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;