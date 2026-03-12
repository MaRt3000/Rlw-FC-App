import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Users, BarChart3, Calendar, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import rlwfc from "@/assets/RLW FC.png";
import rlwlogo from "@/assets/rlw-logo.png";
import heroPitch from "@/assets/hero-pitch.jpg";

const features = [
  {
    icon: Users,
    title: "Player Registration",
    description: "Create your profile, track positions, fitness level, and injury status all in one place.",
  },
  {
    icon: Calendar,
    title: "Training Sessions",
    description: "Automated attendance tracking with arrival time recording and analytics.",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Rate and track your training performance with weekly charts and rankings.",
  },
  {
    icon: Trophy,
    title: "In-House Leagues",
    description: "Bi-monthly competitions with AI-balanced teams, fixtures, and league tables.",
  },
  {
    icon: Star,
    title: "Monthly Recognition",
    description: "Top 8 players and honorable mentions displayed on a live leaderboard.",
  },
  {
    icon: Shield,
    title: "Smart Team Balancing",
    description: "AI distributes players across teams based on position, performance, and attendance.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-pitch/95 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full  flex items-center justify-center">
              <img
                src={rlwlogo}
                alt="RLW FC logo under stadium lights at night"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-xl tracking-wider text-primary-foreground">
              RLW FC
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/20" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={rlwfc}
            alt="RLW FC logo under stadium lights at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-pitch/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-pitch/60 via-transparent to-pitch" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-left pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              RLW FC Football Community Platform
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6 text-primary-foreground">
              TRAIN.<br />
              <span className="text-gradient-gold">COMPETE.</span><br />
              DOMINATE.
            </h1>
            <p className="font-body text-lg md:text-xl max-w-xl  mb-10 text-primary-foreground/70">
              Manage training sessions, track performance, and organize balanced in-house competitions — all in one platform.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button variant="hero" size="lg" className="text-base px-10 py-6" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-10 py-6" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-20 flex justify-center gap-12 text-primary-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: "82+", label: "Players" },
              { value: "20+", label: "Matches" },
              { value: "4+", label: "Teams" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="font-body text-xs tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-3">
              Everything You Need
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              BUILT FOR THE PITCH
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-pitch relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroPitch}
            alt="RLW FC logo under stadium lights at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-pitch/80" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-accent rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
              READY TO <span className="text-gradient-gold">PLAY?</span>
            </h2>
            <p className="font-body text-lg text-primary-foreground/60 max-w-md mx-auto mb-10">
              Join RLW FC football community and take your game to the next level.
            </p>
            <Button variant="hero" size="lg" className="text-lg px-12 py-7" asChild>
              <Link to="/signup">Join RLW FC</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-pitch-light border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full  flex items-center justify-center">
                <img
                  src={rlwlogo}
                  alt="RLW FC logo under stadium lights at night"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-sm tracking-wider text-primary-foreground/60">
                RLW FC
              </span>
            </div>
            <p className="font-body text-sm text-primary-foreground/40">
              © 2026 RLW FC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
