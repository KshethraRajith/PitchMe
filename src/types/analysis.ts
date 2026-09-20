export interface Metrics {
  relevance: number;
  clarity: number;
  structure: number;
  conciseness: number;
  delivery: number;
}

export interface FillerWordsMap {
  [word: string]: number;
}

export interface AttemptAnalysis {
  id: string;
  attemptNumber: number;
  questionId: string;
  questionText: string;
  categoryName: string;
  timestamp: string;
  durationSeconds: number;
  recommendedDurationMin: number;
  recommendedDurationMax: number;
  overallScore: number;
  metrics: Metrics;
  fillerWords: FillerWordsMap;
  strengths: string[];
  improvements: string[];
  nextAttemptTip: string;
  audioUri: string | null;
  transcript: string;
}

export interface QuestionHistory {
  questionId: string;
  questionText: string;
  categoryName: string;
  personalBestScore: number;
  attempts: AttemptAnalysis[];
}
