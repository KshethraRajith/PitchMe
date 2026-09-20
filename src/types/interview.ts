export type InterviewType = 'job' | 'placement' | 'internship' | 'technical' | 'viva';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionCount = 3 | 5;

export interface InterviewCategory {
  id: InterviewType;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  accentColor: string;
}

export interface InterviewQuestion {
  id: string;
  type: InterviewType;
  difficulty: Difficulty;
  question: string;
  recommendedDurationMin: number; // in seconds
  recommendedDurationMax: number; // in seconds
  coachingCue: string;
  categoryName: string;
}

export interface PracticeSessionConfig {
  type: InterviewType;
  difficulty: Difficulty;
  questionCount: QuestionCount;
}
