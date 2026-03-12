import { players } from "@/lib/dummy-data";
import { PlayerCard } from "@/components/PlayerCard";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const positionGroups = ["All", "Attackers", "Midfielders", "Defenders", "Wingers"] as const;

const Players = () => {
    const [filter, setFilter] = useState<string>("All");
    const filtered = filter === "All" ? players : players.filter(p => p.positionGroup === filter);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="section-title">Players</h1>
                <p className="text-muted-foreground mt-1">{players.length} registered players</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {positionGroups.map(g => (
                    <Badge
                        key={g}
                        variant={filter === g ? "default" : "secondary"}
                        className="cursor-pointer text-sm px-4 py-1.5"
                        onClick={() => setFilter(g)}
                    >
                        {g}
                    </Badge>
                ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((p, i) => (
                    <PlayerCard key={p.id} player={p} rank={i + 1} showDetails />
                ))}
            </div>
        </div>
    );
};

export default Players;
