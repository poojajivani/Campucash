import * as React from "react";
import { Drawer } from "vaul";
import { X, Bell, ShieldAlert, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

const notifications = [
  {
    id: 1,
    type: "critical",
    title: "Critical Budget Usage",
    description: "Computer Science department has used 92% of their budget. Immediate review required.",
    time: "2 mins ago",
    department: "Computer Science Lab",
    icon: ShieldAlert,
    color: "text-red-500 bg-red-50 dark:bg-red-500/10"
  },
  {
    id: 2,
    type: "warning",
    title: "Budget Usage High",
    description: "Bio-Chemistry department has reached 76% of their annual allocation.",
    time: "45 mins ago",
    department: "Bio-Chemistry",
    icon: AlertCircle,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10"
  },
  {
    id: 3,
    type: "info",
    title: "Report Generated",
    description: "The Annual Financial Report for FY 2025-26 has been successfully generated.",
    time: "2 hours ago",
    department: "Finance",
    icon: CheckCircle2,
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
  },
  {
    id: 4,
    type: "pending",
    title: "New Budget Request",
    description: "Dr. Evans submitted a request for new laboratory equipment ($12,500).",
    time: "5 hours ago",
    department: "Physics Lab",
    icon: Clock,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10"
  }
];



export function NotificationDrawer({ isOpen, onClose }) {
  return (
    <Drawer.Root direction="right" open={isOpen} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col focus:outline-none">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3 text-foreground font-semibold text-lg">
              <Bell className="w-5 h-5" />
              Notifications
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-6 hover:bg-muted/30 transition-colors group">
                  <div className="flex gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", notification.color)}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-foreground">{notification.title}</h4>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {notification.department}
                        </span>
                        <button className="text-xs font-bold text-accent hover:underline">
                          Mark as Read
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-12 space-y-4 opacity-50">
                <Bell className="w-12 h-12" />
                <p className="font-medium">No notifications yet</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-border mt-auto">
            <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
              Clear All Notifications
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
