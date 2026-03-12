import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const pendingRatings = [
    { id: 1, player: "Emmanuel Adekunle", session: "Mar 8, 2026", rating: 2, submittedAt: "Mar 8, 2:30 PM" },
    { id: 2, player: "Sarah Kimani", session: "Mar 8, 2026", rating: 3, submittedAt: "Mar 8, 3:00 PM" },
    { id: 3, player: "James Kariuki", session: "Mar 8, 2026", rating: 1, submittedAt: "Mar 8, 2:45 PM" },
    { id: 4, player: "Ada Mensah", session: "Mar 1, 2026", rating: 2, submittedAt: "Mar 1, 3:15 PM" },
];

const approvedRatings = [
    { player: "Emmanuel Adekunle", avgRating: 2.1, totalSessions: 17, trend: "improving" },
    { player: "Sarah Kimani", avgRating: 2.4, totalSessions: 16, trend: "stable" },
    { player: "Daniel Osei", avgRating: 2.8, totalSessions: 14, trend: "declining" },
    { player: "Ada Mensah", avgRating: 1.9, totalSessions: 18, trend: "improving" },
    { player: "Kwame Boateng", avgRating: 3.2, totalSessions: 15, trend: "stable" },
    { player: "James Kariuki", avgRating: 2.0, totalSessions: 17, trend: "improving" },
    { player: "Fatima Bello", avgRating: 3.5, totalSessions: 13, trend: "declining" },
    { player: "Michael Tetteh", avgRating: 2.6, totalSessions: 16, trend: "stable" },
];

const AdminPerformancePage = () => {
    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">PERFORMANCE</h1>
                    <p className="font-body text-sm text-muted-foreground mt-1">Review and approve player performance ratings</p>
                </div>

                {/* Pending approvals */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-accent" />
                            <h2 className="font-display text-lg font-semibold text-foreground">PENDING APPROVALS</h2>
                        </div>
                        <Badge>{pendingRatings.length} pending</Badge>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Player</TableHead>
                                <TableHead>Session</TableHead>
                                <TableHead>Self Rating</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingRatings.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell className="font-body font-medium text-foreground">{r.player}</TableCell>
                                    <TableCell className="font-body text-muted-foreground">{r.session}</TableCell>
                                    <TableCell>
                                        <span className={`font-display font-bold ${r.rating <= 2 ? "text-primary" : r.rating <= 4 ? "text-accent-foreground" : "text-destructive"}`}>
                                            {r.rating}/10
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-body text-muted-foreground text-sm">{r.submittedAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                                                <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                                <XCircle className="w-4 h-4 mr-1" /> Reject
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Overall performance table */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border">
                        <h2 className="font-display text-lg font-semibold text-foreground">OVERALL PERFORMANCE</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead>Avg Rating</TableHead>
                                <TableHead>Sessions Rated</TableHead>
                                <TableHead>Trend</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {approvedRatings
                                .sort((a, b) => a.avgRating - b.avgRating)
                                .map((p, i) => (
                                    <TableRow key={p.player}>
                                        <TableCell className="font-display font-bold text-muted-foreground">{i + 1}</TableCell>
                                        <TableCell className="font-body font-medium text-foreground">{p.player}</TableCell>
                                        <TableCell>
                                            <span className={`font-display font-bold ${p.avgRating <= 2 ? "text-primary" : p.avgRating <= 3 ? "text-accent-foreground" : "text-destructive"}`}>
                                                {p.avgRating}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-body text-muted-foreground">{p.totalSessions}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={
                                                p.trend === "improving" ? "bg-primary/10 text-primary" :
                                                    p.trend === "declining" ? "bg-destructive/10 text-destructive" :
                                                        "bg-muted text-muted-foreground"
                                            }>
                                                {p.trend}
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

export default AdminPerformancePage;
