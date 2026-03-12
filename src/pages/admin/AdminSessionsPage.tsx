import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Plus, Clock } from "lucide-react";

const sessions = [
    { id: 1, date: "Sat, Mar 8 2026", time: "8:00 AM", location: "City Sports Complex", type: "Tactical", status: "Completed", attendees: 35 },
    { id: 2, date: "Sat, Mar 15 2026", time: "8:00 AM", location: "City Sports Complex", type: "Fitness & Drills", status: "Upcoming", attendees: 0 },
    { id: 3, date: "Sat, Mar 1 2026", time: "8:00 AM", location: "University Field", type: "Match Practice", status: "Completed", attendees: 38 },
    { id: 4, date: "Sat, Feb 22 2026", time: "8:00 AM", location: "City Sports Complex", type: "Tactical", status: "Completed", attendees: 30 },
    { id: 5, date: "Sat, Feb 15 2026", time: "8:00 AM", location: "Community Park", type: "Fitness & Drills", status: "Completed", attendees: 33 },
    { id: 6, date: "Sat, Feb 8 2026", time: "9:00 AM", location: "City Sports Complex", type: "Match Practice", status: "Completed", attendees: 40 },
];

const AdminSessionsPage = () => {
    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-foreground">TRAINING SESSIONS</h1>
                        <p className="font-body text-sm text-muted-foreground mt-1">Schedule and manage weekly training</p>
                    </div>
                    <Button variant="heroPrimary" size="sm">
                        <Plus className="w-4 h-4 mr-2" /> New Session
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {sessions.map((s) => (
                        <div key={s.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <Badge variant={s.status === "Upcoming" ? "default" : "secondary"}>
                                    {s.status}
                                </Badge>
                                <span className="font-body text-xs text-muted-foreground">{s.type}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-foreground">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="font-display font-semibold">{s.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-body text-sm">{s.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-body text-sm">{s.location}</span>
                                </div>
                            </div>
                            {s.status === "Completed" && (
                                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                                    <span className="font-body text-xs text-muted-foreground">{s.attendees} players attended</span>
                                    <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                                </div>
                            )}
                            {s.status === "Upcoming" && (
                                <div className="mt-4 pt-3 border-t border-border">
                                    <Button variant="heroPrimary" size="sm" className="w-full text-xs">Manage Session</Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminSessionsPage;
