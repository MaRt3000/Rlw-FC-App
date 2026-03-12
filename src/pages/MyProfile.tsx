import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import {
    Mail, Phone, Calendar, Trophy, Target, TrendingUp,
    Award, Star, Shield, MapPin, Edit2, Camera,
    Medal, Crown, Activity, Users, UserCheck
} from "lucide-react";

const MyProfile = () => {
    // Enhanced mock user data with more professional gaming profile
    const userData = {
        name: "John Doe",
        username: "@johndoe_pro",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "Los Angeles, CA",
        position: "Professional Player",
        role: "Team Captain",
        team: "Elite Gaming Squad",
        joinDate: "January 2023",
        gamesPlayed: 156,
        winRate: "78%",
        ranking: "#42",
        globalRank: "#128",
        totalHours: "1,247",
        bio: "Passionate gamer with 5+ years of competitive experience. Specializing in strategy games and team coordination. Former regional champion and dedicated team player focused on continuous improvement and helping teammates reach their full potential.",
        achievements: [
            { name: "Regional Championship Winner 2023", icon: Trophy, color: "text-yellow-500", type: "gold" },
            { name: "Top 50 Player Ranking", icon: Crown, color: "text-purple-500", type: "silver" },
            { name: "Team Captain Award", icon: Medal, color: "text-blue-500", type: "bronze" },
            { name: "100 Games Milestone", icon: Star, color: "text-green-500", type: "milestone" },
            { name: "Perfect Season Record", icon: Award, color: "text-orange-500", type: "special" }
        ],
        recentMatches: [
            { opponent: "Phoenix Squad", result: "Win", score: "3-1", date: "2 days ago" },
            { opponent: "Thunder Gaming", result: "Loss", score: "1-3", date: "5 days ago" },
            { opponent: "Elite Warriors", result: "Win", score: "3-2", date: "1 week ago" }
        ],
        skills: [
            { name: "Team Coordination", level: 92, color: "blue" },
            { name: "Strategic Planning", level: 88, color: "green" },
            { name: "Mechanical Skill", level: 85, color: "purple" },
            { name: "Communication", level: 95, color: "orange" },
            { name: "Leadership", level: 90, color: "red" }
        ]
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const stats = [
        { label: "Games Played", value: userData.gamesPlayed, icon: Activity, color: "blue", change: "+12 this month" },
        { label: "Win Rate", value: userData.winRate, icon: Target, color: "green", change: "+5% improvement" },
        { label: "Global Rank", value: userData.globalRank, icon: TrendingUp, color: "purple", change: "Top 1%" },
        { label: "Total Hours", value: userData.totalHours, icon: Users, color: "orange", change: "This season" }
    ];

    return (
        <DashboardLayout role="player">
            <div className="space-y-8 pb-8">
                {/* Header with Gradient */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center"
                >
                    <div>
                        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            My Profile
                        </h1>
                        <p className="text-muted-foreground mt-2">Manage your personal information and gaming stats</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                    </motion.button>
                </motion.div>

                {/* Profile Header Card */}
                <motion.div
                    {...fadeInUp}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-xl"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

                    <div className="relative p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            {/* Profile Image with Edit Overlay */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-background shadow-xl">
                                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                        {userData.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                    <button className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                                    <h2 className="text-3xl font-bold">{userData.name}</h2>
                                    <span className="text-muted-foreground font-mono">{userData.username}</span>
                                </div>

                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center gap-1.5 text-sm bg-primary/5 px-3 py-1.5 rounded-full">
                                        <Shield className="w-4 h-4 text-primary" />
                                        <span className="font-medium">{userData.role}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm bg-muted px-3 py-1.5 rounded-full">
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                        <span>{userData.team}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm bg-muted px-3 py-1.5 rounded-full">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                        <span>{userData.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm bg-muted px-3 py-1.5 rounded-full">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <span>Joined {userData.joinDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="flex gap-6 p-4 bg-muted/30 rounded-xl border border-border/50">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">156</div>
                                    <div className="text-xs text-muted-foreground">Matches</div>
                                </div>
                                <div className="w-px bg-border" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-500">78%</div>
                                    <div className="text-xs text-muted-foreground">Win Rate</div>
                                </div>
                                <div className="w-px bg-border" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-500">#42</div>
                                    <div className="text-xs text-muted-foreground">Rank</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const colors = {
                            blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
                            green: "from-green-500/20 to-green-500/5 border-green-500/20",
                            purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
                            orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20"
                        };

                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors[stat.color as keyof typeof colors]} p-6 border`}
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
                                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Contact & Bio */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="rounded-xl bg-card border border-border/50 p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="font-medium">{userData.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                        <p className="font-medium">{userData.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-xl bg-card border border-border/50 p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                About Me
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">{userData.bio}</p>
                        </motion.div>

                        {/* Skills */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="rounded-xl bg-card border border-border/50 p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                Skills & Expertise
                            </h3>
                            <div className="space-y-4">
                                {userData.skills.map((skill, index) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{skill.name}</span>
                                            <span className="text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                                                className={`h-full rounded-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-400`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Achievements & Recent Matches (spans 2 columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Achievements */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="rounded-xl bg-card border border-border/50 p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                Achievements & Awards
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {userData.achievements.map((achievement, index) => {
                                    const Icon = achievement.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                                        >
                                            <div className={`p-2 rounded-lg bg-${achievement.color.split('-')[1]}-500/10 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className={`w-5 h-5 ${achievement.color}`} />
                                            </div>
                                            <span className="font-medium text-sm">{achievement.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Recent Matches */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-xl bg-card border border-border/50 p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                Recent Matches
                            </h3>
                            <div className="space-y-3">
                                {userData.recentMatches.map((match, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${match.result === 'Win' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <div>
                                                <p className="font-medium">vs {match.opponent}</p>
                                                <p className="text-xs text-muted-foreground">{match.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${match.result === 'Win'
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                }`}>
                                                {match.result}
                                            </span>
                                            <span className="font-mono text-sm">{match.score}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyProfile;