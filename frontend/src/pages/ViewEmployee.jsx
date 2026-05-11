import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { ArrowLeft, Mail, Briefcase, Building, DollarSign, User, Calendar, Loader2, Edit } from "lucide-react";

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setEmployee(res.data);
      } catch (error) {
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading employee details...</span>
          </div>
        </div>
      </>
    );
  }

  if (error || !employee) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700">{error || "Employee not found"}</p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Details</h1>
            <p className="text-gray-600">View complete employee information</p>
          </div>

          {/* Employee Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header with Image */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
              {employee.image ? (
                <img
                  src={`http://localhost:5000/uploads/${employee.image}`}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
              )}
              
              {/* Edit Button for Admin */}
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate(`/edit-employee/${id}`)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {/* Profile Section */}
            <div className="p-8">
              {/* Profile Header */}
              <div className="flex items-start space-x-6 mb-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {employee.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${employee.image}`}
                      alt={employee.name}
                      className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg -mt-16"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg -mt-16">
                      <User className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Name and Title */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{employee.name}</h2>
                  <p className="text-lg text-gray-600 mb-2">{employee.designation}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>₹{employee.salary.toLocaleString()}/year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-lg p-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-medium text-gray-900">{employee.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 rounded-lg p-2">
                        <Briefcase className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Designation</p>
                        <p className="font-medium text-gray-900">{employee.designation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-lg p-2">
                        <Building className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium text-gray-900">{employee.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-100 rounded-lg p-2">
                        <DollarSign className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Annual Salary</p>
                        <p className="font-medium text-gray-900">₹{employee.salary.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-6 bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Employment Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Employee ID</p>
                    <p className="font-medium text-gray-900">#{employee._id.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Back to Dashboard
                </button>
                
                {user?.role === "admin" && (
                  <button
                    onClick={() => navigate(`/edit-employee/${id}`)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Employee</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewEmployee;
