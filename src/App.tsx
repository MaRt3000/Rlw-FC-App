import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PlayerDashboard from "./pages/PlayerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LeaderboardPage from "./pages/LeaderboardPage";
import CompetitionPage from "./pages/CompetitionPage";
import NotFound from "./pages/NotFound";
import Attendance from "./pages/Attendance";
import Performance from "./pages/Performance";
import MyProfile from "./pages/MyProfile";
import League from "./pages/League";
import Teams from "./pages/Teams";

// Admin Pages
import AdminPlayersPage from "./pages/admin/AdminPlayersPage";
import AdminSessionsPage from "./pages/admin/AdminSessionsPage";
import AdminAttendancePage from "./pages/admin/AdminAttendancePage";
import AdminPerformancePage from "./pages/admin/AdminPerformancePage";
import AdminTeamsPage from "./pages/admin/AdminTeamsPage";
import AdminCompetitionPage from "./pages/admin/AdminCompetitionPage";
import AdminLeaderboardPage from "./pages/admin/AdminLeaderboardPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<PlayerDashboard />} />
          <Route path="/dashboard/leaderboard" element={<LeaderboardPage />} />
          <Route path="/dashboard/competition" element={<CompetitionPage />} />
          <Route path="/dashboard/attendance" element={<Attendance />} />
          <Route path="/dashboard/performance" element={<Performance />} />
          <Route path="/dashboard/profile" element={<MyProfile />} />
          <Route path="/dashboard/league-table" element={<League />} />
          <Route path="/dashboard/teams" element={<Teams />} />


          {/* Admin pages */}

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/players" element={<AdminPlayersPage />} />
          <Route path="/admin/sessions" element={<AdminSessionsPage />} />
          <Route path="/admin/attendance" element={<AdminAttendancePage />} />
          <Route path="/admin/performance" element={<AdminPerformancePage />} />
          <Route path="/admin/teams" element={<AdminTeamsPage />} />
          <Route path="/admin/competition" element={<AdminCompetitionPage />} />
          <Route path="/admin/leaderboard" element={<AdminLeaderboardPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
