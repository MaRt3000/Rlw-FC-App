import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Plus } from "lucide-react";

const standings = [
    { pos: 1, team: "Team Alpha", p: 4, w: 3, d: 1, l: 0, gf: 10, ga: 3, gd: 7, pts: 10 },
    { pos: 2, team: "Team Charlie", p: 4, w: 2, d: 1, l: 1, gf: 8, ga: 5, gd: 3, pts: 7 },
    { pos: 3, team: "Team Bravo", p: 4, w: 1, d: 1, l: 2, gf: 5, ga: 7, gd: -2, pts: 4 },
    { pos: 4, team: "Team Delta", p: 4, w: 0, d: 1, l: 3, gf: 3, ga: 11, gd: -8, pts: 1 },
];

const fixtures = [
    { id: 1, date: "Sat, Mar 1", home: "Team Alpha", away: "Team Bravo", score: "3 – 1", status: "played" },
    { id: 2, date: "Sat, Mar 1", home: "Team Charlie", away: "Team Delta", score: "2 – 0", status: "played" },
    { id: 3, date: "Sat, Mar 8", home: "Team Alpha", away: "Team Charlie", score: "1 – 1", status: "played" },
    { id: 4, date: "Sat, Mar 8", home: "Team Bravo", away: "Team Delta", score: "2 – 1", status: "played" },
    { id: 5, date: "Sat, Mar 15", home: "Team Alpha", away: "Team Delta", score: "— v —", status: "upcoming" },
    { id: 6, date: "Sat, Mar 15", home: "Team Charlie", away: "Team Bravo", score: "— v —", status: "upcoming" },
];

const topScorers = [
    { name: "Emmanuel Adekunle", team: "Alpha", goals: 5, assists: 2 },
    { name: "James Kariuki", team: "Charlie", goals: 4, assists: 3 },
    { name: "Ada Mensah", team: "Bravo", goals: 3, assists: 1 },
    { name: "Player Q", team: "Charlie", goals: 2, assists: 2 },
    { name: "Player I", team: "Bravo", goals: 2, assists: 0 },
];

const matchStats = [
    { match: "Alpha vs Bravo", motm: "Emmanuel Adekunle", yellows: 2, reds: 0 },
    { match: "Charlie vs Delta", motm: "James Kariuki", yellows: 1, reds: 0 },
    { match: "Alpha vs Charlie", motm: "Sarah Kimani", yellows: 3, reds: 1 },
    { match: "Bravo vs Delta", motm: "Ada Mensah", yellows: 0, reds: 0 },
];

const AdminCompetitionPage = () => {
    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-foreground">COMPETITION</h1>
                        <p className="font-body text-sm text-muted-foreground mt-1">League 3 — Mar/Apr 2026</p>
                    </div>
                    <Button variant="heroPrimary" size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Record Result
                    </Button>
                </div>

                <Tabs defaultValue="standings">
                    <TabsList>
                        <TabsTrigger value="standings">Standings</TabsTrigger>
                        <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
                        <TabsTrigger value="scorers">Top Scorers</TabsTrigger>
                        <TabsTrigger value="stats">Match Stats</TabsTrigger>
                    </TabsList>

                    <TabsContent value="standings" className="mt-4">
                        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">#</TableHead>
                                        <TableHead>Team</TableHead>
                                        <TableHead className="text-center">P</TableHead>
                                        <TableHead className="text-center">W</TableHead>
                                        <TableHead className="text-center">D</TableHead>
                                        <TableHead className="text-center">L</TableHead>
                                        <TableHead className="text-center">GF</TableHead>
                                        <TableHead className="text-center">GA</TableHead>
                                        <TableHead className="text-center">GD</TableHead>
                                        <TableHead className="text-center">Pts</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {standings.map((t) => (
                                        <TableRow key={t.team}>
                                            <TableCell className="font-display font-bold">{t.pos}</TableCell>
                                            <TableCell className="font-body font-medium text-foreground flex items-center gap-2">
                                                {t.pos === 1 && <Trophy className="w-4 h-4 text-accent" />}
                                                {t.team}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">{t.p}</TableCell>
                                            <TableCell className="text-center text-muted-foreground">{t.w}</TableCell>
                                            <TableCell className="text-center text-muted-foreground">{t.d}</TableCell>
                                            <TableCell className="text-center text-muted-foreground">{t.l}</TableCell>
                                            <TableCell className="text-center text-muted-foreground">{t.gf}</TableCell>
                                            <TableCell className="text-center text-muted-foreground">{t.ga}</TableCell>
                                            <TableCell className="text-center font-medium">{t.gd > 0 ? `+${t.gd}` : t.gd}</TableCell>
                                            <TableCell className="text-center font-display font-bold text-primary">{t.pts}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="fixtures" className="mt-4">
                        <div className="space-y-3">
                            {fixtures.map((f) => (
                                <div key={f.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                                    <span className="font-body text-xs text-muted-foreground w-24">{f.date}</span>
                                    <div className="flex-1 flex items-center justify-center gap-4">
                                        <span className="font-display font-semibold text-foreground text-right flex-1">{f.home}</span>
                                        <span className={`font-display font-bold px-3 py-1 rounded ${f.status === "played" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                            {f.score}
                                        </span>
                                        <span className="font-display font-semibold text-foreground text-left flex-1">{f.away}</span>
                                    </div>
                                    <Badge variant={f.status === "upcoming" ? "default" : "secondary"} className="w-20 justify-center">
                                        {f.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="scorers" className="mt-4">
                        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">#</TableHead>
                                        <TableHead>Player</TableHead>
                                        <TableHead>Team</TableHead>
                                        <TableHead className="text-center">Goals</TableHead>
                                        <TableHead className="text-center">Assists</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topScorers.map((s, i) => (
                                        <TableRow key={s.name}>
                                            <TableCell className="font-display font-bold text-muted-foreground">{i + 1}</TableCell>
                                            <TableCell className="font-body font-medium text-foreground">{s.name}</TableCell>
                                            <TableCell className="font-body text-muted-foreground">{s.team}</TableCell>
                                            <TableCell className="text-center font-display font-bold text-primary">{s.goals}</TableCell>
                                            <TableCell className="text-center font-display font-bold text-muted-foreground">{s.assists}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="stats" className="mt-4">
                        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Match</TableHead>
                                        <TableHead>Man of the Match</TableHead>
                                        <TableHead className="text-center">Yellows</TableHead>
                                        <TableHead className="text-center">Reds</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {matchStats.map((m) => (
                                        <TableRow key={m.match}>
                                            <TableCell className="font-body font-medium text-foreground">{m.match}</TableCell>
                                            <TableCell className="font-body text-accent-foreground font-medium">{m.motm}</TableCell>
                                            <TableCell className="text-center font-display font-bold text-accent-foreground">{m.yellows}</TableCell>
                                            <TableCell className="text-center font-display font-bold text-destructive">{m.reds}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default AdminCompetitionPage;
