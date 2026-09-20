import { UserProfile, ProgressSummary, CompletedSessionSummary } from '../types/user';
import { AttemptAnalysis } from '../types/analysis';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Kshethra Rajith',
  email: 'kshethra@pitchme.ai',
  avatarLetter: 'K',
  streakDays: 4,
  totalSessionsCompleted: 8,
  bestOverallScore: 87,
  averageScore: 78,
  isPro: false,
};

export const INITIAL_PROGRESS_SUMMARY: ProgressSummary = {
  weeklyTrend: [
    { weekLabel: 'Week 1', score: 64 },
    { weekLabel: 'Week 2', score: 71 },
    { weekLabel: 'Week 3', score: 76 },
    { weekLabel: 'Week 4', score: 82 },
  ],
  topStrength: {
    name: 'Structure',
    score: 88,
  },
  focusArea: {
    name: 'Conciseness',
    score: 71,
  },
  highlightStat: 'Your structure has improved by 17% this month.',
};

export const SAMPLE_FIRST_ATTEMPT: AttemptAnalysis = {
  id: 'att-sample-1',
  attemptNumber: 1,
  questionId: 'job-1',
  questionText: 'Tell me about yourself.',
  categoryName: 'Job Interview',
  timestamp: 'Yesterday',
  durationSeconds: 94,
  recommendedDurationMin: 60,
  recommendedDurationMax: 75,
  overallScore: 61,
  metrics: {
    relevance: 64,
    clarity: 61,
    structure: 58,
    conciseness: 55,
    delivery: 67,
  },
  fillerWords: {
    actually: 5,
    like: 3,
    basically: 2,
  },
  strengths: [
    'You provided a concrete project example instead of a generic statement.',
  ],
  improvements: [
    'Your answer lasted 94 seconds. The same information could be communicated in approximately 60–75 seconds.',
    'The main achievement appeared too late. Mention your strongest result in the first 30 seconds.',
  ],
  nextAttemptTip: 'Start with your current status, then mention your strongest project and finish with one measurable result.',
  audioUri: null,
  transcript:
    'Um, hello. Actually, my name is Kshethra. I like started coding in college and basically did a lot of projects. Um, actually one of my projects was with computer vision. We, like, used deep learning models to detect objects and basically it was hard but we got good results.',
};

export const SAMPLE_LATEST_ATTEMPT: AttemptAnalysis = {
  id: 'att-sample-2',
  attemptNumber: 3,
  questionId: 'job-1',
  questionText: 'Tell me about yourself.',
  categoryName: 'Job Interview',
  timestamp: 'Just now',
  durationSeconds: 68,
  recommendedDurationMin: 60,
  recommendedDurationMax: 75,
  overallScore: 87,
  metrics: {
    relevance: 88,
    clarity: 84,
    structure: 91,
    conciseness: 79,
    delivery: 86,
  },
  fillerWords: {
    like: 1,
    actually: 1,
  },
  strengths: [
    'You clearly connected your academic background with your project experience.',
    'Your delivery pacing is steady with natural pauses replacing previous filler words.',
    'You highlighted a measurable outcome (92% model accuracy) early in the response.',
  ],
  improvements: [
    'Your answer is now in the ideal 60–75 second window. Keep this tight opening in future interviews.',
  ],
  nextAttemptTip: 'Consistently lead with your quantifiable impact before explaining the technical setup.',
  audioUri: null,
  transcript:
    'I am a software developer specializing in intelligent systems. In my final year capstone, I led the pipeline that improved model inference speed by 35% with 92% precision. I am excited to apply this engineering rigor to high-impact products on your team.',
};

export const INITIAL_COMPLETED_SESSIONS: CompletedSessionSummary[] = [
  {
    id: 'sess-1',
    title: 'Tell me about yourself.',
    interviewType: 'Job Interview',
    dateLabel: 'Today',
    score: 87,
    attemptsCount: 3,
    bestAttempt: SAMPLE_LATEST_ATTEMPT,
  },
  {
    id: 'sess-2',
    title: 'Why should we hire you?',
    interviewType: 'Placement',
    dateLabel: 'Yesterday',
    score: 79,
    attemptsCount: 2,
    bestAttempt: {
      ...SAMPLE_LATEST_ATTEMPT,
      id: 'att-sample-prev-1',
      questionId: 'placement-1',
      questionText: 'Why should we hire you?',
      categoryName: 'Placement',
      overallScore: 79,
      durationSeconds: 72,
      metrics: { relevance: 82, clarity: 80, structure: 78, conciseness: 75, delivery: 80 },
      timestamp: 'Yesterday',
    },
  },
  {
    id: 'sess-3',
    title: 'Explain your project architecture',
    interviewType: 'Technical',
    dateLabel: 'Sep 18',
    score: 84,
    attemptsCount: 2,
    bestAttempt: {
      ...SAMPLE_LATEST_ATTEMPT,
      id: 'att-sample-prev-2',
      questionId: 'tech-1',
      questionText: 'Explain your most technically challenging project and its architecture.',
      categoryName: 'Technical',
      overallScore: 84,
      durationSeconds: 85,
      metrics: { relevance: 86, clarity: 85, structure: 88, conciseness: 78, delivery: 83 },
      timestamp: 'Sep 18',
    },
  },
];
