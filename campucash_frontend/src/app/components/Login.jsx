import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Briefcase,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";
import axios from "axios";

function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "",
    department: "",
    password: "",
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
  ? "http://localhost:8000/api/auth/login"
  : "http://localhost:8000/api/auth/register";
      const res = await axios.post(url, formData);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("department", res.data.department);
window.location.href = "/";
      toast.success(isLogin ? "Login successful!" : "Signup successful!");

      navigate("/");
    } catch (err) {
      toast.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md z-10 space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl">
              <GraduationCap className="w-9 h-9" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-primary dark:text-white">
            BudgetVision
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            University Budget Management System
          </p>
        </div>

        {/* CARD */}
        <div className="bg-card border shadow-2xl rounded-3xl p-8 space-y-6">

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <ThemeToggle />
          </div>

          <form onSubmit={handleAuth} className="space-y-5">

            {/* NAME */}
            {!isLogin && (
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 p-3 border rounded-xl"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 p-3 border rounded-xl"
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* ROLE */}
            {!isLogin && (
              <div>
                <label className="text-sm font-semibold">Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <select
                    className="w-full pl-10 p-3 border rounded-xl"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="accountant">Accountant</option>
                    <option value="finance_officer">Finance Officer</option>
                    <option value="dept_head">Department Head</option>
                    <option value="lab_incharge">Lab Incharge</option>
                  </select>
                </div>
              </div>
            )}

            {/* DEPARTMENT */}
            {!isLogin && (
              <div>
                <label className="text-sm font-semibold">Department</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="CIVIL">ENERGY</option>
                  <option value="CIVIL">ELECTRICAL</option>
                </select>
              </div>
            )}

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 p-3 border rounded-xl"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-3 rounded-xl font-bold flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Login" : "Create Account"}
                  <CheckCircle2 size={18} />
                </>
              )}
            </button>
          </form>

          {/* SWITCH */}
          <p className="text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-bold"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;