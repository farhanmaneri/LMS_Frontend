import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses =
    "block px-4 py-2 rounded hover:bg-blue-100 transition duration-200";

  return (
    <aside className="w-64 bg-white shadow h-full p-4">
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? "bg-blue-200 font-semibold" : ""}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? "bg-blue-200 font-semibold" : ""}`
          }
        >
          👥 Users
        </NavLink>

        <NavLink
          to="/classes"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? "bg-blue-200 font-semibold" : ""}`
          }
        >
          🏫 Classes
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? "bg-blue-200 font-semibold" : ""}`
          }
        >
          📑 Reports
        </NavLink>
      </nav>
    </aside>
  );
}
