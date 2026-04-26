import * as React from "react";
import {
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  ShieldCheck,
  Database,
  Sliders
} from "lucide-react";
import { useNavigate } from "react-router-dom";
function Settings() {
  const [activePage, setActivePage] = React.useState(null);
  const navigate = useNavigate();
  const settingsItems = [
    { name: "Personal Profile", desc: "Update your name, avatar and university role", key: "profile", icon: User },
    { name: "Security & Authentication", desc: "Manage your password and 2FA settings", key: "security", icon: Lock },
    { name: "Notifications", desc: "Configure how and when you receive alerts", key: "notifications", icon: Bell },
    { name: "Display & Appearance", desc: "Customize the theme and interface scaling", key: "appearance", icon: Palette },
    { name: "Department Defaults", desc: "Set default thresholds for budget warnings", key: "department", icon: Sliders },
    { name: "Language & Region", desc: "Set your preferred language and date formats", key: "language", icon: Globe },
    { name: "Privacy & Permissions", desc: "Control data visibility for other roles", key: "privacy", icon: ShieldCheck },
    { name: "Audit Log & Backups", desc: "View detailed system changes and export data", key: "audit", icon: Database },
  ];

  return (
    <div className="space-y-8 pb-10 max-w-4xl">

      {/* HEADER */}
      <div className="space-y-1">
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          System Preferences
        </p>
        <h1 className="text-3xl font-bold text-foreground">
          Global Settings
        </h1>
      </div>

      {/* SETTINGS LIST */}
      <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
        <div className="divide-y divide-border">
          {settingsItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(`/settings/${item.key}`)}
              className="w-full p-6 flex items-center gap-6 hover:bg-muted/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon className="w-6 h-6" />
              </div>

              <div className="flex-1 space-y-0.5">
                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <p className="text-sm text-muted-foreground font-medium">
                  {item.desc}
                </p>
              </div>

              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* ===== MODAL PAGES ===== */}
      {activePage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl space-y-4">

            {/* TITLE */}
            <h2 className="text-xl font-bold capitalize">
              {activePage.replace("-", " ")}
            </h2>

            {/* CONTENT BASED ON PAGE */}
            {activePage === "profile" && (
              <>
                <input placeholder="Name" className="w-full border p-2 rounded-lg" />
                <input placeholder="Role" className="w-full border p-2 rounded-lg" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg">
                  Save Profile
                </button>
              </>
            )}

            {activePage === "security" && (
              <>
                <input type="password" placeholder="New Password" className="w-full border p-2 rounded-lg" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg">
                  Update Password
                </button>
              </>
            )}

            {activePage === "notifications" && (
              <>
                <label className="flex gap-2">
                  <input type="checkbox" /> Email Alerts
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" /> SMS Alerts
                </label>
              </>
            )}

            {activePage === "appearance" && (
              <>
                <button className="border px-4 py-2 rounded-lg">Light Mode</button>
                <button className="border px-4 py-2 rounded-lg">Dark Mode</button>
              </>
            )}

            {activePage === "department" && (
              <>
                <input placeholder="Budget Limit" className="w-full border p-2 rounded-lg" />
              </>
            )}

            {activePage === "language" && (
              <>
                <select className="w-full border p-2 rounded-lg">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </>
            )}

            {activePage === "privacy" && (
              <>
                <label className="flex gap-2">
                  <input type="checkbox" /> Public Data
                </label>
              </>
            )}

            {activePage === "audit" && (
              <>
                <button className="border px-4 py-2 rounded-lg">
                  Download Logs
                </button>
              </>
            )}

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActivePage(null)}
              className="w-full mt-4 bg-black text-white py-2 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

/* ARROW ICON */
function ArrowRight({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default Settings;