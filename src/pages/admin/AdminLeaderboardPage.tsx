import DashboardLayout from "@/components/DashboardLayout";
import { Trophy, Award, Star } from "lucide-react";

const top8 = [
    { rank: 1, name: "Ada Mensah", score: 1.9, attendance: "95%", position: "Winger" },
    { rank: 2, name: "James Kariuki", score: 2.0, attendance: "90%", position: "Attacker" },
    { rank: 3, name: "Emmanuel Adekunle", score: 2.1, attendance: "92%", position: "Attacker" },
    { rank: 4, name: "Sarah Kimani", score: 2.4, attendance: "88%", position: "Midfielder" },
    { rank: 5, name: "Player Q", score: 2.5, attendance: "86%", position: "Defender" },
    { rank: 6, name: "Michael Tetteh", score: 2.6, attendance: "85%", position: "Winger" },
    { rank: 7, name: "Player R", score: 2.7, attendance: "84%", position: "Midfielder" },
    { rank: 8, name: "Daniel Osei", score: 2.8, attendance: "75%", position: "Defender" },
];

const honorable = [
    { name: "Kwame Boateng", score: 3.2, attendance: "80%", position: "Midfielder" },
    { name: "Fatima Bello", score: 3.5, attendance: "70%", position: "Defender" },
];

const AdminLeaderboardPage = () => {
    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">LEADERBOARD</h1>
                    <p className="font-body text-sm text-muted-foreground mt-1">Monthly top performers — March 2026</p>
                </div>

                {/* Top 3 podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {top8.slice(0, 3).map((p, i) => {
                        const sizes = ["ring-accent", "ring-muted-foreground", "ring-orange-400"];
                        const icons = [<Trophy key="t" className="w-6 h-6 text-accent" />, <Award key="a" className="w-5 h-5 text-muted-foreground" />, <Award key="b" className="w-5 h-5 text-orange-400" />];
                        return (
                            <div key={p.name} className={`bg-card border border-border rounded-xl p-6 shadow-sm text-center ${i === 0 ? "md:order-2 ring-2 ring-accent/30" : i === 1 ? "md:order-1" : "md:order-3"}`}>
                                <div className={`w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 ring-2 ${sizes[i]}`}>
                                    <span className="font-display text-2xl font-bold text-primary">{p.rank}</span>
                                </div>
                                {icons[i]}
                                <h3 className="font-display text-lg font-bold text-foreground mt-2">{p.name}</h3>
                                <p className="font-body text-xs text-muted-foreground">{p.position}</p>
                                <div className="flex justify-center gap-4 mt-3">
                                    <div>
                                        <div className="font-display text-lg font-bold text-primary">{p.score}</div>
                                        <div className="font-body text-[10px] text-muted-foreground">AVG RATING</div>
                                    </div>
                                    <div>
                                        <div className="font-display text-lg font-bold text-foreground">{p.attendance}</div>
                                        <div className="font-body text-[10px] text-muted-foreground">ATTENDANCE</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Ranks 4-8 */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border">
                        <h2 className="font-display text-lg font-semibold text-foreground">TOP 8</h2>
                    </div>
                    <div className="divide-y divide-border">
                        {top8.slice(3).map((p) => (
                            <div key={p.name} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-display font-bold text-sm text-muted-foreground">{p.rank}</div>
                                    <div>
                                        <span className="font-body font-medium text-foreground">{p.name}</span>
                                        <span className="font-body text-xs text-muted-foreground ml-2">{p.position}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="font-display font-bold text-primary">{p.score}</div>
                                        <div className="font-body text-[10px] text-muted-foreground">RATING</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-display font-bold text-foreground">{p.attendance}</div>
                                        <div className="font-body text-[10px] text-muted-foreground">ATT.</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Honorable mentions */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border flex items-center gap-2">
                        <Star className="w-5 h-5 text-accent" />
                        <h2 className="font-display text-lg font-semibold text-foreground">HONORABLE MENTIONS</h2>
                    </div>
                    <div className="divide-y divide-border">
                        {honorable.map((p) => (
                            <div key={p.name} className="flex items-center justify-between p-4">
                                <div>
                                    <span className="font-body font-medium text-foreground">{p.name}</span>
                                    <span className="font-body text-xs text-muted-foreground ml-2">{p.position}</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="font-display font-bold text-primary">{p.score}</div>
                                        <div className="font-body text-[10px] text-muted-foreground">RATING</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-display font-bold text-foreground">{p.attendance}</div>
                                        <div className="font-body text-[10px] text-muted-foreground">ATT.</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminLeaderboardPage;
