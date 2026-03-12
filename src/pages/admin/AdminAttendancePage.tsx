import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Clock, Users, TrendingUp } from "lucide-react";

const stats = [
    { label: "Avg Attendance Rate", value: "78%", icon: Users },
    { label: "This Month Sessions", value: "4", icon: BarChart3 },
    { label: "Most Punctual", value: "Ada M.", icon: Clock },
    { label: "Highest Attendance", value: "Ada M.", icon: TrendingUp },
];

const attendanceData = [
    { name: "Ada Mensah", rate: "95%", avgArrival: "7:42 AM", sessionsAttended: 18, totalSessions: 19, trend: "up" },
    { name: "Emmanuel Adekunle", rate: "92%", avgArrival: "7:48 AM", sessionsAttended: 17, totalSessions: 19, trend: "up" },
    { name: "James Kariuki", rate: "90%", avgArrival: "7:50 AM", sessionsAttended: 17, totalSessions: 19, trend: "stable" },
    { name: "Sarah Kimani", rate: "88%", avgArrival: "7:55 AM", sessionsAttended: 16, totalSessions: 19, trend: "down" },
    { name: "Michael Tetteh", rate: "85%", avgArrival: "7:52 AM", sessionsAttended: 16, totalSessions: 19, trend: "up" },
    { name: "Kwame Boateng", rate: "80%", avgArrival: "8:01 AM", sessionsAttended: 15, totalSessions: 19, trend: "stable" },
    { name: "Daniel Osei", rate: "75%", avgArrival: "8:05 AM", sessionsAttended: 14, totalSessions: 19, trend: "down" },
    { name: "Fatima Bello", rate: "70%", avgArrival: "8:10 AM", sessionsAttended: 13, totalSessions: 19, trend: "down" },
];

const AdminAttendancePage = () => {
    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">ATTENDANCE</h1>
                    <p className="font-body text-sm text-muted-foreground mt-1">Track player attendance and punctuality</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                <s.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                            <div className="font-body text-xs text-muted-foreground mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border">
                        <h2 className="font-display text-lg font-semibold text-foreground">ATTENDANCE LEADERBOARD</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Avg Arrival</TableHead>
                                <TableHead>Sessions</TableHead>
                                <TableHead>Trend</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceData.map((p, i) => (
                                <TableRow key={p.name}>
                                    <TableCell className="font-display font-bold text-muted-foreground">{i + 1}</TableCell>
                                    <TableCell className="font-body font-medium text-foreground">{p.name}</TableCell>
                                    <TableCell className="font-display font-bold text-foreground">{p.rate}</TableCell>
                                    <TableCell className="font-body text-muted-foreground">{p.avgArrival}</TableCell>
                                    <TableCell className="font-body text-muted-foreground">{p.sessionsAttended}/{p.totalSessions}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={
                                            p.trend === "up" ? "bg-primary/10 text-primary" :
                                                p.trend === "down" ? "bg-destructive/10 text-destructive" :
                                                    "bg-muted text-muted-foreground"
                                        }>
                                            {p.trend === "up" ? "↑" : p.trend === "down" ? "↓" : "→"} {p.trend}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminAttendancePage;
