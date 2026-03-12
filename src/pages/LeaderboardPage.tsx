import { players, monthlyAwards, getPlayerById } from "@/lib/dummy-data";
import { RatingBadge } from "@/components/RatingBadge";
import { Trophy, Medal, Award, Crown, Star, TrendingUp, Users, Calendar, Target, ChevronUp, Sparkles, Flame } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState("monthly");

  const top8Players = monthlyAwards.top8.map(id => getPlayerById(id)!).filter(Boolean);
  const honorable = monthlyAwards.honorableMentions.map(id => getPlayerById(id)!).filter(Boolean);

  // Calculate leaderboard stats
  const totalParticipants = players.length;
  const averageRating = (players.reduce((acc, p) => acc + p.rating, 0) / players.length).toFixed(1);
  const topRating = top8Players[0]?.rating || 0;

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
              Monthly Leaderboard
            </h1>
            <p className="text-muted-foreground mt-2">
              {monthlyAwards.month} {monthlyAwards.year} — Top Performers of the Month
            </p>
          </div>

          {/* Timeframe Selector */}
          {/* <div className="flex gap-2">

            <Button
              variant={timeframe === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("monthly")}
              className="rounded-full"
            >
              Monthly
            </Button>
            <Button
              variant={timeframe === "seasonal" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("seasonal")}
              className="rounded-full"
            >
              Seasonal
            </Button>
          </div> */}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            { title: "Total Participants", value: totalParticipants, icon: Users, color: "blue", change: "+12 this month" },
            { title: "Average Rating", value: averageRating, icon: Star, color: "yellow", change: "Top performance" },
            { title: "Top Rating", value: topRating, icon: Crown, color: "purple", change: `Held by ${top8Players[0]?.fullName.split(' ')[0]}` },
            { title: "This Month", value: "March 2024", icon: Calendar, color: "green", change: "Week 4 of 4" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "border-l-blue-500 bg-blue-500",
              yellow: "border-l-yellow-500 bg-yellow-500",
              purple: "border-l-purple-500 bg-purple-500",
              green: "border-l-green-500 bg-green-500"
            };

            return (
              <motion.div
                key={stat.title}
                variants={fadeInUp}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                      <Icon className={`w-5 h-5 text-${stat.color}-500`} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.title}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Podium Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl -z-10" />

          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto items-end pt-8 pb-12 px-4">
            {[1, 0, 2].map((idx, col) => {
              const p = top8Players[idx];
              if (!p) return null;
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;

              const podiumHeights = {
                0: "h-40",
                1: "h-32",
                2: "h-24"
              };

              return (
                <motion.div
                  key={p.id}
                  variants={fadeInUp}
                  className="relative group"
                >
                  {/* Podium Position */}
                  <div className={`relative ${isFirst ? 'md:mb-0' : 'md:mb-0'}`}>
                    {/* Card */}
                    <div className={`
                      relative rounded-2xl bg-gradient-to-b from-card to-card/90 border-2 shadow-xl
                      ${isFirst ? 'border-yellow-500/50 shadow-yellow-500/10' :
                        isSecond ? 'border-gray-400/50 shadow-gray-400/10' :
                          'border-amber-600/50 shadow-amber-600/10'}
                    `}>
                      {/* Crown for 1st place */}
                      {isFirst && (
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2"
                        >
                          <Crown className="w-8 h-8 text-yellow-500 drop-shadow-lg" />
                        </motion.div>
                      )}

                      {/* Medal Icon */}
                      <div className={`
                        absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center
                        ${isFirst ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                          isSecond ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                            'bg-gradient-to-r from-amber-600 to-amber-700'}
                      `}>
                        {isFirst ? <Trophy className="w-4 h-4 text-white" /> :
                          isSecond ? <Medal className="w-4 h-4 text-white" /> :
                            <Award className="w-3 h-3 text-white" />}
                      </div>

                      {/* Content */}
                      <div className={`p-6 text-center ${isFirst ? 'pt-8' : 'pt-6'}`}>
                        {/* Profile Image */}
                        <div className="relative inline-block mb-4">
                          <div className={`
                            absolute inset-0 rounded-full blur-xl opacity-50
                            ${isFirst ? 'bg-yellow-500' : isSecond ? 'bg-gray-400' : 'bg-amber-600'}
                          `} />
                          <img
                            src={p.photo}
                            alt={p.fullName}
                            className={`
                              relative rounded-full border-4 border-background shadow-xl
                              ${isFirst ? 'w-24 h-24' : isSecond ? 'w-20 h-20' : 'w-16 h-16'}
                            `}
                          />
                          {isFirst && (
                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                              <Flame className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Name */}
                        <p className={`font-display font-bold ${isFirst ? 'text-xl' : 'text-lg'}`}>
                          {p.fullName}
                        </p>

                        {/* Position & Team */}
                        <p className="text-sm text-muted-foreground mt-1">
                          {p.positionGroup} • {p.positions[0]}
                        </p>

                        {/* Rating */}
                        <div className="flex justify-center mt-4">
                          <RatingBadge rating={p.rating} size={isFirst ? "lg" : "md"} />
                        </div>

                        {/* Stats Row */}
                        <div className="flex justify-center gap-3 mt-4 text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-muted-foreground" />
                            <span className="font-medium">{p.performanceAvg.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span className="font-medium">{p.attendanceRate}%</span>
                          </div>
                        </div>

                        {/* Rank Badge */}
                        <div className={`
                          mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                          ${isFirst ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                            isSecond ? 'bg-gray-400/10 text-gray-400 border border-gray-400/20' :
                              'bg-amber-600/10 text-amber-600 border border-amber-600/20'}
                        `}>
                          <Crown className="w-3 h-3" />
                          #{idx + 1} Place
                        </div>
                      </div>
                    </div>

                    {/* Podium Base */}
                    <div className={`
                      absolute -bottom-6 left-0 right-0 rounded-b-lg
                      ${isFirst ? 'h-12 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10' :
                        isSecond ? 'h-8 bg-gradient-to-r from-gray-400/20 to-gray-400/10' :
                          'h-6 bg-gradient-to-r from-amber-600/20 to-amber-600/10'}
                    `} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Top 8 Section */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Top 8 Rankings</h3>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              Elite Players
            </Badge>
          </div>

          <div className="space-y-3">
            {top8Players.slice(3).map((p, i) => {
              const rank = i + 4;
              const rankColors = {
                4: "text-blue-500",
                5: "text-green-500",
                6: "text-purple-500",
                7: "text-orange-500",
                8: "text-pink-500"
              };

              return (
                <motion.div
                  key={p.id}
                  variants={fadeInUp}
                  className="group relative overflow-hidden stat-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-4">
                    {/* Rank with Medal */}
                    <div className="relative">
                      <span className={`font-display font-bold text-xl w-10 text-center block ${rankColors[rank as keyof typeof rankColors] || 'text-muted-foreground'
                        }`}>
                        #{rank}
                      </span>
                    </div>

                    {/* Player Image */}
                    <div className="relative">
                      <img
                        src={p.photo}
                        alt={p.fullName}
                        className="w-12 h-12 rounded-full bg-muted border-2 border-background shadow-lg"
                      />
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{p.fullName}</p>
                        <Badge variant="outline" className="text-xs border-primary/20">
                          {p.positionGroup}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{p.positions.join(' • ')}</span>
                        <span>•</span>
                        <span>{p.preferredFoot} foot</span>
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{p.performanceAvg.toFixed(1)} avg</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{p.attendanceRate}% attendance</p>
                      </div>

                      <RatingBadge rating={p.rating} />

                      <div className="flex items-center gap-1 text-green-500">
                        <ChevronUp className="w-4 h-4" />
                        <span className="text-xs font-medium">+2</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-muted/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.rating / 10) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                      className={`h-full ${rank === 4 ? 'bg-blue-500' :
                        rank === 5 ? 'bg-green-500' :
                          rank === 6 ? 'bg-purple-500' :
                            rank === 7 ? 'bg-orange-500' :
                              'bg-pink-500'
                        }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Honorable Mentions */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <h3 className="font-display font-semibold text-lg">Honorable Mentions</h3>
            </div>
            <Badge variant="outline" className="border-yellow-500/20 text-yellow-500">
              <Sparkles className="w-3 h-3 mr-1" />
              Rising Stars
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {honorable.map((p, index) => (
              <motion.div
                key={p.id}
                variants={fadeInUp}
                className="group relative overflow-hidden stat-card hover:shadow-lg transition-all duration-300 border border-yellow-500/10"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-2xl" />

                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src={p.photo}
                      alt={p.fullName}
                      className="w-14 h-14 rounded-full bg-muted border-2 border-background shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-background" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{p.fullName}</p>
                      <Badge variant="outline" className="text-xs border-yellow-500/20 text-yellow-500">
                        HM
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {p.positionGroup} • {p.positions[0]}
                    </p>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-muted-foreground" />
                        <span>{p.performanceAvg.toFixed(1)} avg</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span>{p.attendanceRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <RatingBadge rating={p.rating} size="sm" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={fadeInUp}
          className="text-center text-sm text-muted-foreground pt-4 border-t border-border"
        >
          <p>Leaderboard updates monthly based on performance ratings and attendance records.</p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;