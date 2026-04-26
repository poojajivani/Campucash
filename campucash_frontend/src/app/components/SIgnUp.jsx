import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    GraduationCap,
    Mail,
    Lock,
    User,
    Briefcase,
    Building2,
    Eye,
    EyeOff,
    CheckCircle2
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";

function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
  name: "",
  email: "",
  password: "",
  role: "",
  department: "",
  lab : "",
});
 const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // ✅ USE FULL FORM DATA
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      toast.error(data.detail || "Signup failed");
      return;
    }

    // Save optional info
    localStorage.setItem("signupRole", formData.role);
    localStorage.setItem("signupDept", formData.department);

    toast.success("Account created successfully!");

    // 👉 IMPORTANT: go to login (NOT dashboard)
    navigate("/login");

  } catch (error) {
    setLoading(false);
    console.error(error);
    toast.error("Something went wrong");
  }
};
   
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-visible bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">

  {/* Background blobs */}
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

  <div className="w-full max-w-md z-10">

    {/* HEADER */}
    <div className="text-center mb-8 space-y-2">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl">
          <GraduationCap className="w-8 h-8" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-primary dark:text-white">
        BudgetVision
      </h1>

      <p className="text-xs uppercase tracking-widest text-gray-500">
        University Budget Management System
      </p>
    </div>

    {/* CARD */}
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl rounded-2xl p-6 space-y-5">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Create Account</h2>
        <ThemeToggle />
      </div>

      <form onSubmit={handleSignup} className="space-y-4">

        {/* NAME */}
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium">University Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="email"
              placeholder="name@university.edu"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* ROLE */}
        <div>
          <label className="text-sm font-medium">Role</label>
          <div className="relative mt-1 overflow-visible">
            <Briefcase className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
           <select
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary max-h-60 overflow-y-auto"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
>
              <option value="">Select Role</option>
              <option value="admin">Administrator</option>
              <option value="dept_head">Department Head</option>
              <option value="accountant">Accountant</option>
              <option value="finance_officer">Finance Officer</option>
              <option value="lab_incharge">Lab Incharge</option>
            </select>
          </div>
        </div>

        {/* DEPARTMENT */}
        <div>
          <label className="text-sm font-medium">Department</label>
          <div className="relative mt-1">
            <Building2 className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <select
           className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary max-h-60 overflow-y-auto"
  value={formData.department}
  onChange={(e) =>
    setFormData({ ...formData, department: e.target.value })
  }
>
              <option value="">Select Department</option>
              <option value="cse">Computer Science</option>
              <option value="ict">ICT</option>
              <option value="civil">Civil</option>
              <option value="energy">Energy</option>
            </select>
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <CheckCircle2 size={18} />
            </>
          )}
        </button>
      </form>

      {/* LOGIN LINK */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?
        <Link to="/login" className="text-primary font-semibold ml-1">
          Sign In
        </Link>
      </p>

    </div>
  </div>
</div>
    );
}

export default Signup;