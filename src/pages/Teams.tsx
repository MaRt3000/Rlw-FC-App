import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shuffle, Crown, Shield, Zap, Crosshair, Wind } from "lucide-react";

const teams = [
    {
        name: "Team Alpha",
        color: "bg-primary",
        captain: "Emmanuel Adekunle",
        players: [
            { name: "Emmanuel Adekunle", position: "Attacker", rating: 2.1, captain: true },
            { name: "Sarah Kimani", position: "Midfielder", rating: 2.4 },
            { name: "Player A", position: "Defender", rating: 3.0 },
            { name: "Player B", position: "Winger", rating: 2.8 },
            { name: "Player C", position: "Midfielder", rating: 3.1 },
            { name: "Player D", position: "Attacker", rating: 2.5 },
            { name: "Player E", position: "Defender", rating: 2.9 },
            { name: "Player F", position: "Midfielder", rating: 3.3 },
            { name: "Player G", position: "Winger", rating: 2.7 },
            { name: "Player H", position: "Defender", rating: 3.0 },
        ],
    },
    {
        name: "Team Bravo",
        color: "bg-destructive",
        captain: "Ada Mensah",
        players: [
            { name: "Ada Mensah", position: "Winger", rating: 1.9, captain: true },
            { name: "Daniel Osei", position: "Defender", rating: 2.8 },
            { name: "Player I", position: "Attacker", rating: 2.3 },
            { name: "Player J", position: "Midfielder", rating: 2.6 },
            { name: "Player K", position: "Defender", rating: 3.2 },
            { name: "Player L", position: "Winger", rating: 2.4 },
            { name: "Player M", position: "Midfielder", rating: 3.0 },
            { name: "Player N", position: "Attacker", rating: 2.7 },
            { name: "Player O", position: "Defender", rating: 2.9 },
            { name: "Player P", position: "Midfielder", rating: 3.1 },
        ],
    },
    {
        name: "Team Charlie",
        color: "bg-accent",
        captain: "James Kariuki",
        players: [
            { name: "James Kariuki", position: "Attacker", rating: 2.0, captain: true },
            { name: "Kwame Boateng", position: "Midfielder", rating: 3.2 },
            { name: "Player Q", position: "Defender", rating: 2.5 },
            { name: "Player R", position: "Winger", rating: 2.8 },
            { name: "Player S", position: "Attacker", rating: 3.0 },
            { name: "Player T", position: "Midfielder", rating: 2.6 },
            { name: "Player U", position: "Defender", rating: 2.9 },
            { name: "Player V", position: "Winger", rating: 3.1 },
            { name: "Player W", position: "Midfielder", rating: 2.7 },
            { name: "Player X", position: "Defender", rating: 3.3 },
        ],
    },
    {
        name: "Team Delta",
        color: "bg-sidebar-primary",
        captain: "Michael Tetteh",
        players: [
            { name: "Michael Tetteh", position: "Winger", rating: 2.6, captain: true },
            { name: "Fatima Bello", position: "Defender", rating: 3.5 },
            { name: "Player Y", position: "Attacker", rating: 2.2 },
            { name: "Player Z", position: "Midfielder", rating: 2.8 },
            { name: "Player AA", position: "Defender", rating: 3.0 },
            { name: "Player BB", position: "Winger", rating: 2.4 },
            { name: "Player CC", position: "Midfielder", rating: 2.9 },
            { name: "Player DD", position: "Attacker", rating: 3.1 },
            { name: "Player EE", position: "Defender", rating: 2.7 },
            { name: "Player FF", position: "Midfielder", rating: 3.2 },
        ],
    },
];

const posIcon: Record<string, React.ReactNode> = {
    Attacker: <Crosshair className="w-3 h-3" />,
    Midfielder: <Zap className="w-3 h-3" />,
    Defender: <Shield className="w-3 h-3" />,
    Winger: <Wind className="w-3 h-3" />,
};

const Teams = () => {
    return (
        <DashboardLayout role="player">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-foreground">TEAM GENERATOR</h1>
                        <p className="font-body text-sm text-muted-foreground mt-1">AI-balanced teams for in-house competition</p>
                    </div>
                    {/* <Button variant="hero" size="sm">
                        <Shuffle className="w-4 h-4 mr-2" /> Generate Teams
                    </Button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teams.map((team) => (
                        <div key={team.name} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className={`h-1.5 ${team.color}`} />
                            <div className="p-5">
                                <h2 className="font-display text-xl font-bold text-foreground mb-4">{team.name.toUpperCase()}</h2>
                                <div className="space-y-2">
                                    {team.players.map((p) => (
                                        <div key={p.name} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                                            <div className="flex items-center gap-2">
                                                {p.captain && <Crown className="w-4 h-4 text-accent" />}
                                                <span className="font-body text-sm text-foreground">{p.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs gap-1">
                                                    {posIcon[p.position]} {p.position}
                                                </Badge>
                                                <span className="font-display text-xs font-bold text-primary">{p.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Teams;
