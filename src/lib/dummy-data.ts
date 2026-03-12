import { Player, TrainingSession, PerformanceRecord, Competition, Team, Match, MatchStat, MonthlyAward } from "./types";

const avatarUrl = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

export const players: Player[] = [
  { id: "p1", fullName: "Marcus Johnson", photo: avatarUrl("marcus"), phone: "+1234567890", ageBracket: "23-27", preferredFoot: "right", positions: ["ST", "CF", "RW"], positionGroup: "Attackers", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 91, attendanceRate: 96, performanceAvg: 2.1, punctualityScore: 95 },
  { id: "p2", fullName: "James Okafor", photo: avatarUrl("james"), phone: "+1234567891", ageBracket: "28-32", preferredFoot: "right", positions: ["CM", "CAM", "CDM"], positionGroup: "Midfielders", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 88, attendanceRate: 92, performanceAvg: 2.5, punctualityScore: 90 },
  { id: "p3", fullName: "David Chen", photo: avatarUrl("david"), phone: "+1234567892", ageBracket: "23-27", preferredFoot: "left", positions: ["LW", "ST", "CAM"], positionGroup: "Wingers", fitnessLevel: "Good", injuryStatus: "Fit", rating: 85, attendanceRate: 88, performanceAvg: 3.0, punctualityScore: 88 },
  { id: "p4", fullName: "Emmanuel Adeyemi", photo: avatarUrl("emmanuel"), phone: "+1234567893", ageBracket: "28-32", preferredFoot: "right", positions: ["CB", "CDM", "RB"], positionGroup: "Defenders", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 87, attendanceRate: 94, performanceAvg: 2.3, punctualityScore: 92 },
  { id: "p5", fullName: "Liam Brooks", photo: avatarUrl("liam"), phone: "+1234567894", ageBracket: "18-22", preferredFoot: "right", positions: ["RW", "ST", "CF"], positionGroup: "Wingers", fitnessLevel: "Good", injuryStatus: "Fit", rating: 82, attendanceRate: 85, performanceAvg: 3.2, punctualityScore: 85 },
  { id: "p6", fullName: "Kwame Mensah", photo: avatarUrl("kwame"), phone: "+1234567895", ageBracket: "23-27", preferredFoot: "left", positions: ["LB", "CB", "LW"], positionGroup: "Defenders", fitnessLevel: "Good", injuryStatus: "Minor Injury", rating: 80, attendanceRate: 82, performanceAvg: 3.5, punctualityScore: 80 },
  { id: "p7", fullName: "Tomás Silva", photo: avatarUrl("tomas"), phone: "+1234567896", ageBracket: "33+", preferredFoot: "right", positions: ["CAM", "CM", "ST"], positionGroup: "Midfielders", fitnessLevel: "Average", injuryStatus: "Fit", rating: 84, attendanceRate: 90, performanceAvg: 2.8, punctualityScore: 88 },
  { id: "p8", fullName: "Ryan Miller", photo: avatarUrl("ryan"), phone: "+1234567897", ageBracket: "23-27", preferredFoot: "right", positions: ["CB", "RB", "CDM"], positionGroup: "Defenders", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 86, attendanceRate: 93, performanceAvg: 2.4, punctualityScore: 91 },
  { id: "p9", fullName: "Ahmed Hassan", photo: avatarUrl("ahmed"), phone: "+1234567898", ageBracket: "28-32", preferredFoot: "right", positions: ["ST", "CF", "CAM"], positionGroup: "Attackers", fitnessLevel: "Good", injuryStatus: "Fit", rating: 83, attendanceRate: 87, performanceAvg: 3.1, punctualityScore: 84 },
  { id: "p10", fullName: "Carlos Reyes", photo: avatarUrl("carlos"), phone: "+1234567899", ageBracket: "23-27", preferredFoot: "left", positions: ["LW", "LB", "CM"], positionGroup: "Wingers", fitnessLevel: "Good", injuryStatus: "Fit", rating: 79, attendanceRate: 80, performanceAvg: 3.6, punctualityScore: 78 },
  { id: "p11", fullName: "Isaac Banda", photo: avatarUrl("isaac"), phone: "+1234567800", ageBracket: "18-22", preferredFoot: "right", positions: ["CM", "CDM", "CB"], positionGroup: "Midfielders", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 78, attendanceRate: 86, performanceAvg: 3.3, punctualityScore: 82 },
  { id: "p12", fullName: "Noah Williams", photo: avatarUrl("noah"), phone: "+1234567801", ageBracket: "23-27", preferredFoot: "right", positions: ["RB", "RW", "CM"], positionGroup: "Defenders", fitnessLevel: "Good", injuryStatus: "Recovering", rating: 77, attendanceRate: 78, performanceAvg: 3.8, punctualityScore: 75 },
  { id: "p13", fullName: "Yusuf Abiola", photo: avatarUrl("yusuf"), phone: "+1234567802", ageBracket: "28-32", preferredFoot: "right", positions: ["ST", "RW", "CF"], positionGroup: "Attackers", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 89, attendanceRate: 95, performanceAvg: 2.0, punctualityScore: 93 },
  { id: "p14", fullName: "Daniel Park", photo: avatarUrl("daniel"), phone: "+1234567803", ageBracket: "23-27", preferredFoot: "left", positions: ["CAM", "LW", "CM"], positionGroup: "Midfielders", fitnessLevel: "Good", injuryStatus: "Fit", rating: 81, attendanceRate: 84, performanceAvg: 3.4, punctualityScore: 81 },
  { id: "p15", fullName: "Samuel Eze", photo: avatarUrl("samuel"), phone: "+1234567804", ageBracket: "33+", preferredFoot: "right", positions: ["CB", "CDM", "CM"], positionGroup: "Defenders", fitnessLevel: "Average", injuryStatus: "Fit", rating: 76, attendanceRate: 76, performanceAvg: 4.0, punctualityScore: 74 },
  { id: "p16", fullName: "Ethan Moore", photo: avatarUrl("ethan"), phone: "+1234567805", ageBracket: "18-22", preferredFoot: "right", positions: ["RW", "ST", "CAM"], positionGroup: "Wingers", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 80, attendanceRate: 83, performanceAvg: 3.2, punctualityScore: 83 },
  { id: "p17", fullName: "Chidi Nwosu", photo: avatarUrl("chidi"), phone: "+1234567806", ageBracket: "23-27", preferredFoot: "right", positions: ["CM", "CAM", "RW"], positionGroup: "Midfielders", fitnessLevel: "Good", injuryStatus: "Fit", rating: 82, attendanceRate: 89, performanceAvg: 2.9, punctualityScore: 87 },
  { id: "p18", fullName: "Jake Thompson", photo: avatarUrl("jake"), phone: "+1234567807", ageBracket: "28-32", preferredFoot: "left", positions: ["LW", "LB", "CAM"], positionGroup: "Wingers", fitnessLevel: "Good", injuryStatus: "Minor Injury", rating: 78, attendanceRate: 81, performanceAvg: 3.5, punctualityScore: 79 },
  { id: "p19", fullName: "Kofi Asante", photo: avatarUrl("kofi"), phone: "+1234567808", ageBracket: "23-27", preferredFoot: "right", positions: ["ST", "CF", "RW"], positionGroup: "Attackers", fitnessLevel: "Excellent", injuryStatus: "Fit", rating: 84, attendanceRate: 91, performanceAvg: 2.6, punctualityScore: 89 },
  { id: "p20", fullName: "Oliver Grant", photo: avatarUrl("oliver"), phone: "+1234567809", ageBracket: "33+", preferredFoot: "right", positions: ["CDM", "CB", "CM"], positionGroup: "Defenders", fitnessLevel: "Average", injuryStatus: "Fit", rating: 75, attendanceRate: 75, performanceAvg: 4.2, punctualityScore: 72 },
];

export const trainingSessions: TrainingSession[] = [
  { id: "ts1", date: "2026-03-01", location: "Central Park Pitch", type: "Tactical", attendees: 18, totalPlayers: 20 },
  { id: "ts2", date: "2026-02-27", location: "City Stadium", type: "Fitness", attendees: 16, totalPlayers: 20 },
  { id: "ts3", date: "2026-02-24", location: "Central Park Pitch", type: "Skills", attendees: 19, totalPlayers: 20 },
  { id: "ts4", date: "2026-02-20", location: "City Stadium", type: "Match Simulation", attendees: 20, totalPlayers: 20 },
  { id: "ts5", date: "2026-02-17", location: "Central Park Pitch", type: "Tactical", attendees: 17, totalPlayers: 20 },
  { id: "ts6", date: "2026-02-13", location: "City Stadium", type: "Fitness", attendees: 15, totalPlayers: 20 },
  { id: "ts7", date: "2026-02-10", location: "Central Park Pitch", type: "Skills", attendees: 18, totalPlayers: 20 },
  { id: "ts8", date: "2026-02-06", location: "City Stadium", type: "Tactical", attendees: 19, totalPlayers: 20 },
];

export const performanceHistory: PerformanceRecord[] = [
  { id: "pr1", playerId: "p1", sessionId: "ts1", score: 2, approved: true, date: "2026-03-01" },
  { id: "pr2", playerId: "p1", sessionId: "ts2", score: 1, approved: true, date: "2026-02-27" },
  { id: "pr3", playerId: "p1", sessionId: "ts3", score: 3, approved: true, date: "2026-02-24" },
  { id: "pr4", playerId: "p1", sessionId: "ts4", score: 2, approved: true, date: "2026-02-20" },
  { id: "pr5", playerId: "p1", sessionId: "ts5", score: 2, approved: true, date: "2026-02-17" },
  { id: "pr6", playerId: "p1", sessionId: "ts6", score: 3, approved: true, date: "2026-02-13" },
  { id: "pr7", playerId: "p1", sessionId: "ts7", score: 1, approved: true, date: "2026-02-10" },
  { id: "pr8", playerId: "p1", sessionId: "ts8", score: 2, approved: false, date: "2026-02-06" },
];

export const teams: Team[] = [
  { id: "t1", name: "Thunder FC", captainId: "p1", playerIds: ["p1", "p5", "p9", "p13", "p2", "p6", "p10", "p14", "p17", "p20"], played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 3, points: 7 },
  { id: "t2", name: "Phoenix United", captainId: "p4", playerIds: ["p4", "p8", "p12", "p16", "p3", "p7", "p11", "p15", "p18", "p19"], played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 7, goalsAgainst: 5, points: 6 },
  { id: "t3", name: "Storm City", captainId: "p13", playerIds: ["p13", "p2", "p6", "p10", "p14", "p5", "p9", "p17", "p20", "p3"], played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 5, points: 4 },
  { id: "t4", name: "Blaze Athletic", captainId: "p2", playerIds: ["p2", "p7", "p11", "p15", "p18", "p4", "p8", "p12", "p16", "p19"], played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 9, points: 0 },
];

export const matches: Match[] = [
  { id: "m1", competitionId: "c1", homeTeamId: "t1", awayTeamId: "t2", homeScore: 3, awayScore: 1, date: "2026-02-07", played: true, matchday: 1 },
  { id: "m2", competitionId: "c1", homeTeamId: "t3", awayTeamId: "t4", homeScore: 2, awayScore: 0, date: "2026-02-07", played: true, matchday: 1 },
  { id: "m3", competitionId: "c1", homeTeamId: "t1", awayTeamId: "t3", homeScore: 2, awayScore: 2, date: "2026-02-14", played: true, matchday: 2 },
  { id: "m4", competitionId: "c1", homeTeamId: "t2", awayTeamId: "t4", homeScore: 4, awayScore: 1, date: "2026-02-14", played: true, matchday: 2 },
  { id: "m5", competitionId: "c1", homeTeamId: "t1", awayTeamId: "t4", homeScore: 3, awayScore: 1, date: "2026-02-21", played: true, matchday: 3 },
  { id: "m6", competitionId: "c1", homeTeamId: "t2", awayTeamId: "t3", homeScore: 2, awayScore: 3, date: "2026-02-21", played: true, matchday: 3 },
  { id: "m7", competitionId: "c1", homeTeamId: "t3", awayTeamId: "t1", homeScore: null, awayScore: null, date: "2026-03-07", played: false, matchday: 4 },
  { id: "m8", competitionId: "c1", homeTeamId: "t4", awayTeamId: "t2", homeScore: null, awayScore: null, date: "2026-03-07", played: false, matchday: 4 },
];

export const matchStats: MatchStat[] = [
  { id: "ms1", matchId: "m1", playerId: "p1", goals: 2, assists: 1, yellowCards: 0, redCards: 0, manOfTheMatch: true },
  { id: "ms2", matchId: "m1", playerId: "p13", goals: 1, assists: 0, yellowCards: 0, redCards: 0, manOfTheMatch: false },
  { id: "ms3", matchId: "m2", playerId: "p4", goals: 1, assists: 1, yellowCards: 0, redCards: 0, manOfTheMatch: true },
  { id: "ms4", matchId: "m3", playerId: "p1", goals: 1, assists: 1, yellowCards: 1, redCards: 0, manOfTheMatch: false },
  { id: "ms5", matchId: "m3", playerId: "p3", goals: 1, assists: 0, yellowCards: 0, redCards: 0, manOfTheMatch: true },
  { id: "ms6", matchId: "m4", playerId: "p8", goals: 2, assists: 0, yellowCards: 0, redCards: 0, manOfTheMatch: true },
  { id: "ms7", matchId: "m5", playerId: "p1", goals: 2, assists: 0, yellowCards: 0, redCards: 0, manOfTheMatch: true },
  { id: "ms8", matchId: "m5", playerId: "p19", goals: 1, assists: 1, yellowCards: 0, redCards: 0, manOfTheMatch: false },
  { id: "ms9", matchId: "m6", playerId: "p13", goals: 2, assists: 1, yellowCards: 0, redCards: 0, manOfTheMatch: true },
];

export const currentCompetition: Competition = {
  id: "c1",
  name: "February-March Cup 2026",
  startDate: "2026-02-07",
  endDate: "2026-03-14",
  status: "active",
  teams,
};

export const monthlyAwards: MonthlyAward = {
  id: "ma1",
  month: "February",
  year: 2026,
  top8: ["p1", "p13", "p4", "p2", "p8", "p19", "p7", "p17"],
  honorableMentions: ["p3", "p5"],
};

export const getPlayerById = (id: string) => players.find(p => p.id === id);

export const getTopScorers = () => {
  const scorerMap: Record<string, { goals: number; assists: number; name: string }> = {};
  matchStats.forEach(ms => {
    const player = getPlayerById(ms.playerId);
    if (!player) return;
    if (!scorerMap[ms.playerId]) scorerMap[ms.playerId] = { goals: 0, assists: 0, name: player.fullName };
    scorerMap[ms.playerId].goals += ms.goals;
    scorerMap[ms.playerId].assists += ms.assists;
  });
  return Object.entries(scorerMap)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.goals - a.goals || b.assists - a.assists);
};

export const attendanceChartData = [
  { week: "W1", attendance: 90 },
  { week: "W2", attendance: 95 },
  { week: "W3", attendance: 85 },
  { week: "W4", attendance: 100 },
  { week: "W5", attendance: 80 },
  { week: "W6", attendance: 75 },
  { week: "W7", attendance: 90 },
  { week: "W8", attendance: 95 },
];

export const performanceChartData = [
  { week: "W1", score: 2 },
  { week: "W2", score: 1 },
  { week: "W3", score: 3 },
  { week: "W4", score: 2 },
  { week: "W5", score: 2 },
  { week: "W6", score: 3 },
  { week: "W7", score: 1 },
  { week: "W8", score: 2 },
];
