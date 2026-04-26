import * as React from "react";
import { Outlet, Navigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "../../lib/utils";

export function Root() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  // Mock authentication check - in a real app this would be more robust
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - desktop */}
      <aside className={cn(
        "hidden md:block transition-all duration-300 ease-in-out shrink-0",
        isSidebarOpen ? "w-64" : "w-0"
      )}>
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
          <Outlet />
        </main>

        <footer className="h-10 bg-card border-t border-border flex items-center justify-between px-6 text-[10px] text-muted-foreground uppercase font-bold tracking-widest shrink-0">
          <span>&copy; 2026 BudgetVision University Budgeting</span>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Status: Online
            </span>
            <span>Version 2.4.0</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
