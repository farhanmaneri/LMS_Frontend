// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/api/authSlice";
import {
  X,
  Menu,
  Home,
  Users,
  BookOpen,
  FileText,
  GraduationCap,
  BarChart3,
  User,
} from "lucide-react";

export default function Sidebar() {
  const user = useSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null; // no sidebar if not logged in

  // Icon mapping for menu items
  const iconMap = {
    Dashboard: Home,
    "Manage Users": Users,
    Classes: BookOpen,
    "My Classes": BookOpen,
    Exams: FileText,
    "My Exams": FileText,
    Subjects: GraduationCap,
    "My Subjects": GraduationCap,
    Results: BarChart3,
    "My Results": BarChart3,
  };

  // role-based links with icons
  const menuItems = {
    admin: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/manage-users", label: "Manage Users", icon: Users },
      { to: "/classes", label: "Classes", icon: BookOpen },
      { to: "/exams", label: "Exams", icon: FileText },
      { to: "/results/add", label: "Add Results", icon: BarChart3 },
    ],
    teacher: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/classes", label: "My Classes", icon: BookOpen },
      { to: "/subjects", label: "My Subjects", icon: GraduationCap },
      { to: "/exams", label: "My Exams", icon: FileText },
      { to: "student/results", label: "Results", icon: BarChart3 },
    ],
    student: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/classes", label: "My Classes", icon: BookOpen },
      { to: "/exams", label: "My Exams", icon: FileText },
      { to: "/student/results", label: "My Results", icon: BarChart3 },
    ],
  };

  const links = menuItems[user.role] || [];

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    const handleClick = (e) => {
      if (
        isOpen &&
        window.innerWidth < 768 &&
        !e.target.closest("#sidebar") &&
        !e.target.closest("#sidebarToggle")
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {/* Mobile toggle button - positioned to not interfere with navbar */}
      <button
        id="sidebarToggle"
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl transform z-50 transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:shadow-none lg:w-64 lg:max-w-none`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LMS
              </h2>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>

          {/* Close button (mobile only) */}
          <button
            className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const IconComponent = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-4 border-blue-500 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
              >
                <IconComponent
                  className={`w-5 h-5 transition-colors duration-200`}
                />
                <span className="truncate">{link.label}</span>

                {/* Active indicator */}
                <div className="ml-auto">
                  {({ isActive }) =>
                    isActive && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    )
                  }
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-500 text-center">
            Learning Management System
          </div>
        </div>
      </aside>

      {/* Spacer for desktop layout */}
      <div className="hidden lg:block lg:w-64 flex-shrink-0" />
    </>
  );
}
