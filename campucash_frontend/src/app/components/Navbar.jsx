import * as React from "react";
import { Bell, Search, User, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationDrawer } from "./NotificationDrawer";

export function Navbar({ onMenuClick }) {
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  return (
    <header className="h-20 bg-card text-card-foreground border-b border-border px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-muted text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search departments, reports..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-full hover:bg-muted text-foreground transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card" />
        </button>

        <div className="h-8 w-px bg-border mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground leading-tight">Sarah Johnson</p>
            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider leading-none block w-fit ml-auto mt-0.5">
              Finance Officer
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-2 border-accent/20">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </header>
  );
}
