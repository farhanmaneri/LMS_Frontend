import "./index.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./components/NotFound";
import ResetPassword from "./pages/ResetPassword";

function App() {
  // Add this for debugging
  console.log("App component rendered");
  console.log("Current pathname:", window.location.pathname);
  console.log("Current search params:", window.location.search);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public routes - These should be BEFORE the catch-all route */}
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* <Route path="/signup" element={<Signup />} /> */}

      {/* Protected layout with Navbar */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>

      {/* Catch-all route - This MUST be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
