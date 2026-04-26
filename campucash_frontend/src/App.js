import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Auth
import Login from "./app/components/Login";
import Signup from "./app/components/SIgnUp";

// Layout
import Sidebar from "./app/components/Sidebar";
import ProtectedRoute from "./app/components/ProtectedRoute";

// Pages
import Dashboard from "./app/components/Dashboard";
import ViewDetails from "./app/components/ViewDetails";
import Transactions from "./app/components/Transactions";
import Reports from "./app/components/Reports";
import Departments from "./app/components/Departments";
import AddDepartment from "./app/components/AddDepartment";
import Settings from "./app/components/Settings";

// Settings Pages
import Profile from "./app/settings/Profile";
import Security from "./app/settings/Security";
import Appearance from "./app/settings/Appearance";
import Notifications from "./app/settings/Notification";
import Language from "./app/settings/Language";
import Privacy from "./app/settings/Privacy";
import Audit from "./app/settings/Audit";
import Department from "./app/settings/Department";

// ================= LAYOUT WRAPPER =================
const Layout = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-6 overflow-auto bg-black text-white">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />

      <Router>
        <Routes>

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ================= DASHBOARD ================= */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["admin", "accountant", "finance_officer", "dept_head", "lab_incharge"]}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ================= VIEW DETAILS ================= */}
          <Route
            path="/view-details"
            element={
              <ProtectedRoute allowedRoles={["admin", "accountant"]}>
                <Layout>
                  <ViewDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ================= DEPARTMENTS ================= */}
          <Route
            path="/department"
            element={
              <ProtectedRoute allowedRoles={["admin", "dept_head", "finance_officer"]}>
                <Layout>
                  <Departments />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-department"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <AddDepartment />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ================= TRANSACTIONS ================= */}
          <Route
            path="/transactions"
            element={
              <ProtectedRoute allowedRoles={["admin", "accountant", "dept_head", "finance_officer", "lab_incharge"]}>
                <Layout>
                  <Transactions />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ================= REPORTS ================= */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["admin", "accountant", "finance_officer"]}>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ================= SETTINGS ================= */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "accountant", "finance_officer", "dept_head", "lab_incharge"]}>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/settings/profile" element={<Profile />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/appearance" element={<Appearance />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/settings/language" element={<Language />} />
          <Route path="/settings/privacy" element={<Privacy />} />
          <Route path="/settings/audit" element={<Audit />} />
          <Route path="/settings/department" element={<Department />} />

          {/* ================= REDIRECT ================= */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;