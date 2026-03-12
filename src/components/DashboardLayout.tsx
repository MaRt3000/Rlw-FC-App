import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import rlwlogo from "@/assets/rlw-logo.png";
import {
  Trophy, LayoutDashboard, User, Calendar, BarChart3,
  Award, Users, Swords, Table, ClipboardList, LogOut, Menu, X,
} from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "player" | "admin";
}

const playerLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/profile", label: "My Profile", icon: User },
  { to: "/dashboard/attendance", label: "Attendance", icon: Calendar },
  { to: "/dashboard/performance", label: "Performance", icon: BarChart3 },
  { to: "/dashboard/leaderboard", label: "Leaderboard", icon: Award },
  { to: "/dashboard/teams", label: "Teams", icon: Users },
  { to: "/dashboard/competition", label: "Competition", icon: Trophy },
  { to: "/dashboard/league-table", label: "League Table", icon: Swords },
];

const adminLinks = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/players", label: "Players", icon: Users },
  { to: "/admin/sessions", label: "Sessions", icon: Calendar },
  { to: "/admin/attendance", label: "Attendance", icon: ClipboardList },
  { to: "/admin/performance", label: "Performance", icon: BarChart3 },
  { to: "/admin/teams", label: "Team Generator", icon: Users },
  { to: "/admin/competition", label: "Competition", icon: Swords },
  { to: "/admin/leaderboard", label: "Leaderboard", icon: Award },
];

const DashboardLayout = ({ children, role = "player" }: DashboardLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const links = role === "admin" ? adminLinks : playerLinks;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full  flex items-center justify-center">
              <img
                src={rlwlogo}
                alt="RLW FC logo under stadium lights at night"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-lg tracking-wider text-sidebar-foreground">
              RLW FC
            </span>
          </Link>
          <button
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 py-4">
          <p className="px-3 mb-2 font-body text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/40">
            {role === "admin" ? "Administration" : "Navigation"}
          </p>
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-colors ${isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 left-3 right-3">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
