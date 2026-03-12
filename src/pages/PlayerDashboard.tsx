import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { PlayerCard } from "@/components/PlayerCard";
import { RatingBadge } from "@/components/RatingBadge";
import { players, attendanceChartData, performanceChartData, currentCompetition } from "@/lib/dummy-data";
import { Users, Calendar, TrendingUp, Award, Activity, Target, Zap, Shield } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const currentPlayer = players[0];
const topPlayers = [...players].sort((a, b) => b.rating - a.rating).slice(0, 5);

const PlayerDashboard = () => {
  return (
    <DashboardLayout role="player">
      <div className="space-y-8">
        {/* Welcome Section with Gradient Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/10"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-32 translate-x-32" />
          <div className="relative">
            <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome back, {currentPlayer.fullName}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Here's your training overview?</p>
          </div>
        </motion.div>

        {/* Stats Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StatCard
              title="Current Rating"
              value={currentPlayer.rating}
              icon={<Award className="w-6 h-6" />}
              trend={{ value: 12, label: "vs last month", positive: true }}
              className="border-l-4 border-l-yellow-500 border border-border p-6"
              iconColor="bg-yellow-500 "
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <StatCard
              title="Attendance Rate"
              value={`${currentPlayer.attendanceRate}%`}
              icon={<Calendar className="w-6 h-6" />}
              trend={{ value: 5, label: "vs last month", positive: true }}
              className="border-l-4 border-l-green-500 border border-border p-6"
              iconColor="bg-green-500"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <StatCard
              title="Performance Avg (Lower is better)"
              value={currentPlayer.performanceAvg.toFixed(1)}
              icon={<TrendingUp className="w-6 h-6" />}
              trend={{ value: 0.3, label: "improvement", positive: true }}
              className="border-l-4 border-l-blue-500 border border-border p-6"
              iconColor="bg-blue-500"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <StatCard
              title="Total Players"
              value={players.length}
              icon={<Users className="w-6 h-6" />}
              subtitle="In your squad"
              className="border-l-4 border-l-purple-500 border border-border p-6"
              iconColor="bg-purple-500"
            />
          </motion.div>
        </div>

        {/* Charts Section with Improved Design */}
        <div className=" space-y-20 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="stat-card hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-lg">Attendance Trend</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-[hsl(145,60%,36%)]" />
                <span>Last 6 weeks</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={attendanceChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145, 60%, 36%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(145, 60%, 36%)" stopOpacity={0} />
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
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[60, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="hsl(145, 60%, 36%)"
                  fill="url(#gradAttendance)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(145, 60%, 36%)', strokeWidth: 2 }}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-lg">Performance History</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-[hsl(45,95%,55%)]" />
                <span>Lower = Better</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={performanceChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0} />
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
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[1, 5]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(45, 95%, 55%)"
                  fill="url(#gradPerf)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(45, 95%, 55%)', strokeWidth: 2 }}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Profile + Top Players Grid */}
        <div className="space-y-10">
          {/* Profile Card - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="stat-card lg:col-span-1 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 rounded-full blur-md" />
              <img
                src={currentPlayer.photo}
                alt={currentPlayer.fullName}
                className="w-24 h-24 rounded-full mx-auto bg-muted border-4 border-background shadow-xl relative"
              />
            </div>

            <h3 className="font-display font-bold text-2xl mt-4">{currentPlayer.fullName}</h3>
            <p className="text-sm text-muted-foreground">
              {currentPlayer.positionGroup} • {currentPlayer.positions.join(' • ')}
            </p>

            <div className="flex justify-center mt-4">
              <RatingBadge rating={currentPlayer.rating} size="lg" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-5">
                <div className="text-muted-foreground text-xs mb-1">Foot</div>
                <div className="font-semibold capitalize flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  {currentPlayer.preferredFoot}
                </div>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-5">
                <div className="text-muted-foreground text-xs mb-1">Fitness</div>
                <div className="font-semibold flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  {currentPlayer.fitnessLevel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-5">
                <div className="text-muted-foreground text-xs mb-1">Age</div>
                <div className="font-semibold">{currentPlayer.ageBracket}</div>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-5">
                <div className="text-muted-foreground text-xs mb-1">Status</div>
                <div className={`font-semibold ${currentPlayer.injuryStatus === 'Fit' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {currentPlayer.injuryStatus}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Sessions</p>
                  <p className="font-semibold text-lg">24</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Goals</p>
                  <p className="font-semibold text-lg">8</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Assists</p>
                  <p className="font-semibold text-lg">12</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Players - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="stat-card lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-semibold text-lg">Top Rated Players</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Target className="w-4 h-4" />
                <span>This month</span>
              </div>
            </div>
            <div className="space-y-4">
              {topPlayers.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <PlayerCard
                    player={p}
                    rank={i + 1}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Active Competition - Enhanced */}
        {currentCompetition && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="stat-card bg-gradient-to-br from-primary/5 to-transparent border-primary/10 p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4 ">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">Active Competition</h3>
              </div>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                {currentCompetition.status}
              </span>
            </div>
            <p className="text-2xl font-display font-bold">{currentCompetition.name}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{currentCompetition.startDate} — {currentCompetition.endDate}</span>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PlayerDashboard;