import { AttemptAnalysis } from './analysis';

export interface UserProfile {
  name: string;
  email: string;
  avatarLetter: string;
  streakDays: number;
  totalSessionsCompleted: number;
  bestOverallScore: number;
  averageScore: number;
  isPro: boolean;
}

export interface WeeklyScoreTrend {
  weekLabel: string;
  score: number;
}

export interface ProgressSummary {
  weeklyTrend: WeeklyScoreTrend[];
  topStrength: {
    name: string;
    score: number;
  };
  focusArea: {
    name: string;
    score: number;
  };
  highlightStat: string; // e.g., "Your structure has improved by 17% this month."
}

export interface CompletedSessionSummary {
  id: string;
  title: string;
  interviewType: string;
  dateLabel: string;
  score: number;
  attemptsCount: number;
  bestAttempt: AttemptAnalysis;
}
