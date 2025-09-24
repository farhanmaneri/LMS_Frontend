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
import ResultList from "./components/ResultList";
import ResultForm from "./components/ResultForm";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/reset-password" element={<ResetPassword />} />

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
        {/* Role-based extra routes */}
        <Route path="/classes" element={<div>Teacher Classes Page</div>} />
        <Route path="/exams" element={<div>Teacher Exams Page</div>} />
        <Route path="/subjects" element={<div>Student Subjects Page</div>} />
        <Route path="/results/add" element={<ResultForm />} />
        <Route path="/student/results" element={<ResultList />} />

        {/* add more like reports, settings, etc */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
