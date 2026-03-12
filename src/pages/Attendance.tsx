import { trainingSessions, attendanceChartData } from "@/lib/dummy-data";
import { StatCard } from "@/components/StatCard";
import { Calendar, Clock, MapPin, Users, TrendingUp, CheckCircle, XCircle, AlertCircle, Filter, Download, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";

const Attendance = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");

    // Calculate attendance statistics
    const totalSessions = trainingSessions.length;
    const attendedSessions = trainingSessions.filter(s => s.attendees === s.totalPlayers).length;
    const partialSessions = trainingSessions.filter(s => s.attendees < s.totalPlayers && s.attendees > 0).length;
    const missedSessions = trainingSessions.filter(s => s.attendees === 0).length;

    const attendanceRate = Math.round((attendedSessions / totalSessions) * 100);
    const averageAttendance = Math.round(
        trainingSessions.reduce((acc, s) => acc + (s.attendees / s.totalPlayers * 100), 0) / totalSessions
    );

    // Pie chart data
    const pieData = [
        { name: "Full Attendance", value: attendedSessions, color: "hsl(145, 60%, 36%)" },
        { name: "Partial Attendance", value: partialSessions, color: "hsl(45, 95%, 55%)" },
        { name: "Missed", value: missedSessions, color: "hsl(0, 70%, 50%)" }
    ];

    // Filter sessions based on selection
    const filteredSessions = trainingSessions.filter(s => {
        if (selectedFilter === "full") return s.attendees === s.totalPlayers;
        if (selectedFilter === "partial") return s.attendees < s.totalPlayers && s.attendees > 0;
        if (selectedFilter === "missed") return s.attendees === 0;
        return true;
    });

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const stats = [
        {
            title: "Total Sessions",
            value: totalSessions,
            icon: Calendar,
            color: "blue",
            change: "+2 from last month",
            trend: "up"
        },
        {
            title: "Attendance Rate",
            value: `${attendanceRate}%`,
            icon: TrendingUp,
            color: "green",
            change: "+5% improvement",
            trend: "up"
        },
        {
            title: "Average Attendance",
            value: `${averageAttendance}%`,
            icon: Users,
            color: "purple",
            change: "per session",
            trend: "neutral"
        },
        {
            title: "Next Session (Epko Field)",
            value: "Mar 8",
            icon: MapPin,
            color: "orange",
            change: "In 2 days",
            trend: "neutral"
        }
    ];

    return (
        <DashboardLayout role="player">
            <div className="space-y-8 pb-8">
                {/* Header with Actions */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Training & Attendance
                        </h1>
                        <p className="text-muted-foreground mt-2">Track your session participation and attendance records</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                    </div>
                </motion.div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const colorClasses = {
                            blue: {
                                border: "border-l-blue-500",
                                iconBg: "bg-blue-500",
                                gradient: "from-blue-500/20 to-blue-500/5"
                            },
                            green: {
                                border: "border-l-green-500",
                                iconBg: "bg-green-500",
                                gradient: "from-green-500/20 to-green-500/5"
                            },
                            purple: {
                                border: "border-l-purple-500",
                                iconBg: "bg-purple-500",
                                gradient: "from-purple-500/20 to-purple-500/5"
                            },
                            orange: {
                                border: "border-l-orange-500",
                                iconBg: "bg-orange-500",
                                gradient: "from-orange-500/20 to-orange-500/5"
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
                                    icon={<Icon className="w-6 h-6" />}
                                    iconColor={color.iconBg}
                                    className={`border-l-4 ${color.border} border border-border p-6 relative overflow-hidden bg-gradient-to-br ${color.gradient}`}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Weekly Attendance Bar Chart */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 stat-card hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-display font-semibold text-lg">Weekly Attendance Trend</h3>
                                <p className="text-sm text-muted-foreground mt-1">Last 6 weeks performance</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 text-sm">
                                    <div className="w-3 h-3 rounded-full bg-[hsl(145,60%,36%)]" />
                                    <span className="text-muted-foreground">Attendance %</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={attendanceChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                <XAxis
                                    dataKey="week"
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={[0, 100]}
                                    unit="%"
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                    formatter={(value) => [`${value}%`, 'Attendance']}
                                />
                                <Bar
                                    dataKey="attendance"
                                    fill="hsl(145, 60%, 36%)"
                                    radius={[6, 6, 0, 0]}
                                    animationDuration={1500}
                                >
                                    {attendanceChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={`hsl(145, ${60 + index * 5}%, ${36 + index * 2}%)`}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Attendance Distribution Pie Chart */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.4 }}
                        className="stat-card hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-display font-semibold text-lg">Session Distribution</h3>
                                <p className="text-sm text-muted-foreground mt-1">Attendance breakdown</p>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '0.75rem'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {pieData.map((item, index) => (
                                <div key={item.name} className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-xs text-muted-foreground">{item.name}</span>
                                    </div>
                                    <p className="font-semibold text-sm mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Full Attendance</p>
                            <p className="text-2xl font-bold">{attendedSessions}</p>
                        </div>
                    </div>
                    <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Partial</p>
                            <p className="text-2xl font-bold">{partialSessions}</p>
                        </div>
                    </div>
                    <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Missed</p>
                            <p className="text-2xl font-bold">{missedSessions}</p>
                        </div>
                    </div>
                    <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <CalendarDays className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">This Month</p>
                            <p className="text-2xl font-bold">8</p>
                        </div>
                    </div>
                </motion.div>

                {/* Sessions List with Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-display font-semibold text-lg">Recent Sessions</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Showing {filteredSessions.length} of {trainingSessions.length} sessions
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={selectedFilter === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedFilter("all")}
                                className="rounded-full"
                            >
                                All
                            </Button>
                            <Button
                                variant={selectedFilter === "full" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedFilter("full")}
                                className="rounded-full"
                            >
                                Full
                            </Button>
                            <Button
                                variant={selectedFilter === "partial" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedFilter("partial")}
                                className="rounded-full"
                            >
                                Partial
                            </Button>
                            <Button
                                variant={selectedFilter === "missed" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedFilter("missed")}
                                className="rounded-full"
                            >
                                Missed
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredSessions.map((session, index) => {
                            const attendancePercentage = Math.round((session.attendees / session.totalPlayers) * 100);
                            const isFull = attendancePercentage === 100;
                            const isPartial = attendancePercentage > 0 && attendancePercentage < 100;
                            const isMissed = attendancePercentage === 0;

                            return (
                                <motion.div
                                    key={session.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="group relative overflow-hidden stat-card hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            {/* Date Circle */}
                                            <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br flex flex-col items-center justify-center
                                                ${isFull ? 'from-green-500/20 to-green-500/5 border-green-500/30' :
                                                    isPartial ? 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30' :
                                                        'from-red-500/20 to-red-500/5 border-red-500/30'}
                                                border`}
                                            >
                                                <span className="text-xs font-bold text-muted-foreground">
                                                    {new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}
                                                </span>
                                                <span className="text-lg font-display font-bold leading-none">
                                                    {new Date(session.date).getDate()}
                                                </span>
                                            </div>

                                            {/* Session Info */}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-lg">{session.type}</p>
                                                    <Badge
                                                        variant="outline"
                                                        className={`
                                                            ${isFull ? 'border-green-500/30 text-green-500' :
                                                                isPartial ? 'border-yellow-500/30 text-yellow-500' :
                                                                    'border-red-500/30 text-red-500'}
                                                        `}
                                                    >
                                                        {attendancePercentage}% attendance
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {session.location}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        10:00 AM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Attendance Stats */}
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-muted-foreground" />
                                                    <span className="font-semibold">
                                                        {session.attendees}/{session.totalPlayers}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {session.totalPlayers - session.attendees} absent
                                                </p>
                                            </div>

                                            <div className="w-24">
                                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${attendancePercentage}%` }}
                                                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                                                        className={`h-full rounded-full
                                                            ${isFull ? 'bg-green-500' :
                                                                isPartial ? 'bg-yellow-500' :
                                                                    'bg-red-500'}
                                                        `}
                                                    />
                                                </div>
                                            </div>

                                            <Badge
                                                variant={isFull ? "default" : "secondary"}
                                                className={`
                                                    ${isFull ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        isPartial ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                            'bg-red-500/10 text-red-500 border-red-500/20'}
                                                `}
                                            >
                                                {isFull ? 'Complete' : isPartial ? 'Partial' : 'Missed'}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Progress indicator line */}
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-muted/30">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${attendancePercentage}%` }}
                                            transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                                            className={`h-full
                                                ${isFull ? 'bg-green-500' :
                                                    isPartial ? 'bg-yellow-500' :
                                                        'bg-red-500'}
                                            `}
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

export default Attendance;