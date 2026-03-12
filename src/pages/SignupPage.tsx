import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const positions = [
  "Goalkeeper", "Centre-Back", "Right-Back", "Left-Back",
  "Defensive Midfielder", "Central Midfielder", "Attacking Midfielder",
  "Right Winger", "Left Winger", "Striker",
];

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-pitch flex items-center justify-center p-4 py-16">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
          </Link>
          <h1 className="text-3xl font-display font-bold text-primary-foreground">
            JOIN THE SQUAD
          </h1>
          <p className="font-body text-sm text-primary-foreground/50 mt-2">
            Create your player profile
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-elevated border border-border">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body text-sm">Full Name</Label>
                <Input placeholder="John Doe" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Phone</Label>
                <Input placeholder="+1 234 567 890" className="h-11" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-body text-sm">Email</Label>
              <Input type="email" placeholder="player@RLW FC.com" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label className="font-body text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body text-sm">Age Bracket</Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-22">18–22</SelectItem>
                    <SelectItem value="23-27">23–27</SelectItem>
                    <SelectItem value="28-32">28–32</SelectItem>
                    <SelectItem value="33+">33+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Preferred Foot</Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-body text-sm">Primary Position</Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos.toLowerCase().replace(/\s/g, "-")}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="heroPrimary" size="lg" className="w-full" type="submit">
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 font-body text-sm text-primary-foreground/50">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
