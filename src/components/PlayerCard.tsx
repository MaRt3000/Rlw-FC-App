import { Player } from "@/lib/types";
import { RatingBadge } from "./RatingBadge";
import { Badge } from "@/components/ui/badge";

interface PlayerCardProps {
    player: Player;
    rank?: number;
    showDetails?: boolean;
    className?: string;
}

export const PlayerCard = ({ player, rank, showDetails = false, className }: PlayerCardProps) => {
    return (
        <div className={`stat-card flex items-center gap-4 ${className ? className : "bg-card border border-border"} rounded-lg p-4`}>
            {rank && (
                <span className="font-display font-bold text-2xl text-muted-foreground w-8 text-center">
                    {rank}
                </span>
            )}
            <img
                src={player.photo}
                alt={player.fullName}
                className="w-12 h-12 rounded-full bg-muted"
            />
            <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold truncate">{player.fullName}</h4>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                        {player.positionGroup}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        {player.positions[0]}
                    </span>
                    {showDetails && (
                        <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                                {player.ageBracket}
                            </span>
                        </>
                    )}
                </div>
            </div>
            <RatingBadge rating={player.rating} />
        </div>
    );
};
