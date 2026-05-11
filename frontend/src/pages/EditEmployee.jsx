import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { User, Mail, Briefcase, Building, DollarSign, ArrowLeft, Save, AlertCircle, Loader2 } from "lucide-react";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Operations",
    "Customer Support",
    "IT",
    "Product",
    "Design"
  ];

  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/employees/${id}`);
      setForm(res.data);
    } catch (error) {
      setError("Failed to load employee data");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.put(`/employees/${id}`, form);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading employee data...</span>
          </div>
        </div>
      </>
    );
  }

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
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Employee</h1>
            <p className="text-gray-600">Update the employee information below</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="name"
                        type="text"
                        placeholder="Enter employee's full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        placeholder="employee@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Designation Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="designation"
                        type="text"
                        placeholder="e.g. Senior Developer"
                        value={form.designation}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Department Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Salary Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Salary (₹) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="salary"
                        type="number"
                        placeholder="e.g. 600000"
                        value={form.salary}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Employee Info Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Current Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-900">{form.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">{form.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium text-gray-900">{form.department}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? "Updating..." : "Update Employee"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEmployee;
