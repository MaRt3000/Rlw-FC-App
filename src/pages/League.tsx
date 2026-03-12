import { teams } from "@/lib/dummy-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy, TrendingUp, TrendingDown, Target, Medal, Crown, Star, Award,
    Flame, Calendar, Users, Activity, ChevronUp, ChevronDown, Minus,
    Shield, User, UserCircle, UserCog, Phone, Mail, MapPin,
    ChevronRight, ChevronLeft, CircleDot, UserPlus, UserMinus,
    Gauge, Footprints, Heart, Zap, Sparkles, Flag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Extend team data with mock players
const teamsWithDetails = teams.map(team => ({
    ...team,
    captain: {
        name: `${team.name.split(' ')[0]} Captain`,
        number: 10,
        position: "Midfielder",
        age: 28,
        nationality: "England",
        joined: "2020",
        photo: `https://i.pravatar.cc/150?u=${team.id}`
    },
    players: [
        { id: `${team.id}-1`, name: "James Wilson", number: 1, position: "Goalkeeper", age: 25, nationality: "England", rating: 8.5, appearances: 18, goals: 0, assists: 1, fitness: "Excellent", preferredFoot: "Right" },
        { id: `${team.id}-2`, name: "Michael Brown", number: 2, position: "Defender", age: 27, nationality: "Scotland", rating: 8.2, appearances: 20, goals: 1, assists: 2, fitness: "Good", preferredFoot: "Right" },
        { id: `${team.id}-3`, name: "David Lee", number: 3, position: "Defender", age: 24, nationality: "Wales", rating: 8.0, appearances: 15, goals: 0, assists: 3, fitness: "Excellent", preferredFoot: "Left" },
        { id: `${team.id}-4`, name: "Thomas Clark", number: 4, position: "Defender", age: 26, nationality: "England", rating: 8.3, appearances: 19, goals: 2, assists: 1, fitness: "Good", preferredFoot: "Right" },
        { id: `${team.id}-5`, name: "Andrew Taylor", number: 5, position: "Defender", age: 29, nationality: "Ireland", rating: 8.1, appearances: 17, goals: 0, assists: 0, fitness: "Fair", preferredFoot: "Right" },
        { id: `${team.id}-6`, name: "Robert Johnson", number: 6, position: "Midfielder", age: 26, nationality: "England", rating: 8.7, appearances: 20, goals: 3, assists: 8, fitness: "Excellent", preferredFoot: "Right" },
        { id: `${team.id}-7`, name: "William Davis", number: 7, position: "Midfielder", age: 24, nationality: "Scotland", rating: 8.4, appearances: 18, goals: 5, assists: 6, fitness: "Good", preferredFoot: "Right" },
        { id: `${team.id}-8`, name: "Richard Moore", number: 8, position: "Midfielder", age: 27, nationality: "England", rating: 8.6, appearances: 19, goals: 4, assists: 7, fitness: "Excellent", preferredFoot: "Left" },
        { id: `${team.id}-9`, name: "Joseph White", number: 9, position: "Forward", age: 25, nationality: "Wales", rating: 9.0, appearances: 20, goals: 15, assists: 4, fitness: "Excellent", preferredFoot: "Right" },
        { id: `${team.id}-10`, name: "Charles Harris", number: 10, position: "Forward", age: 28, nationality: "England", rating: 8.9, appearances: 19, goals: 12, assists: 6, fitness: "Good", preferredFoot: "Right" },
        { id: `${team.id}-11`, name: "Thomas Martin", number: 11, position: "Forward", age: 23, nationality: "Ireland", rating: 8.3, appearances: 16, goals: 8, assists: 3, fitness: "Excellent", preferredFoot: "Left" }
    ]
}));

const League = () => {
    const [viewMode, setViewMode] = useState<"table" | "cards">("table");
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("squad");

    // Sort teams by points, then goal difference
    const sorted = [...teamsWithDetails].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const gdA = a.goalsFor - a.goalsAgainst;
        const gdB = b.goalsFor - b.goalsAgainst;
        return gdB - gdA;
    });

    // Calculate league statistics
    const totalTeams = teamsWithDetails.length;
    const totalMatches = teamsWithDetails.reduce((acc, t) => acc + t.played, 0) / 2;
    const totalGoals = teamsWithDetails.reduce((acc, t) => acc + t.goalsFor, 0);
    const averageGoalsPerMatch = (totalGoals / totalMatches).toFixed(1);

    const topScoringTeam = sorted.reduce((max, t) => t.goalsFor > max.goalsFor ? t : max, sorted[0]);
    const bestDefense = sorted.reduce((min, t) => t.goalsAgainst < min.goalsAgainst ? t : min, sorted[0]);
    const formTeam = sorted[0];

    const getPositionStyle = (index: number) => {
        if (index === 0) return "bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/30";
        if (index === 1) return "bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30";
        if (index === 2) return "bg-gradient-to-r from-amber-600/20 to-amber-600/5 border-amber-600/30";
        if (index <= 4) return "bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20";
        if (index >= sorted.length - 3) return "bg-gradient-to-r from-red-500/10 to-red-500/5 border-red-500/20";
        return "";
    };

    const getPositionIcon = (index: number) => {
        if (index === 0) return <Crown className="w-4 h-4 text-yellow-500" />;
        if (index === 1) return <Medal className="w-4 h-4 text-gray-400" />;
        if (index === 2) return <Award className="w-4 h-4 text-amber-600" />;
        return null;
    };

    const getFormIcon = (team: typeof teamsWithDetails[0]) => {
        const gd = team.goalsFor - team.goalsAgainst;
        if (gd > 10) return <Flame className="w-4 h-4 text-orange-500" />;
        if (gd > 5) return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (gd < -5) return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <DashboardLayout role="player">
            <div className="space-y-8 pb-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            League Table
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            February-March Cup 2026 • Season {new Date().getFullYear()}
                        </p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === "table" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("table")}
                            className="rounded-full"
                        >
                            Table View
                        </Button>
                        <Button
                            variant={viewMode === "cards" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("cards")}
                            className="rounded-full"
                        >
                            Card View
                        </Button>
                    </div>
                </motion.div>

                {/* League Statistics */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-2 lg:grid-cols-5 gap-4"
                >
                    {[
                        { title: "Teams", value: totalTeams, icon: Users, color: "blue", change: "Participating" },
                        { title: "Matches", value: totalMatches, icon: Calendar, color: "green", change: "Played" },
                        { title: "Total Goals", value: totalGoals, icon: Target, color: "purple", change: `${averageGoalsPerMatch} per match` },
                        { title: "Top Scorer", value: topScoringTeam.name.split(' ')[0], icon: Flame, color: "orange", change: `${topScoringTeam.goalsFor} goals` },
                        { title: "Best Defense", value: bestDefense.name.split(' ')[0], icon: Shield, color: "red", change: `${bestDefense.goalsAgainst} conceded` }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.title}
                                variants={fadeInUp}
                                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                                            <Icon className={`w-4 h-4 text-${stat.color}-500`} />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{stat.change}</span>
                                    </div>
                                    <div className="text-xl font-bold">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground mt-1">{stat.title}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Table View */}
                {viewMode === "table" && (
                    <motion.div
                        {...fadeInUp}
                        className="stat-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="w-16 font-display font-semibold">Pos</TableHead>
                                        <TableHead className="font-display font-semibold">Team</TableHead>
                                        <TableHead className="text-center font-display font-semibold">P</TableHead>
                                        <TableHead className="text-center font-display font-semibold">W</TableHead>
                                        <TableHead className="text-center font-display font-semibold">D</TableHead>
                                        <TableHead className="text-center font-display font-semibold">L</TableHead>
                                        <TableHead className="text-center font-display font-semibold">GF</TableHead>
                                        <TableHead className="text-center font-display font-semibold">GA</TableHead>
                                        <TableHead className="text-center font-display font-semibold">GD</TableHead>
                                        <TableHead className="text-center font-display font-semibold text-primary">Pts</TableHead>
                                        <TableHead className="text-center font-display font-semibold">Form</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sorted.map((t, i) => {
                                        const gd = t.goalsFor - t.goalsAgainst;
                                        const isSelected = selectedTeam === t.id;

                                        return (
                                            <motion.tr
                                                key={t.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => {
                                                    setSelectedTeam(isSelected ? null : t.id);
                                                    setExpandedTeam(expandedTeam === t.id ? null : t.id);
                                                }}
                                                className={`
                                                    cursor-pointer transition-all duration-200
                                                    ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'}
                                                    ${getPositionStyle(i)}
                                                `}
                                            >
                                                <TableCell className="font-display font-bold">
                                                    <div className="flex items-center gap-1">
                                                        {getPositionIcon(i)}
                                                        <span>{i + 1}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-display font-semibold">{t.name}</span>
                                                        {i === 0 && (
                                                            <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                                                Leader
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center font-medium">{t.played}</TableCell>
                                                <TableCell className="text-center font-medium text-green-600">{t.won}</TableCell>
                                                <TableCell className="text-center font-medium text-yellow-600">{t.drawn}</TableCell>
                                                <TableCell className="text-center font-medium text-red-600">{t.lost}</TableCell>
                                                <TableCell className="text-center font-medium">{t.goalsFor}</TableCell>
                                                <TableCell className="text-center font-medium">{t.goalsAgainst}</TableCell>
                                                <TableCell className={`text-center font-medium ${gd > 0 ? 'text-green-600' : gd < 0 ? 'text-red-600' : 'text-muted-foreground'
                                                    }`}>
                                                    {gd > 0 ? `+${gd}` : gd}
                                                </TableCell>
                                                <TableCell className="text-center font-display font-bold text-lg text-primary">
                                                    {t.points}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {getFormIcon(t)}
                                                        <div className="flex gap-0.5">
                                                            {[...Array(5)].map((_, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`w-1.5 h-4 rounded-full ${idx < 3 ? 'bg-green-500' : idx === 3 ? 'bg-yellow-500' : 'bg-red-500'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Table Legend */}
                        <div className="flex items-center justify-end gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                <span>Champions League</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500/30" />
                                <span>Europa League</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                <span>Relegation</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Card View */}
                {viewMode === "cards" && (
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {sorted.map((t, i) => {
                            const gd = t.goalsFor - t.goalsAgainst;
                            const winRate = ((t.won / t.played) * 100).toFixed(1);

                            return (
                                <motion.div
                                    key={t.id}
                                    variants={fadeInUp}
                                    className={`
                                        relative overflow-hidden stat-card hover:shadow-xl transition-all duration-300 cursor-pointer
                                        ${getPositionStyle(i)}
                                        ${expandedTeam === t.id ? 'ring-2 ring-primary' : ''}
                                    `}
                                    onClick={() => setExpandedTeam(expandedTeam === t.id ? null : t.id)}
                                >
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl" />

                                    <div className="relative">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                                                    {getPositionIcon(i) || <span className="font-bold text-primary">#{i + 1}</span>}
                                                </div>
                                                <h3 className="font-display font-bold text-lg">{t.name}</h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-display font-bold text-primary">{t.points}</div>
                                                <div className="text-xs text-muted-foreground">points</div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-4 gap-2 mb-4">
                                            <div className="text-center p-2 bg-muted/50 rounded-lg">
                                                <div className="text-sm font-bold">{t.played}</div>
                                                <div className="text-xs text-muted-foreground">Played</div>
                                            </div>
                                            <div className="text-center p-2 bg-muted/50 rounded-lg">
                                                <div className="text-sm font-bold text-green-600">{t.won}</div>
                                                <div className="text-xs text-muted-foreground">Won</div>
                                            </div>
                                            <div className="text-center p-2 bg-muted/50 rounded-lg">
                                                <div className="text-sm font-bold text-yellow-600">{t.drawn}</div>
                                                <div className="text-xs text-muted-foreground">Drawn</div>
                                            </div>
                                            <div className="text-center p-2 bg-muted/50 rounded-lg">
                                                <div className="text-sm font-bold text-red-600">{t.lost}</div>
                                                <div className="text-xs text-muted-foreground">Lost</div>
                                            </div>
                                        </div>

                                        {/* Goal Statistics */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center justify-between text-sm mb-1">
                                                    <span className="text-muted-foreground">Goals For</span>
                                                    <span className="font-bold">{t.goalsFor}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm mb-1">
                                                    <span className="text-muted-foreground">Goals Against</span>
                                                    <span className="font-bold">{t.goalsAgainst}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Goal Difference</span>
                                                    <span className={`font-bold ${gd > 0 ? 'text-green-600' : gd < 0 ? 'text-red-600' : ''
                                                        }`}>
                                                        {gd > 0 ? `+${gd}` : gd}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Win Rate Circle */}
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="relative w-16 h-16">
                                                    <svg className="w-16 h-16 transform -rotate-90">
                                                        <circle
                                                            cx="32"
                                                            cy="32"
                                                            r="28"
                                                            stroke="hsl(var(--muted))"
                                                            strokeWidth="4"
                                                            fill="none"
                                                        />
                                                        <circle
                                                            cx="32"
                                                            cy="32"
                                                            r="28"
                                                            stroke="hsl(145, 60%, 36%)"
                                                            strokeWidth="4"
                                                            fill="none"
                                                            strokeDasharray={`${2 * Math.PI * 28}`}
                                                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - parseFloat(winRate) / 100)}`}
                                                            className="transition-all duration-1000"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-sm font-bold">{winRate}%</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-muted-foreground mt-1">Win Rate</span>
                                            </div>
                                        </div>

                                        {/* Expand Indicator */}
                                        <div className="flex items-center justify-center text-xs text-muted-foreground">
                                            <span>Click to view squad</span>
                                            <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${expandedTeam === t.id ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {/* Expanded Team Details */}
                <AnimatePresence>
                    {expandedTeam && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {sorted.filter(t => t.id === expandedTeam).map(team => (
                                <div key={team.id} className="space-y-6">
                                    {/* Team Header */}
                                    <div className="stat-card bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                    <Users className="w-8 h-8 text-primary" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-display font-bold">{team.name}</h2>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Flag className="w-4 h-4" />
                                                            Position #{sorted.findIndex(t => t.id === team.id) + 1}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Trophy className="w-4 h-4" />
                                                            {team.points} Points
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Target className="w-4 h-4" />
                                                            GD: {team.goalsFor - team.goalsAgainst}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                                                <Crown className="w-4 h-4 mr-2" />
                                                {team.played} Matches Played
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Tabs for Squad Info */}
                                    <Tabs defaultValue="squad" className="w-full" onValueChange={setActiveTab}>
                                        <TabsList className="grid w-full grid-cols-3 mb-6">
                                            <TabsTrigger value="squad">Full Squad</TabsTrigger>
                                            <TabsTrigger value="captain">Captain & Staff</TabsTrigger>
                                            <TabsTrigger value="stats">Team Stats</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="squad" className="space-y-4">
                                            {/* Squad Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {team.players.map((player, idx) => (
                                                    <motion.div
                                                        key={player.id}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className="group relative overflow-hidden stat-card hover:shadow-lg transition-all duration-300"
                                                    >
                                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl" />

                                                        <div className="relative flex items-start gap-3">
                                                            <Avatar className="w-12 h-12 border-2 border-background">
                                                                <AvatarImage src={`https://i.pravatar.cc/150?u=${player.id}`} />
                                                                <AvatarFallback className="bg-primary/10">
                                                                    {player.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>

                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="font-semibold">{player.name}</p>
                                                                    <Badge variant="outline" className="text-xs">
                                                                        #{player.number}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground">{player.position}</p>

                                                                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                                                                    <div className="flex items-center gap-1">
                                                                        <Flag className="w-3 h-3 text-muted-foreground" />
                                                                        <span>{player.nationality}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Heart className="w-3 h-3 text-muted-foreground" />
                                                                        <span>{player.age} yrs</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Gauge className="w-3 h-3 text-muted-foreground" />
                                                                        <span className={`
                                                                            ${player.fitness === 'Excellent' ? 'text-green-500' :
                                                                                player.fitness === 'Good' ? 'text-yellow-500' : 'text-red-500'}
                                                                        `}>
                                                                            {player.fitness}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Footprints className="w-3 h-3 text-muted-foreground" />
                                                                        <span>{player.preferredFoot}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Player Stats */}
                                                            <div className="text-right">
                                                                <div className="text-lg font-bold text-primary">{player.rating}</div>
                                                                <div className="text-xs text-muted-foreground">Rating</div>
                                                                <div className="flex items-center gap-1 mt-2 text-xs">
                                                                    <Zap className="w-3 h-3 text-yellow-500" />
                                                                    <span>{player.goals}G</span>
                                                                    <span className="text-muted-foreground">/</span>
                                                                    <span>{player.assists}A</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Player Stats Bar */}
                                                        <div className="mt-3 pt-3 border-t border-border">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-muted-foreground">Appearances</span>
                                                                <span className="font-medium">{player.appearances} matches</span>
                                                            </div>
                                                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${(player.appearances / 20) * 100}%` }}
                                                                    transition={{ delay: 0.5 + idx * 0.05, duration: 0.5 }}
                                                                    className="h-full bg-primary rounded-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="captain">
                                            <div className="stat-card bg-gradient-to-br from-yellow-500/5 to-transparent border-yellow-500/20">
                                                <div className="flex flex-col md:flex-row items-start gap-6">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl" />
                                                        <Avatar className="w-24 h-24 border-4 border-background">
                                                            <AvatarImage src={team.captain.photo} />
                                                            <AvatarFallback className="bg-yellow-500/20 text-2xl">
                                                                {team.captain.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1.5">
                                                            <Crown className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="text-2xl font-display font-bold">{team.captain.name}</h3>
                                                            <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                                                Captain
                                                            </Badge>
                                                        </div>
                                                        <p className="text-muted-foreground mb-4">Leading the team since {team.captain.joined}</p>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                            <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                                <div className="text-sm font-bold">{team.captain.number}</div>
                                                                <div className="text-xs text-muted-foreground">Number</div>
                                                            </div>
                                                            <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                                <div className="text-sm font-bold">{team.captain.position}</div>
                                                                <div className="text-xs text-muted-foreground">Position</div>
                                                            </div>
                                                            <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                                <div className="text-sm font-bold">{team.captain.age}</div>
                                                                <div className="text-xs text-muted-foreground">Age</div>
                                                            </div>
                                                            <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                                <div className="text-sm font-bold">{team.captain.nationality}</div>
                                                                <div className="text-xs text-muted-foreground">Nationality</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="stats">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {/* Team Stats Cards */}
                                                <Card className="bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
                                                    <CardContent className="p-6">
                                                        <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                                                            <Activity className="w-5 h-5 text-blue-500" />
                                                            Season Overview
                                                        </h4>
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Matches Played</span>
                                                                <span className="font-bold">{team.played}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Win Rate</span>
                                                                <span className="font-bold text-green-500">{((team.won / team.played) * 100).toFixed(1)}%</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Points Per Match</span>
                                                                <span className="font-bold">{(team.points / team.played).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
                                                    <CardContent className="p-6">
                                                        <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                                                            <Target className="w-5 h-5 text-green-500" />
                                                            Attacking Stats
                                                        </h4>
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Goals Scored</span>
                                                                <span className="font-bold">{team.goalsFor}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Goals Per Match</span>
                                                                <span className="font-bold">{(team.goalsFor / team.played).toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Best Scorer</span>
                                                                <span className="font-bold">Joseph White (15)</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
                                                    <CardContent className="p-6">
                                                        <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                                                            <Shield className="w-5 h-5 text-red-500" />
                                                            Defensive Stats
                                                        </h4>
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Goals Conceded</span>
                                                                <span className="font-bold">{team.goalsAgainst}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Goals Conceded Per Match</span>
                                                                <span className="font-bold">{(team.goalsAgainst / team.played).toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Clean Sheets</span>
                                                                <span className="font-bold">7</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20">
                                                    <CardContent className="p-6">
                                                        <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                                                            <Users className="w-5 h-5 text-purple-500" />
                                                            Squad Stats
                                                        </h4>
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Total Players</span>
                                                                <span className="font-bold">{team.players.length}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Average Age</span>
                                                                <span className="font-bold">25.8</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Foreign Players</span>
                                                                <span className="font-bold">4</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Statistics */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-medium">Top Scorer</span>
                            </div>
                            <p className="text-lg font-bold">{topScoringTeam.name}</p>
                            <p className="text-xs text-muted-foreground">{topScoringTeam.goalsFor} goals scored</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium">Best Defense</span>
                            </div>
                            <p className="text-lg font-bold">{bestDefense.name}</p>
                            <p className="text-xs text-muted-foreground">{bestDefense.goalsAgainst} goals conceded</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium">Best GD</span>
                            </div>
                            <p className="text-lg font-bold">{sorted[0].name}</p>
                            <p className="text-xs text-muted-foreground">+{sorted[0].goalsFor - sorted[0].goalsAgainst} goal difference</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium">Form Team</span>
                            </div>
                            <p className="text-lg font-bold">{formTeam.name}</p>
                            <p className="text-xs text-muted-foreground">{formTeam.won} wins this season</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default League;