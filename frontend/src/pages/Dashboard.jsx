import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Search, Plus, Eye, Edit, Trash2, Users, Mail, Briefcase, DollarSign, Building } from "lucide-react";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/employees?search=${search}`);
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to load employees", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    
    setDeleteLoading(id);
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      alert("Only admin can delete employee");
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEmployees();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Management</h1>
            <p className="text-gray-600">Manage your team and track employee information</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{employees.length}</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Admin Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {[...new Set(employees.map(emp => emp.department))].length}
                  </p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Salary</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₹{employees.length > 0 ? Math.round(employees.reduce((acc, emp) => acc + emp.salary, 0) / employees.length).toLocaleString() : 0}
                  </p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-3">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Actions Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  placeholder="Search employees by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              {user?.role === "admin" && (
                <Link
                  to="/add-employee"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Employee</span>
                </Link>
              )}
            </div>
          </div>

          {/* Employee Cards */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : employees.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
              <p className="text-gray-600 mb-4">
                {search ? "Try adjusting your search terms" : "Get started by adding your first employee"}
              </p>
              {user?.role === "admin" && (
                <Link
                  to="/add-employee"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Employee</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((emp) => (
                <div
                  key={emp._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {/* Employee Image/Avatar */}
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {emp.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${emp.image}`}
                        alt={emp.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Users className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Employee Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{emp.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {emp.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                        {emp.designation}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        {emp.department}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-medium text-gray-900">₹{emp.salary.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link
                        to={`/view-employee/${emp._id}`}
                        className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">View</span>
                      </Link>
                      
                      {user?.role === "admin" && (
                        <>
                          <Link
                            to={`/edit-employee/${emp._id}`}
                            className="flex-1 flex items-center justify-center space-x-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="text-sm">Edit</span>
                          </Link>
                          
                          <button
                            onClick={() => deleteEmployee(emp._id)}
                            disabled={deleteLoading === emp._id}
                            className="flex-1 flex items-center justify-center space-x-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200 disabled:opacity-50"
                          >
                            {deleteLoading === emp._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4" />
                                <span className="text-sm">Delete</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
