import { players, performanceChartData } from "@/lib/dummy-data";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, TrendingDown, Target, Star, Trophy, Award, Activity, TrendingUp as TrendUp, Medal, Zap, BarChart3, ChevronUp, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from "recharts";
import { RatingBadge } from "@/components/RatingBadge";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Performance = () => {
    const [selectedMetric, setSelectedMetric] = useState("score");
    const [timeRange, setTimeRange] = useState("6weeks");

    // Calculate performance statistics
    const currentPlayer = players[0];
    const playerAvg = 2.1;
    const teamAvg = 3.0;
    const bestSession = 1.0;
    const bestSessionDate = "Feb 27";

    const sortedByPerformance = [...players].sort((a, b) => a.performanceAvg - b.performanceAvg);
    const topPerformer = sortedByPerformance[0];
    const bottomPerformer = sortedByPerformance[sortedByPerformance.length - 1];

    const performanceImprovement = ((teamAvg - playerAvg) / teamAvg * 100).toFixed(1);
    const isImproving = playerAvg < teamAvg;

    // Enhanced chart data with more metrics
    const enhancedChartData = performanceChartData.map((item, index) => ({
        ...item,
        target: 2.5,
        movingAvg: [2.8, 2.6, 2.4, 2.3, 2.2, 2.1][index] || 2.1,
    }));

    const stats = [
        {
            title: "Your Average ",
            value: playerAvg.toFixed(1),
            subtitle: "Performance score",
            icon: Star,
            color: "yellow",

        },
        {
            title: "Team Average",
            value: teamAvg.toFixed(1),
            subtitle: "Performance score",
            icon: Target,
            color: "blue",
        }, {
            title: "Best Session",
            value: bestSession.toFixed(1),
            subtitle: bestSessionDate,
            icon: Trophy,
            color: "orange",
        },
        {
            title: "Sessions Rated",
            value: "24",
            icon: BarChart3,
            color: "purple",
            subtitle: "This season",
        }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
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
                            Performance Tracking
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Score scale: <span className="font-medium text-foreground">1 (best)</span> — <span className="font-medium text-foreground">10 (lowest)</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="px-3 py-1">
                            Last updated: Today 10:30 AM
                        </Badge>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const colorClasses = {
                            yellow: {
                                border: "border-l-yellow-500",
                                iconBg: "bg-yellow-500",
                                gradient: "from-yellow-500/20 to-yellow-500/5"
                            },
                            blue: {
                                border: "border-l-blue-500",
                                iconBg: "bg-blue-500",
                                gradient: "from-blue-500/20 to-blue-500/5"
                            },
                            orange: {
                                border: "border-l-orange-500",
                                iconBg: "bg-orange-500",
                                gradient: "from-orange-500/20 to-orange-500/5"
                            },
                            purple: {
                                border: "border-l-purple-500",
                                iconBg: "bg-purple-500",
                                gradient: "from-purple-500/20 to-purple-500/5"
                            }
                        };

                        const color = colorClasses[stat.color as keyof typeof colorClasses];

                        return (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <StatCard
                                    title={stat.title}
                                    value={stat.value}
                                    subtitle={stat.subtitle}
                                    icon={<Icon className="w-6 h-6" />}
                                    iconColor={color.iconBg}
                                    className={`border-l-4 ${color.border} border border-border p-6 relative overflow-hidden bg-gradient-to-br ${color.gradient}`}

                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Performance Comparison Row */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Your Rank Card */}
                    <div className="stat-card p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Medal className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-display font-semibold">Your Ranking</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-4xl font-display font-bold">#3</p>
                                <p className="text-sm text-muted-foreground mt-1">Out of {players.length} players</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-green-500">
                                    <ChevronUp className="w-4 h-4" />
                                    <span className="text-sm font-medium">+2 positions</span>
                                </div>
                                <p className="text-xs text-muted-foreground">from last month</p>
                            </div>
                        </div>
                    </div>

                    {/* Top Performer Card */}
                    <div className="stat-card p-6 bg-gradient-to-br from-yellow-500/5 to-transparent border-yellow-500/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                            </div>
                            <h3 className="font-display font-semibold">Top Performer</h3>
                        </div>

                        <p className="text-4xl font-display font-bold">#1</p>
                        <div className="flex items-center gap-3">
                            <img src={topPerformer.photo} alt={topPerformer.fullName} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-semibold">{topPerformer.fullName}</p>
                                <p className="text-sm text-muted-foreground">{topPerformer.performanceAvg.toFixed(1)} avg score</p>
                            </div>
                            <RatingBadge rating={topPerformer.rating} size="sm" className="ml-auto" />
                        </div>
                    </div>

                    {/* Improvement Rate Card */}
                    <div className="stat-card p-6 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <TrendUp className="w-5 h-5 text-green-500" />
                            </div>
                            <h3 className="font-display font-semibold">Improvement Rate</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-4xl font-display font-bold">+15%</p>
                                <p className="text-sm text-muted-foreground mt-1">vs last month</p>
                            </div>
                            <div className="text-right">
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                    On Track
                                </Badge>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Chart with Controls */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.4 }}
                    className="stat-card hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="font-display font-semibold text-lg">Performance Trend</h3>
                            <p className="text-sm text-muted-foreground mt-1">Your scores over time</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={timeRange === "6weeks" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTimeRange("6weeks")}
                                className="rounded-full"
                            >
                                6 Weeks
                            </Button>
                            <Button
                                variant={timeRange === "3months" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTimeRange("3months")}
                                className="rounded-full"
                            >
                                3 Months
                            </Button>
                            <Button
                                variant={timeRange === "season" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTimeRange("season")}
                                className="rounded-full"
                            >
                                Season
                            </Button>
                        </div>
                    </div>

                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={enhancedChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMovingAvg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                <XAxis
                                    dataKey="week"
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    reversed
                                    domain={[1, 10]}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <ReferenceLine y={2.5} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: 'Target', position: 'right', fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />

                                <Area
                                    type="monotone"
                                    dataKey="movingAvg"
                                    stroke="hsl(210, 100%, 50%)"
                                    fill="url(#colorMovingAvg)"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                />

                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="hsl(45, 95%, 55%)"
                                    strokeWidth={3}
                                    dot={{ fill: "hsl(45, 95%, 55%)", r: 6, strokeWidth: 2, stroke: "white" }}
                                    activeDot={{ r: 8, stroke: "white", strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[hsl(45,95%,55%)]" />
                            <span className="text-sm text-muted-foreground">Your Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[hsl(210,100%,50%)]" />
                            <span className="text-sm text-muted-foreground">Moving Average</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-t-2 border-dashed border-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Target</span>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Rankings */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-display font-semibold text-lg">Performance Rankings</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Sorted by average score (lower is better)
                            </p>
                        </div>
                        <Badge variant="outline" className="px-3 py-1">
                            {players.length} Players
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        {sortedByPerformance.map((p, i) => {
                            const isCurrentPlayer = p.id === currentPlayer.id;
                            const rankColor = i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-600" : "text-muted-foreground";

                            return (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className={`group relative overflow-hidden stat-card hover:shadow-lg transition-all duration-300 ${isCurrentPlayer ? 'border-primary/30 bg-gradient-to-r from-primary/5 to-transparent' : ''
                                        }`}
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex items-center gap-4">
                                        {/* Rank */}
                                        <div className="relative">
                                            <span className={`font-display font-bold text-2xl ${rankColor} w-10 text-center block`}>
                                                {i + 1}
                                            </span>
                                            {i < 3 && (
                                                <Trophy className={`absolute -top-1 -right-2 w-4 h-4 ${i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : "text-amber-600"
                                                    }`} />
                                            )}
                                        </div>

                                        {/* Player Image */}
                                        <div className="relative">
                                            <img
                                                src={p.photo}
                                                alt={p.fullName}
                                                className="w-12 h-12 rounded-full bg-muted border-2 border-background shadow-lg"
                                            />
                                            {isCurrentPlayer && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background" />
                                            )}
                                        </div>

                                        {/* Player Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold truncate">{p.fullName}</p>
                                                {isCurrentPlayer && (
                                                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                                        You
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span>{p.positionGroup}</span>
                                                <span>•</span>
                                                <span>{p.positions[0]}</span>
                                            </p>
                                        </div>

                                        {/* Performance Stats */}
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <div className="flex items-center gap-2">
                                                    <Activity className="w-4 h-4 text-muted-foreground" />
                                                    <span className="font-display font-bold text-xl">
                                                        {p.performanceAvg.toFixed(1)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">avg score</p>
                                            </div>

                                            <RatingBadge rating={p.rating} size="sm" />
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-muted/30">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${100 - (p.performanceAvg * 10)}%` }}
                                            transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                                            className={`h-full ${i === 0 ? 'bg-yellow-500' :
                                                i === 1 ? 'bg-gray-400' :
                                                    i === 2 ? 'bg-amber-600' :
                                                        'bg-primary/30'
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default Performance;