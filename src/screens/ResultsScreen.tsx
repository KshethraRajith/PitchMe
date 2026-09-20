import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AttemptAnalysis, Metrics } from '../types/analysis';
import { ScoreRing } from '../components/ScoreRing';
import { MetricBar } from '../components/MetricBar';
import { AudioPlayer } from '../components/AudioPlayer';
import { PrimaryButton } from '../components/PrimaryButton';

interface ResultsScreenProps {
  currentAttempt: AttemptAnalysis;
  previousAttempt?: AttemptAnalysis;
  onRetry: () => void;
  onCompare: () => void;
  onNextOrFinish: () => void;
  hasNextQuestion: boolean;
  totalAttemptsCount: number;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  currentAttempt,
  previousAttempt,
  onRetry,
  onCompare,
  onNextOrFinish,
  hasNextQuestion,
  totalAttemptsCount,
}) => {
  const metricKeys: (keyof Metrics)[] = [
    'relevance',
    'clarity',
    'structure',
    'conciseness',
    'delivery',
  ];

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  const isDurationWithinRecommended =
    currentAttempt.durationSeconds >= currentAttempt.recommendedDurationMin &&
    currentAttempt.durationSeconds <= currentAttempt.recommendedDurationMax;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>PITCH COACHING</Text>
        <Text style={styles.headerTitle}>Your Feedback</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Attempt info */}
        <View style={styles.topMetaRow}>
          <Text style={styles.attemptBadge}>
            ATTEMPT {currentAttempt.attemptNumber}
          </Text>
          <Text style={styles.questionCategoryBadge}>
            {currentAttempt.categoryName}
          </Text>
        </View>

        {/* Score Ring & Summary banner */}
        <View style={styles.scoreRow}>
          <ScoreRing score={currentAttempt.overallScore} />
          <View style={{ flex: 1 }}>
            <Text style={styles.scoreTag}>
              {currentAttempt.overallScore >= 85
                ? 'EXCEPTIONAL DELIVERY'
                : currentAttempt.overallScore >= 75
                ? 'STRONG IMPROVEMENT'
                : 'SOLID BASELINE TO BEAT'}
            </Text>
            <Text style={styles.scoreHeadline}>
              {previousAttempt
                ? `You gained +${currentAttempt.overallScore - previousAttempt.overallScore} points over Attempt 1!`
                : 'Practice again to beat your baseline and eliminate filler words.'}
            </Text>
          </View>
        </View>

        {/* Audio Playback Option */}
        {currentAttempt.audioUri && (
          <AudioPlayer audioUri={currentAttempt.audioUri} />
        )}

        {/* 5 Core Metrics */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>COMMUNICATION METRICS</Text>
          {metricKeys.map((key) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <MetricBar
                key={key}
                label={label}
                value={currentAttempt.metrics[key]}
                previousValue={previousAttempt?.metrics[key]}
              />
            );
          })}
        </View>

        {/* Observable Filler Words */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>🗣  FILLER WORDS</Text>
          <View style={styles.fillerWordsRow}>
            {Object.entries(currentAttempt.fillerWords).length > 0 ? (
              Object.entries(currentAttempt.fillerWords).map(([word, count]) => (
                <View key={word} style={styles.fillerTag}>
                  <Text style={styles.fillerWordText}>"{word}"</Text>
                  <Text style={styles.fillerCountText}>{count}×</Text>
                </View>
              ))
            ) : (
              <Text style={styles.zeroFillerText}>
                Zero filler words detected! Outstanding clarity.
              </Text>
            )}
          </View>
          <Text style={styles.fillerCoachingTip}>
            Tip: Replace filler words with a confident 1-second pause.
          </Text>
        </View>

        {/* Answer Duration */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>⏱  ANSWER TIME</Text>
          <View style={styles.durationRow}>
            <View>
              <Text style={styles.durationBig}>
                {formatDuration(currentAttempt.durationSeconds)}
              </Text>
              <Text style={styles.durationSubLabel}>Your speaking time</Text>
            </View>
            <View style={styles.durationTargetBox}>
              <Text style={styles.durationTargetText}>
                {formatDuration(currentAttempt.recommendedDurationMin)}–
                {formatDuration(currentAttempt.recommendedDurationMax)}
              </Text>
              <Text style={styles.durationSubLabel}>Recommended target</Text>
            </View>
          </View>
          {!isDurationWithinRecommended && (
            <Text style={styles.durationWarning}>
              {currentAttempt.durationSeconds > currentAttempt.recommendedDurationMax
                ? 'Your answer ran a bit long. Aim to trim unnecessary background setup.'
                : 'Your answer was quite brief. Elaborate on your key technical challenge.'}
            </Text>
          )}
        </View>

        {/* What Worked */}
        <View style={styles.workedCard}>
          <Text style={styles.workedTitle}>✦  WHAT WORKED</Text>
          {currentAttempt.strengths.map((str, i) => (
            <Text key={i} style={styles.workedText}>
              • {str}
            </Text>
          ))}
        </View>

        {/* Improve This */}
        <View style={styles.improveCard}>
          <Text style={styles.improveTitle}>↗  IMPROVE THIS</Text>
          {currentAttempt.improvements.map((imp, i) => (
            <Text key={i} style={styles.improveText}>
              • {imp}
            </Text>
          ))}
        </View>

        {/* Your Next Attempt (The Single Actionable Tip) */}
        <View style={styles.nextAttemptCard}>
          <Text style={styles.nextAttemptTitle}>🎯  YOUR NEXT ATTEMPT</Text>
          <Text style={styles.nextAttemptTip}>
            {currentAttempt.nextAttemptTip}
          </Text>
        </View>

        {/* Primary Action Buttons */}
        <View style={styles.buttonStack}>
          <PrimaryButton
            label="🔁  Beat your answer"
            onPress={onRetry}
          />

          {totalAttemptsCount > 1 && (
            <PrimaryButton
              label="📈  Compare attempts"
              secondary
              onPress={onCompare}
            />
          )}

          <TouchableOpacity
            onPress={onNextOrFinish}
            style={styles.nextSessionLink}
            activeOpacity={0.7}
          >
            <Text style={styles.nextSessionLinkText}>
              {hasNextQuestion ? 'Next Question  →' : 'Finish Session  →'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B0B14',
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#171724',
  },
  headerEyebrow: {
    color: '#A78BFA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  topMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  attemptBadge: {
    color: '#8B5CF6',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  questionCategoryBadge: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '700',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#141420',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#242436',
    marginBottom: 16,
  },
  scoreTag: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scoreHeadline: {
    color: '#DDD6FE',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    marginTop: 6,
  },
  card: {
    backgroundColor: '#141420',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#242436',
    marginBottom: 14,
  },
  cardHeader: {
    color: '#8E8EA8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  fillerWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  fillerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#201A34',
    borderColor: '#3D3166',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 8,
  },
  fillerWordText: {
    color: '#E0E7FF',
    fontSize: 13,
    fontWeight: '700',
  },
  fillerCountText: {
    color: '#F43F5E',
    fontSize: 13,
    fontWeight: '800',
  },
  zeroFillerText: {
    color: '#34D399',
    fontSize: 13,
    fontWeight: '700',
  },
  fillerCoachingTip: {
    color: '#71718A',
    fontSize: 12,
    lineHeight: 18,
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationBig: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  durationSubLabel: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  durationTargetBox: {
    alignItems: 'flex-end',
  },
  durationTargetText: {
    color: '#C4B5FD',
    fontSize: 22,
    fontWeight: '800',
  },
  durationWarning: {
    color: '#FBBF24',
    fontSize: 12,
    marginTop: 10,
    lineHeight: 17,
  },
  workedCard: {
    backgroundColor: '#0F1E19',
    borderColor: '#065F46',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  workedTitle: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  workedText: {
    color: '#D1FAE5',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  improveCard: {
    backgroundColor: '#1E1722',
    borderColor: '#581C87',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  improveTitle: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  improveText: {
    color: '#EDE9FE',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  nextAttemptCard: {
    backgroundColor: '#201A38',
    borderColor: '#7C3AED',
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  nextAttemptTitle: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  nextAttemptTip: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
  },
  buttonStack: {
    gap: 12,
  },
  nextSessionLink: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  nextSessionLinkText: {
    color: '#C4B5FD',
    fontSize: 14,
    fontWeight: '800',
  },
});
