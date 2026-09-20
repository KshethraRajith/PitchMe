import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { InterviewQuestion } from '../types/interview';
import { PrimaryButton } from '../components/PrimaryButton';

interface InterviewScreenProps {
  question: InterviewQuestion;
  questionIndex: number;
  totalQuestions: number;
  onStartAnswer: () => void;
  onExit: () => void;
}

export const InterviewScreen: React.FC<InterviewScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onStartAnswer,
  onExit,
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Clean top bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onExit} style={styles.exitButton}>
          <Text style={styles.exitArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerCategory}>
          {question.categoryName.toUpperCase()}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.container}>
        {/* Progress Counter */}
        <Text style={styles.counter}>
          QUESTION {questionIndex + 1} OF {totalQuestions}
        </Text>

        {/* Minimal Focus Orb */}
        <View style={styles.orbContainer}>
          <View style={styles.orb}>
            <Text style={styles.orbIcon}>✦</Text>
          </View>
        </View>

        {/* Question Text */}
        <Text style={styles.questionText}>"{question.question}"</Text>

        {/* Recommended Duration */}
        <Text style={styles.durationHint}>
          Recommended response · {question.recommendedDurationMin}–{question.recommendedDurationMax} seconds
        </Text>

        {/* Framework coaching cue */}
        <View style={styles.cueBox}>
          <Text style={styles.cueLabel}>COACHING FRAMEWORK</Text>
          <Text style={styles.cueText}>{question.coachingCue}</Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* Start Answer Action */}
        <View style={styles.actionWrap}>
          <PrimaryButton label="🎙  Start Answer" onPress={onStartAnswer} />
          <Text style={styles.reassuranceText}>
            Take a breath. You can retry as many times as you want.
          </Text>
        </View>
      </View>
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
  exitButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitArrow: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 34,
  },
  headerCategory: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 32,
  },
  counter: {
    color: '#71718A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  orbContainer: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 24,
  },
  orb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1E1838',
    borderWidth: 1,
    borderColor: '#3D3166',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
  },
  orbIcon: {
    color: '#C4B5FD',
    fontSize: 26,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 38,
    textAlign: 'center',
  },
  durationHint: {
    color: '#8E8EA8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },
  cueBox: {
    backgroundColor: '#141422',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#26243C',
    marginTop: 28,
    alignItems: 'center',
  },
  cueLabel: {
    color: '#A78BFA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cueText: {
    color: '#DDD6FE',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    textAlign: 'center',
  },
  actionWrap: {
    gap: 14,
  },
  reassuranceText: {
    color: '#65657A',
    fontSize: 12,
    textAlign: 'center',
  },
});
