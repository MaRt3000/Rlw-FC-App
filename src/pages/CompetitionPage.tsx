import { currentCompetition, matches, teams, getPlayerById, getTopScorers, matchStats, players } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import {
  Trophy, Star, Calendar, MapPin, Users, Activity,
  Target, Shield, Award, Medal, Crown, Flame,
  TrendingUp, Clock, ChevronRight, Sparkles,
  UserCheck, Zap, Footprints, Heart, Gauge,
  Filter, Download, Share2, Bell, Info
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CompetitionPage = () => {
  const [selectedMatchday, setSelectedMatchday] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState("fixtures");
  const [showStats, setShowStats] = useState<string | null>(null);

  const scorers = getTopScorers();

  // Calculate competition statistics
  const totalMatches = matches.length;
  const playedMatches = matches.filter(m => m.played).length;
  const remainingMatches = totalMatches - playedMatches;
  const totalGoals = matches.reduce((acc, m) => acc + (m.homeScore || 0) + (m.awayScore || 0), 0);
  const averageGoals = (totalGoals / playedMatches).toFixed(1);
  const totalMotm = matchStats.filter(ms => ms.manOfTheMatch).length;

  // Get unique matchdays
  const matchdays = [...new Set(matches.map(m => m.matchday))].sort((a, b) => a - b);

  // Filter matches by matchday
  const filteredMatches = useMemo(() => {
    if (selectedMatchday === "all") return matches;
    return matches.filter(m => m.matchday === parseInt(selectedMatchday));
  }, [selectedMatchday]);

  // Get team standings
  const standings = useMemo(() => {
    const teamStats = new Map();

    matches.forEach(match => {
      if (!match.played) return;

      const home = teamStats.get(match.homeTeamId) || { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
      const away = teamStats.get(match.awayTeamId) || { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };

      // Update home team
      home.played++;
      home.goalsFor += match.homeScore || 0;
      home.goalsAgainst += match.awayScore || 0;

      // Update away team
      away.played++;
      away.goalsFor += match.awayScore || 0;
      away.goalsAgainst += match.homeScore || 0;

      if (match.homeScore > match.awayScore) {
        home.won++;
        home.points += 3;
        away.lost++;
      } else if (match.homeScore < match.awayScore) {
        away.won++;
        away.points += 3;
        home.lost++;
      } else {
        home.drawn++;
        away.drawn++;
        home.points += 1;
        away.points += 1;
      }

      teamStats.set(match.homeTeamId, home);
      teamStats.set(match.awayTeamId, away);
    });

    return Array.from(teamStats.entries())
      .map(([teamId, stats]) => ({
        teamId,
        team: teams.find(t => t.id === teamId)!,
        ...stats
      }))
      .sort((a, b) => b.points - a.points);
  }, []);

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
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {currentCompetition.name}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {currentCompetition.startDate} — {currentCompetition.endDate}
                </span>
                <Badge variant="outline" className="bg-primary/5">
                  {currentCompetition.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Bell className="w-4 h-4" />
              Follow
            </Button>
          </div>
        </motion.div>

        {/* Competition Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {[
            { title: "Total Matches", value: totalMatches, icon: Calendar, color: "blue", change: `${playedMatches} played` },
            { title: "Matches Left", value: remainingMatches, icon: Clock, color: "green", change: `${((remainingMatches / totalMatches) * 100).toFixed(0)}% remaining` },
            { title: "Total Goals", value: totalGoals, icon: Target, color: "purple", change: `${averageGoals} per match` },
            { title: "Top Scorer", value: scorers[0]?.name.split(' ')[0] || "N/A", icon: Flame, color: "orange", change: `${scorers[0]?.goals || 0} goals` },
            { title: "MOTM Awards", value: totalMotm, icon: Star, color: "yellow", change: `${matchStats.length} matches` }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colors = {
              blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
              green: "from-green-500/20 to-green-500/5 border-green-500/20",
              purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
              orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
              yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20"
            };

            return (
              <motion.div
                key={stat.title}
                variants={fadeInUp}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors[stat.color as keyof typeof colors]} border p-4 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                      <Icon className={`w-4 h-4 text-${stat.color}-500`} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{stat.change}</span>
                  </div>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.title}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Tabs */}
        <Tabs defaultValue="fixtures" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="fixtures">Fixtures & Results</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>

          {/* Fixtures Tab */}
          <TabsContent value="fixtures" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex items-center gap-2">
                <Select value={selectedMatchday} onValueChange={setSelectedMatchday}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by matchday" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Matchdays</SelectItem>
                    {matchdays.map(md => (
                      <SelectItem key={md} value={md.toString()}>
                        Matchday {md}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  <Activity className="w-3 h-3 mr-1" />
                  {playedMatches} Played
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {remainingMatches} Remaining
                </Badge>
              </div>
            </div>

            {/* Matches Grid */}
            <div className="grid gap-4">
              {filteredMatches.map((match, index) => {
                const home = teams.find(t => t.id === match.homeTeamId)!;
                const away = teams.find(t => t.id === match.awayTeamId)!;
                const isLive = false; // This would come from real data

                return (
                  <motion.div
                    key={match.id}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    className="group relative overflow-hidden stat-card hover:shadow-xl transition-all duration-300"
                    onClick={() => setShowStats(showStats === match.id ? null : match.id)}
                  >
                    {/* Live Indicator */}
                    {isLive && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500 animate-pulse" />
                    )}

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            Matchday {match.matchday}
                          </Badge>
                          {isLive && (
                            <Badge className="bg-red-500/10 text-red-500 border-red-500/20 animate-pulse">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {match.date}
                          {match.time && (
                            <>
                              <Clock className="w-3 h-3 ml-2" />
                              {match.time}
                            </>
                          )}
                        </span>
                      </div>

                      {/* Match Details */}
                      <div className="flex items-center justify-between">
                        {/* Home Team */}
                        <div className="flex-1 flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-background">
                            <AvatarFallback className="bg-primary/10">
                              {home.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-display font-semibold">{home.name}</p>
                            {match.played && (
                              <p className="text-xs text-muted-foreground">
                                {match.homeStats?.possession || 0}% possession
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Score */}
                        <div className="px-6 py-2 rounded-xl bg-muted/50 font-display font-bold text-xl min-w-[100px] text-center">
                          {match.played ? (
                            <span className="flex items-center justify-center gap-1">
                              <span className={match.homeScore > match.awayScore ? "text-green-500" : ""}>
                                {match.homeScore}
                              </span>
                              <span className="text-muted-foreground">-</span>
                              <span className={match.awayScore > match.homeScore ? "text-green-500" : ""}>
                                {match.awayScore}
                              </span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground">vs</span>
                          )}
                        </div>

                        {/* Away Team */}
                        <div className="flex-1 flex items-center justify-end gap-3">
                          <div className="text-right">
                            <p className="font-display font-semibold">{away.name}</p>
                            {match.played && (
                              <p className="text-xs text-muted-foreground">
                                {match.awayStats?.possession || 0}% possession
                              </p>
                            )}
                          </div>
                          <Avatar className="w-10 h-10 border-2 border-background">
                            <AvatarFallback className="bg-primary/10">
                              {away.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{match.venue || "Main Stadium"}</span>
                      </div>

                      {/* Expand Indicator */}
                      <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                        <span>Click for match stats</span>
                        <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${showStats === match.id ? 'rotate-90' : ''}`} />
                      </div>
                    </div>

                    {/* Match Stats (Expandable) */}
                    <AnimatePresence>
                      {showStats === match.id && match.played && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="grid grid-cols-2 gap-4">
                              {/* Home Team Stats */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">{home.name}</h4>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Shots</span>
                                    <span className="font-medium">{match.homeStats?.shots || 0}</span>
                                  </div>
                                  <Progress value={((match.homeStats?.shots || 0) / 20) * 100} className="h-1.5" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Shots on Target</span>
                                    <span className="font-medium">{match.homeStats?.shotsOnTarget || 0}</span>
                                  </div>
                                  <Progress value={((match.homeStats?.shotsOnTarget || 0) / 10) * 100} className="h-1.5" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Passing Accuracy</span>
                                    <span className="font-medium">{match.homeStats?.passingAccuracy || 0}%</span>
                                  </div>
                                  <Progress value={match.homeStats?.passingAccuracy || 0} className="h-1.5" />
                                </div>
                              </div>

                              {/* Away Team Stats */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">{away.name}</h4>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Shots</span>
                                    <span className="font-medium">{match.awayStats?.shots || 0}</span>
                                  </div>
                                  <Progress value={((match.awayStats?.shots || 0) / 20) * 100} className="h-1.5" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Shots on Target</span>
                                    <span className="font-medium">{match.awayStats?.shotsOnTarget || 0}</span>
                                  </div>
                                  <Progress value={((match.awayStats?.shotsOnTarget || 0) / 10) * 100} className="h-1.5" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Passing Accuracy</span>
                                    <span className="font-medium">{match.awayStats?.passingAccuracy || 0}%</span>
                                  </div>
                                  <Progress value={match.awayStats?.passingAccuracy || 0} className="h-1.5" />
                                </div>
                              </div>
                            </div>

                            {/* Man of the Match */}
                            {matchStats.find(ms => ms.matchId === match.id && ms.manOfTheMatch) && (
                              <div className="mt-4 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm font-medium">Man of the Match</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  {(() => {
                                    const motm = matchStats.find(ms => ms.matchId === match.id && ms.manOfTheMatch);
                                    const player = motm ? getPlayerById(motm.playerId) : null;
                                    return player ? (
                                      <>
                                        <Avatar className="w-8 h-8">
                                          <AvatarImage src={player.photo} />
                                          <AvatarFallback>{player.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium text-sm">{player.fullName}</p>
                                          <p className="text-xs text-muted-foreground">{player.positionGroup}</p>
                                        </div>
                                      </>
                                    ) : null;
                                  })()}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Standings Tab */}
          <TabsContent value="standings">
            <div className="stat-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-4 font-display font-semibold">Pos</th>
                      <th className="text-left p-4 font-display font-semibold">Team</th>
                      <th className="text-center p-4 font-display font-semibold">P</th>
                      <th className="text-center p-4 font-display font-semibold">W</th>
                      <th className="text-center p-4 font-display font-semibold">D</th>
                      <th className="text-center p-4 font-display font-semibold">L</th>
                      <th className="text-center p-4 font-display font-semibold">GF</th>
                      <th className="text-center p-4 font-display font-semibold">GA</th>
                      <th className="text-center p-4 font-display font-semibold">GD</th>
                      <th className="text-center p-4 font-display font-semibold text-primary">Pts</th>
                      <th className="text-center p-4 font-display font-semibold">Form</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team, index) => {
                      const gd = team.goalsFor - team.goalsAgainst;
                      const form = [...Array(5)].map(() => Math.random() > 0.5 ? 'W' : Math.random() > 0.5 ? 'D' : 'L');

                      return (
                        <motion.tr
                          key={team.teamId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                              {index === 1 && <Medal className="w-4 h-4 text-gray-400" />}
                              {index === 2 && <Award className="w-4 h-4 text-amber-600" />}
                              <span className="font-display font-bold">{index + 1}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-primary/10">
                                  {team.team.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-display font-semibold">{team.team.name}</span>
                            </div>
                          </td>
                          <td className="text-center p-4 font-medium">{team.played}</td>
                          <td className="text-center p-4 font-medium text-green-600">{team.won}</td>
                          <td className="text-center p-4 font-medium text-yellow-600">{team.drawn}</td>
                          <td className="text-center p-4 font-medium text-red-600">{team.lost}</td>
                          <td className="text-center p-4 font-medium">{team.goalsFor}</td>
                          <td className="text-center p-4 font-medium">{team.goalsAgainst}</td>
                          <td className={`text-center p-4 font-medium ${gd > 0 ? 'text-green-600' : gd < 0 ? 'text-red-600' : ''
                            }`}>
                            {gd > 0 ? `+${gd}` : gd}
                          </td>
                          <td className="text-center p-4 font-display font-bold text-lg text-primary">
                            {team.points}
                          </td>
                          <td className="text-center p-4">
                            <div className="flex justify-center gap-1">
                              {form.map((result, idx) => (
                                <div
                                  key={idx}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                                                        ${result === 'W' ? 'bg-green-500/20 text-green-500' :
                                      result === 'D' ? 'bg-yellow-500/20 text-yellow-500' :
                                        'bg-red-500/20 text-red-500'}
                                                                    `}
                                >
                                  {result}
                                </div>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Scorers */}
              <Card className="bg-gradient-to-br from-yellow-500/5 to-transparent border-yellow-500/20">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Top Scorers
                  </h3>
                  <div className="space-y-3">
                    {scorers.map((s, i) => {
                      const player = getPlayerById(s.id);
                      return (
                        <motion.div
                          key={s.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="relative">
                            <span className="absolute -top-1 -left-1 w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center text-xs font-bold text-yellow-500">
                              {i + 1}
                            </span>
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={player?.photo} />
                              <AvatarFallback>{player?.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{player?.positionGroup}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-yellow-500">{s.goals}</div>
                            <div className="text-xs text-muted-foreground">{s.assists} assists</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Most Assists */}
              <Card className="bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Most Assists
                  </h3>
                  <div className="space-y-3">
                    {scorers.sort((a, b) => b.assists - a.assists).slice(0, 5).map((s, i) => {
                      const player = getPlayerById(s.id);
                      return (
                        <motion.div
                          key={s.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-500">
                            {i + 1}
                          </span>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={player?.photo} />
                            <AvatarFallback>{player?.fullName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{player?.positionGroup}</p>
                          </div>
                          <div className="text-lg font-bold text-blue-500">{s.assists}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Team Stats */}
              <Card className="md:col-span-2 bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    Team Statistics
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Best Attack</span>
                      </div>
                      <p className="text-xl font-bold">{standings[0]?.team.name}</p>
                      <p className="text-sm text-muted-foreground">{standings[0]?.goalsFor} goals</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Best Defense</span>
                      </div>
                      <p className="text-xl font-bold">
                        {standings.reduce((best, team) =>
                          team.goalsAgainst < best.goalsAgainst ? team : best
                        ).team.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {standings.reduce((best, team) =>
                          team.goalsAgainst < best.goalsAgainst ? team : best
                        ).goalsAgainst} conceded
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">Best Form</span>
                      </div>
                      <p className="text-xl font-bold">{standings[0]?.team.name}</p>
                      <p className="text-sm text-muted-foreground">{standings[0]?.points} points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Awards Tab */}
          <TabsContent value="awards">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Man of the Match Awards */}
              <div className="stat-card">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Man of the Match Awards
                </h3>
                <div className="space-y-3">
                  {matchStats.filter(ms => ms.manOfTheMatch).map((ms, index) => {
                    const player = getPlayerById(ms.playerId)!;
                    const match = matches.find(m => m.id === ms.matchId)!;
                    const home = teams.find(t => t.id === match.homeTeamId)!;
                    const away = teams.find(t => t.id === match.awayTeamId)!;

                    return (
                      <motion.div
                        key={ms.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="relative">
                          <Avatar className="w-12 h-12 border-2 border-yellow-500/50">
                            <AvatarImage src={player.photo} />
                            <AvatarFallback>{player.fullName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{player.fullName}</p>
                          <p className="text-xs text-muted-foreground">{player.positionGroup}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <Badge variant="outline" className="text-xs">
                              {home.name} vs {away.name}
                            </Badge>
                            <span className="text-muted-foreground">
                              Matchday {match.matchday}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{match.homeScore} - {match.awayScore}</div>
                          <div className="text-xs text-muted-foreground">{match.date}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Player Stats Leaderboard */}
              <div className="stat-card">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Player Stats Leaderboard
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Highest Rating</h4>
                    {players.sort((a, b) => b.rating - a.rating).slice(0, 3).map((p, i) => (
                      <div key={p.id} className="flex items-center gap-2 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                        <span className="w-5 text-xs font-bold text-muted-foreground">#{i + 1}</span>
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={p.photo} />
                          <AvatarFallback>{p.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="flex-1 text-sm">{p.fullName}</span>
                        <span className="font-bold text-primary">{p.rating}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Best Fitness</h4>
                    {players.filter(p => p.fitnessLevel === "Excellent").slice(0, 3).map((p, i) => (
                      <div key={p.id} className="flex items-center gap-2 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                        <span className="w-5 text-xs font-bold text-muted-foreground">#{i + 1}</span>
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={p.photo} />
                          <AvatarFallback>{p.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="flex-1 text-sm">{p.fullName}</span>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          <Heart className="w-3 h-3 mr-1" />
                          Excellent
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Competition Progress */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Competition Progress
              </h3>
              <Badge variant="outline" className="bg-primary/5">
                {((playedMatches / totalMatches) * 100).toFixed(0)}% Complete
              </Badge>
            </div>
            <Progress value={(playedMatches / totalMatches) * 100} className="h-3" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{playedMatches} Matches Played</span>
              <span>{remainingMatches} Matches Remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompetitionPage;