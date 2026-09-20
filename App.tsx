import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Data & Types
import {
  INITIAL_USER_PROFILE,
  INITIAL_PROGRESS_SUMMARY,
  INITIAL_COMPLETED_SESSIONS,
  SAMPLE_FIRST_ATTEMPT,
  SAMPLE_LATEST_ATTEMPT,
} from './src/data/initialData';
import { MOCK_QUESTIONS } from './src/data/mockQuestions';
import {
  InterviewQuestion,
  PracticeSessionConfig,
} from './src/types/interview';
import { AttemptAnalysis } from './src/types/analysis';
import { CompletedSessionSummary, UserProfile } from './src/types/user';

// Components & Navigation
import { BottomNav, MainTab } from './src/components/BottomNav';
import { AnalysisLoader } from './src/components/AnalysisLoader';
import { AnalysisEngine } from './src/services/analysisEngine';

// Screens
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PracticeSetupScreen } from './src/screens/PracticeSetupScreen';
import { InterviewScreen } from './src/screens/InterviewScreen';
import { RecordingScreen } from './src/screens/RecordingScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { ComparisonScreen } from './src/screens/ComparisonScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { PaywallModal } from './src/screens/PaywallModal';

type FlowState =
  | 'tabs'
  | 'welcome'
  | 'practice_setup'
  | 'interview_question'
  | 'recording'
  | 'analyzing'
  | 'results'
  | 'comparison';

export default function App() {
  // Global User & Progress State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [progress, setProgress] = useState(INITIAL_PROGRESS_SUMMARY);
  const [sessions, setSessions] = useState<CompletedSessionSummary[]>(
    INITIAL_COMPLETED_SESSIONS
  );

  // App Navigation Flow
  const [flowState, setFlowState] = useState<FlowState>('welcome');
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [showPaywall, setShowPaywall] = useState(false);

  // Practice Session State
  const [sessionQuestions, setSessionQuestions] = useState<InterviewQuestion[]>([
    MOCK_QUESTIONS[0],
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordedDuration, setRecordedDuration] = useState(68);
  const [recordedAudioUri, setRecordedAudioUri] = useState<string | null>(null);

  // Attempt History for the Current Question ("Beat Your Answer" loop)
  const [questionAttempts, setQuestionAttempts] = useState<AttemptAnalysis[]>([
    SAMPLE_FIRST_ATTEMPT,
  ]);
  const [currentAttempt, setCurrentAttempt] = useState<AttemptAnalysis>(
    SAMPLE_FIRST_ATTEMPT
  );

  const activeQuestion =
    sessionQuestions[currentQuestionIndex] || MOCK_QUESTIONS[0];

  // Start Practice from anywhere
  const handleStartPracticeFlow = () => {
    setFlowState('practice_setup');
  };

  // Launch Session from Practice Setup
  const handleLaunchSession = (config: PracticeSessionConfig) => {
    const matchingQuestions = MOCK_QUESTIONS.filter(
      (q) => q.type === config.type && q.difficulty === config.difficulty
    );

    const questionsPool =
      matchingQuestions.length > 0
        ? matchingQuestions
        : MOCK_QUESTIONS.filter((q) => q.type === config.type);

    const finalQuestions =
      questionsPool.length > 0
        ? questionsPool.slice(0, config.questionCount)
        : [MOCK_QUESTIONS[0]];

    setSessionQuestions(finalQuestions);
    setCurrentQuestionIndex(0);
    setQuestionAttempts([]);
    setFlowState('interview_question');
  };

  // User taps Start Answer in Interview Question screen
  const handleStartAnswer = () => {
    setFlowState('recording');
  };

  // User taps Stop Answer in Recording screen
  const handleFinishRecording = (duration: number, audioUri: string | null) => {
    setRecordedDuration(duration);
    setRecordedAudioUri(audioUri);
    setFlowState('analyzing');
  };

  // When AI step-by-step analysis loader finishes
  const handleAnalysisComplete = () => {
    const nextAttemptNumber = questionAttempts.length + 1;

    const newAnalysis = AnalysisEngine.analyzeResponse({
      question: activeQuestion,
      durationSeconds: recordedDuration,
      attemptNumber: nextAttemptNumber,
      audioUri: recordedAudioUri,
      previousAttempts: questionAttempts,
    });

    const updatedAttempts = [...questionAttempts, newAnalysis];
    setQuestionAttempts(updatedAttempts);
    setCurrentAttempt(newAnalysis);

    // Update user stats
    if (newAnalysis.overallScore > user.bestOverallScore) {
      setUser((prev) => ({
        ...prev,
        bestOverallScore: newAnalysis.overallScore,
      }));
    }

    setFlowState('results');
  };

  // User taps "Beat your answer" (Retry)
  const handleRetry = () => {
    setFlowState('interview_question');
  };

  // User taps "Compare attempts"
  const handleOpenComparison = () => {
    setFlowState('comparison');
  };

  // User moves to next question or finishes the interview session
  const handleNextOrFinishSession = () => {
    const hasNext = currentQuestionIndex + 1 < sessionQuestions.length;

    if (hasNext) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionAttempts([]);
      setFlowState('interview_question');
    } else {
      // Complete Session
      const completedSession: CompletedSessionSummary = {
        id: `session-${Date.now()}`,
        title: activeQuestion.question,
        interviewType: activeQuestion.categoryName,
        dateLabel: 'Today',
        score: currentAttempt.overallScore,
        attemptsCount: Math.max(1, questionAttempts.length),
        bestAttempt: currentAttempt,
      };

      setSessions((prev) => [completedSession, ...prev]);
      setUser((prev) => ({
        ...prev,
        totalSessionsCompleted: prev.totalSessionsCompleted + 1,
      }));

      // Return to main tabs
      setFlowState('tabs');
      setActiveTab('home');
    }
  };

  // Inspect previous session from History or Recent Practice
  const handleOpenCompletedSession = (session: CompletedSessionSummary) => {
    setCurrentAttempt(session.bestAttempt);
    setQuestionAttempts([session.bestAttempt]);
    setFlowState('results');
  };

  // Clear data action from profile privacy controls
  const handleClearHistory = () => {
    setSessions([]);
    setUser((prev) => ({
      ...prev,
      totalSessionsCompleted: 0,
    }));
  };

  // Handle Tab Selection
  const handleSelectTab = (tab: MainTab) => {
    setActiveTab(tab);
    if (tab === 'practice') {
      handleStartPracticeFlow();
    } else {
      setFlowState('tabs');
    }
  };

  // RENDER FLOWS
  if (flowState === 'welcome') {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <WelcomeScreen onStart={() => setFlowState('tabs')} />
      </View>
    );
  }

  if (flowState === 'practice_setup') {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <PracticeSetupScreen
          onBack={() => {
            setFlowState('tabs');
            setActiveTab('home');
          }}
          onLaunchSession={handleLaunchSession}
        />
      </View>
    );
  }

  if (flowState === 'interview_question') {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <InterviewScreen
          question={activeQuestion}
          questionIndex={currentQuestionIndex}
          totalQuestions={sessionQuestions.length}
          onStartAnswer={handleStartAnswer}
          onExit={() => {
            setFlowState('tabs');
            setActiveTab('home');
          }}
        />
      </View>
    );
  }

  if (flowState === 'recording') {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <RecordingScreen
          questionText={activeQuestion.question}
          onFinishRecording={handleFinishRecording}
          onCancel={() => setFlowState('interview_question')}
        />
      </View>
    );
  }

  if (flowState === 'analyzing') {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <AnalysisLoader onComplete={handleAnalysisComplete} />
      </View>
    );
  }

  if (flowState === 'results') {
    const previousAttempt =
      questionAttempts.length > 1 ? questionAttempts[0] : undefined;

    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <ResultsScreen
          currentAttempt={currentAttempt}
          previousAttempt={previousAttempt}
          onRetry={handleRetry}
          onCompare={handleOpenComparison}
          onNextOrFinish={handleNextOrFinishSession}
          hasNextQuestion={currentQuestionIndex + 1 < sessionQuestions.length}
          totalAttemptsCount={questionAttempts.length}
        />
      </View>
    );
  }

  if (flowState === 'comparison') {
    const personalBest = Math.max(
      ...questionAttempts.map((a) => a.overallScore),
      currentAttempt.overallScore
    );

    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <ComparisonScreen
          questionTitle={activeQuestion.question}
          categoryName={activeQuestion.categoryName}
          attempts={
            questionAttempts.length >= 2
              ? questionAttempts
              : [SAMPLE_FIRST_ATTEMPT, SAMPLE_LATEST_ATTEMPT]
          }
          personalBestScore={personalBest}
          onBackToResults={() => setFlowState('results')}
          onPracticeAnother={() => {
            setFlowState('practice_setup');
          }}
        />
      </View>
    );
  }

  // DEFAULT 5-TAB SCREEN
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.screenContent}>
        {activeTab === 'home' && (
          <HomeScreen
            user={user}
            recentSessions={sessions}
            onStartPractice={handleStartPracticeFlow}
            onOpenSession={handleOpenCompletedSession}
          />
        )}

        {activeTab === 'progress' && <ProgressScreen progress={progress} />}

        {activeTab === 'history' && (
          <HistoryScreen
            sessions={sessions}
            streakDays={user.streakDays}
            bestScore={user.bestOverallScore}
            onOpenSession={handleOpenCompletedSession}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            user={user}
            onOpenPaywall={() => setShowPaywall(true)}
            onClearHistory={handleClearHistory}
          />
        )}
      </View>

      {/* Persistent Bottom Tab Bar */}
      <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Paywall Sheet */}
      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccessPro={() =>
          setUser((prev) => ({
            ...prev,
            isPro: true,
          }))
        }
        improvementText={`${SAMPLE_FIRST_ATTEMPT.overallScore} → ${user.bestOverallScore} 🎉`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B0B14',
  },
  screenContent: {
    flex: 1,
  },
});
