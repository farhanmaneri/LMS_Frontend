import "./index.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./components/NotFound";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="*" element={<NotFound />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

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

        {/* add more like reports, settings, etc */}
      </Route>
    </Routes>
  );
}

export default App;
