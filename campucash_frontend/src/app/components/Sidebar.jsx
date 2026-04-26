
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  BarChart3,
  Settings,
  GraduationCap
} from "lucide-react";
import { cn } from "../../lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Departments", href: "/department", icon: Building2 },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-900 text-white border-r border-gray-700">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-20">
        <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-xl text-primary font-bold">
          <GraduationCap className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold">BudgetVision</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-gray-200 text-black"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>

        {/* Profile box */}
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
              FC
            </div>
            <div>
              <p className="text-xs font-medium text-white">Finance Dept.</p>
              <p className="text-[10px] text-white/40">Budget Management</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default Sidebar;

