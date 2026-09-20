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
import { AttemptAnalysis } from '../types/analysis';
import { AttemptCompare } from '../components/AttemptCompare';
import { PrimaryButton } from '../components/PrimaryButton';

interface ComparisonScreenProps {
  questionTitle: string;
  categoryName: string;
  attempts: AttemptAnalysis[];
  personalBestScore: number;
  onBackToResults: () => void;
  onPracticeAnother: () => void;
}

export const ComparisonScreen: React.FC<ComparisonScreenProps> = ({
  questionTitle,
  categoryName,
  attempts,
  personalBestScore,
  onBackToResults,
  onPracticeAnother,
}) => {
  const firstAttempt = attempts[0];
  const latestAttempt = attempts[attempts.length - 1];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackToResults} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attempt Comparison</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>BEAT YOUR ANSWER</Text>
        <Text style={styles.pageTitle}>Measurable Progress. 🔥</Text>
        <Text style={styles.questionSummary}>
          {questionTitle} · {categoryName}
        </Text>

        {/* Personal Best Indicator */}
        <View style={styles.pbCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pbLabel}>🏆 PERSONAL BEST ON THIS QUESTION</Text>
            <Text style={styles.pbQuestionTitle}>{questionTitle}</Text>
          </View>
          <View style={styles.pbScoreBox}>
            <Text style={styles.pbScoreValue}>{personalBestScore}</Text>
            <Text style={styles.pbOutOf}>/100</Text>
          </View>
        </View>

        {/* Main Comparison Component */}
        <AttemptCompare
          firstAttempt={firstAttempt}
          latestAttempt={latestAttempt}
          allAttempts={attempts}
        />

        {/* Coaching Takeaway */}
        <View style={styles.takeawayCard}>
          <Text style={styles.takeawayTitle}>COACHING HIGHLIGHT</Text>
          <Text style={styles.takeawayText}>
            Your biggest leap was in Structure (+
            {latestAttempt.metrics.structure - firstAttempt.metrics.structure} pts).
            Leading with your key achievement transformed your answer from hesitant to authoritative.
          </Text>
        </View>

        {/* Action Button */}
        <View style={styles.buttonWrap}>
          <PrimaryButton
            label="Practice Another Question  →"
            onPress={onPracticeAnother}
          />
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
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#171724',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 34,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  eyebrow: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginTop: 6,
  },
  questionSummary: {
    color: '#8E8EA8',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 20,
  },
  pbCard: {
    backgroundColor: '#1E1834',
    borderColor: '#433470',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  pbLabel: {
    color: '#FBBF24',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  pbQuestionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  pbScoreBox: {
    alignItems: 'center',
    backgroundColor: '#271F47',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  pbScoreValue: {
    color: '#FBBF24',
    fontSize: 24,
    fontWeight: '900',
  },
  pbOutOf: {
    color: '#8E8EA8',
    fontSize: 10,
    fontWeight: '700',
  },
  takeawayCard: {
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#242436',
    marginTop: 16,
    marginBottom: 24,
  },
  takeawayTitle: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  takeawayText: {
    color: '#DDD6FE',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  buttonWrap: {
    marginTop: 8,
  },
});
