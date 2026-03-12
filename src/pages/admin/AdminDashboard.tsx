import DashboardLayout from "@/components/DashboardLayout";
import { Users, Calendar, BarChart3, Trophy, Swords, ClipboardCheck } from "lucide-react";

const adminStats = [
  { label: "Total Players", value: "42", icon: Users },
  { label: "This Month Sessions", value: "12", icon: Calendar },
  { label: "Avg Attendance", value: "78%", icon: ClipboardCheck },
  { label: "Active Competition", value: "League 3", icon: Swords },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">ADMIN DASHBOARD</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Manage your football community from here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="font-body text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              PENDING APPROVALS
            </h2>
            <div className="space-y-3">
              {["Performance rating from James K.", "Performance rating from Ada M.", "Performance rating from Kwame O."].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="font-body text-sm text-foreground">{item}</span>
                  <div className="flex gap-2">
                    <button className="text-xs font-body px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              POSITION DISTRIBUTION
            </h2>
            <div className="space-y-3">
              {[
                { pos: "Attackers", count: 12, color: "bg-destructive" },
                { pos: "Midfielders", count: 14, color: "bg-primary" },
                { pos: "Defenders", count: 10, color: "bg-accent" },
                { pos: "Wingers", count: 6, color: "bg-emerald-light" },
              ].map((p) => (
                <div key={p.pos}>
                  <div className="flex justify-between font-body text-sm mb-1">
                    <span className="text-foreground">{p.pos}</span>
                    <span className="text-muted-foreground">{p.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${p.color} rounded-full transition-all`}
                      style={{ width: `${(p.count / 14) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              TOP PERFORMERS
            </h2>
            <div className="space-y-3">
              {[
                { name: "Emmanuel A.", score: 2.1 },
                { name: "Sarah K.", score: 2.4 },
                { name: "Daniel O.", score: 2.8 },
              ].map((player, i) => (
                <div key={player.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-display text-sm font-bold text-accent">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="font-body text-sm text-foreground">{player.name}</span>
                  </div>
                  <span className="font-display text-sm font-bold text-primary">{player.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
