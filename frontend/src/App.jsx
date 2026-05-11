import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-employee/:id"
          element={
            <ProtectedRoute>
              <ViewEmployee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
