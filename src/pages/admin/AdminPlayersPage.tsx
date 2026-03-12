import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, MoreHorizontal, Shield, Zap, Crosshair, Wind } from "lucide-react";
import { useState } from "react";

const players = [
  { id: 1, name: "Emmanuel Adekunle", age: "23–27", position: "Attacker", foot: "Right", fitness: "Excellent", injury: "None", attendance: "92%", avatar: "EA" },
  { id: 2, name: "Sarah Kimani", age: "18–22", position: "Midfielder", foot: "Left", fitness: "Good", injury: "None", attendance: "88%", avatar: "SK" },
  { id: 3, name: "Daniel Osei", age: "28–32", position: "Defender", foot: "Right", fitness: "Average", injury: "Knee strain", attendance: "75%", avatar: "DO" },
  { id: 4, name: "Ada Mensah", age: "23–27", position: "Winger", foot: "Right", fitness: "Excellent", injury: "None", attendance: "95%", avatar: "AM" },
  { id: 5, name: "Kwame Boateng", age: "33+", position: "Midfielder", foot: "Right", fitness: "Good", injury: "None", attendance: "80%", avatar: "KB" },
  { id: 6, name: "James Kariuki", age: "18–22", position: "Attacker", foot: "Left", fitness: "Excellent", injury: "None", attendance: "90%", avatar: "JK" },
  { id: 7, name: "Fatima Bello", age: "23–27", position: "Defender", foot: "Right", fitness: "Good", injury: "Ankle sprain", attendance: "70%", avatar: "FB" },
  { id: 8, name: "Michael Tetteh", age: "28–32", position: "Winger", foot: "Left", fitness: "Average", injury: "None", attendance: "85%", avatar: "MT" },
];

const positionIcon: Record<string, React.ReactNode> = {
  Attacker: <Crosshair className="w-3 h-3" />,
  Midfielder: <Zap className="w-3 h-3" />,
  Defender: <Shield className="w-3 h-3" />,
  Winger: <Wind className="w-3 h-3" />,
};

const positionColor: Record<string, string> = {
  Attacker: "bg-destructive/10 text-destructive",
  Midfielder: "bg-primary/10 text-primary",
  Defender: "bg-accent/20 text-accent-foreground",
  Winger: "bg-emerald-500/10 text-emerald-600",
};

const AdminPlayersPage = () => {
  const [search, setSearch] = useState("");
  const filtered = players.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">PLAYERS</h1>
            <p className="font-body text-sm text-muted-foreground mt-1">{players.length} registered players</p>
          </div>
          <Button variant="heroPrimary" size="sm">
            <UserPlus className="w-4 h-4 mr-2" /> Add Player
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search players..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Foot</TableHead>
                <TableHead>Fitness</TableHead>
                <TableHead>Injury</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-display text-xs font-bold text-primary">{p.avatar}</div>
                      <span className="font-body font-medium text-foreground">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{p.age}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`gap-1 ${positionColor[p.position]}`}>
                      {positionIcon[p.position]} {p.position}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground">{p.foot}</TableCell>
                  <TableCell className="font-body text-muted-foreground">{p.fitness}</TableCell>
                  <TableCell>
                    <span className={p.injury === "None" ? "text-muted-foreground" : "text-destructive font-medium"}>{p.injury}</span>
                  </TableCell>
                  <TableCell className="font-display font-bold text-foreground">{p.attendance}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
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

export default AdminPlayersPage;
