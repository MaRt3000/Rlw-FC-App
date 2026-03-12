export type AgeBracket = "18-22" | "23-27" | "28-32" | "33+";
export type Foot = "left" | "right";
export type Position = "GK" | "CB" | "LB" | "RB" | "CDM" | "CM" | "CAM" | "LW" | "RW" | "ST" | "CF";
export type PositionGroup = "Attackers" | "Midfielders" | "Defenders" | "Wingers";
export type FitnessLevel = "Excellent" | "Good" | "Average" | "Below Average";
export type InjuryStatus = "Fit" | "Minor Injury" | "Injured" | "Recovering";
export type UserRole = "admin" | "player";

export interface Player {
  id: string;
  fullName: string;
  photo: string;
  phone: string;
  ageBracket: AgeBracket;
  preferredFoot: Foot;
  positions: Position[];
  positionGroup: PositionGroup;
  fitnessLevel: FitnessLevel;
  injuryStatus: InjuryStatus;
  rating: number;
  attendanceRate: number;
  performanceAvg: number;
  punctualityScore: number;
  role?: UserRole;
}

export interface TrainingSession {
  id: string;
  date: string;
  location: string;
  type: string;
  attendees: number;
  totalPlayers: number;
}

export interface AttendanceRecord {
  id: string;
  playerId: string;
  sessionId: string;
  arrivalTime: string;
  confirmed: boolean;
}

export interface PerformanceRecord {
  id: string;
  playerId: string;
  sessionId: string;
  score: number;
  approved: boolean;
  date: string;
}

export interface MonthlyAward {
  id: string;
  month: string;
  year: number;
  top8: string[];
  honorableMentions: string[];
}

export interface Competition {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed";
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  captainId: string;
  playerIds: string[];
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Match {
  id: string;
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  played: boolean;
  matchday: number;
}

export interface MatchStat {
  id: string;
  matchId: string;
  playerId: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  manOfTheMatch: boolean;
}
