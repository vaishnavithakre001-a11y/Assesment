import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Briefcase, Home } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-white" />
            <h2 className="text-xl font-bold text-white">Employee Manager</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
              <User className="h-5 w-5 text-white" />
              <span className="text-white font-medium">
                {user?.name} <span className="text-xs bg-white/30 px-2 py-1 rounded-full">({user?.role})</span>
              </span>
            </div>
            
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            {user?.role === "admin" && (
              <Link
                to="/add-employee"
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Add Employee
              </Link>
            )}
            
            <button
              onClick={logout}
              className="flex items-center space-x-1 bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
