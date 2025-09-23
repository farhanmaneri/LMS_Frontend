// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/api/authSlice";
import { X } from "lucide-react";

export default function Sidebar() {
  const user = useSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null; // no sidebar if not logged in

  // role-based links
  const menuItems = {
    admin: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/manage-users", label: "Manage Users" },
      { to: "/classes", label: "Classes" },
      { to: "/exams", label: "Exams" },
    ],
    teacher: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/classes", label: "My Classes" },
      { to: "/subjects", label: "My Subjects" },
      { to: "/exams", label: "My Exams" },
      { to: "/results", label: "Results" },
    ],
    student: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/classes", label: "My Classes" },
      { to: "/exams", label: "My Exams" },
      { to: "/results", label: "My Results" },
    ],
  };

  const links = menuItems[user.role] || [];

  // Close sidebar on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        isOpen &&
        !e.target.closest("#sidebar") &&
        !e.target.closest("#sidebarToggle")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        id="sidebarToggle"
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Overlay on mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform z-50 
          transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">LMS</h2>
          {/* Close button (mobile only) */}
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-gray-600" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)} // close on click (mobile)
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
