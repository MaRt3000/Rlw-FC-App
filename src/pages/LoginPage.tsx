import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-pitch flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
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
            WELCOME BACK
          </h1>
          <p className="font-body text-sm text-primary-foreground/50 mt-2">
            Sign in to your RLW FC account
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-elevated border border-border">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-sm text-card-foreground">Email</Label>
              <Input id="email" type="email" placeholder="player@RLW FC.com" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-sm text-card-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
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

            <Button variant="heroPrimary" size="lg" className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 font-body text-sm text-primary-foreground/50">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent hover:underline">
            Join RLW FC
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
