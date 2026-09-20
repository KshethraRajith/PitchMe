import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { INTERVIEW_CATEGORIES } from '../data/mockQuestions';
import { Difficulty, InterviewType, PracticeSessionConfig, QuestionCount } from '../types/interview';
import { PrimaryButton } from '../components/PrimaryButton';

interface PracticeSetupScreenProps {
  onBack: () => void;
  onLaunchSession: (config: PracticeSessionConfig) => void;
}

export const PracticeSetupScreen: React.FC<PracticeSetupScreenProps> = ({
  onBack,
  onLaunchSession,
}) => {
  const [selectedType, setSelectedType] = useState<InterviewType>('job');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [selectedCount, setSelectedCount] = useState<QuestionCount>(3);

  const difficulties: { id: Difficulty; label: string; desc: string }[] = [
    { id: 'easy', label: 'Easy', desc: 'Foundational questions to build flow' },
    { id: 'medium', label: 'Medium', desc: 'Realistic standard interview queries' },
    { id: 'hard', label: 'Hard', desc: 'Challenging follow-ups & trade-offs' },
  ];

  const handleStart = () => {
    onLaunchSession({
      type: selectedType,
      difficulty: selectedDifficulty,
      questionCount: selectedCount,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Practice Setup</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Step 1: Interview Type */}
        <Text style={styles.stepEyebrow}>STEP 1 · WHAT ARE YOU PREPARING FOR?</Text>
        <Text style={styles.stepTitle}>Choose your interview</Text>

        <View style={styles.categoryGrid}>
          {INTERVIEW_CATEGORIES.map((cat) => {
            const isSelected = selectedType === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedType(cat.id)}
                style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                activeOpacity={0.75}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={styles.categoryName}>{cat.title}</Text>
                <Text style={styles.categoryTagline}>{cat.tagline}</Text>
                {isSelected && (
                  <View style={styles.selectedTick}>
                    <Text style={styles.tickText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Step 2: Difficulty */}
        <Text style={[styles.stepEyebrow, { marginTop: 32 }]}>
          STEP 2 · CHOOSE DIFFICULTY
        </Text>
        <Text style={styles.stepTitle}>Select question intensity</Text>

        <View style={styles.difficultyList}>
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <TouchableOpacity
                key={diff.id}
                onPress={() => setSelectedDifficulty(diff.id)}
                style={[styles.difficultyItem, isSelected && styles.difficultyItemSelected]}
                activeOpacity={0.75}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.difficultyLabel, isSelected && styles.difficultyLabelSelected]}>
                    {diff.label}
                  </Text>
                  <Text style={styles.difficultyDesc}>{diff.desc}</Text>
                </View>
                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Step 3: Question Count */}
        <Text style={[styles.stepEyebrow, { marginTop: 32 }]}>
          STEP 3 · SESSION LENGTH
        </Text>
        <Text style={styles.stepTitle}>How much time do you have?</Text>

        <View style={styles.countRow}>
          <TouchableOpacity
            onPress={() => setSelectedCount(3)}
            style={[styles.countCard, selectedCount === 3 && styles.countCardSelected]}
            activeOpacity={0.75}
          >
            <Text style={styles.countTitle}>Quick Practice</Text>
            <Text style={styles.countBadge}>3 questions</Text>
            <Text style={styles.countSub}>~5 to 7 minutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedCount(5)}
            style={[styles.countCard, selectedCount === 5 && styles.countCardSelected]}
            activeOpacity={0.75}
          >
            <Text style={styles.countTitle}>Full Interview</Text>
            <Text style={styles.countBadge}>5 questions</Text>
            <Text style={styles.countSub}>~10 to 12 minutes</Text>
          </TouchableOpacity>
        </View>

        {/* Start Button */}
        <View style={styles.actionContainer}>
          <PrimaryButton label="Enter Interview Room  →" onPress={handleStart} />
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
  stepEyebrow: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  stepTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 6,
    marginBottom: 16,
  },
  categoryGrid: {
    gap: 10,
  },
  categoryCard: {
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#242436',
    position: 'relative',
  },
  categoryCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#1A162C',
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
  },
  categoryTagline: {
    color: '#8A8A9E',
    fontSize: 12,
    marginTop: 3,
  },
  selectedTick: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  difficultyList: {
    gap: 10,
  },
  difficultyItem: {
    backgroundColor: '#141420',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#242436',
  },
  difficultyItemSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#1A162C',
  },
  difficultyLabel: {
    color: '#CBCBD8',
    fontSize: 15,
    fontWeight: '700',
  },
  difficultyLabelSelected: {
    color: '#FFFFFF',
  },
  difficultyDesc: {
    color: '#7B7B8F',
    fontSize: 12,
    marginTop: 3,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#424258',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#8B5CF6',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  countRow: {
    flexDirection: 'row',
    gap: 12,
  },
  countCard: {
    flex: 1,
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#242436',
  },
  countCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#1A162C',
  },
  countTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  countBadge: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
  },
  countSub: {
    color: '#71718A',
    fontSize: 11,
    marginTop: 4,
  },
  actionContainer: {
    marginTop: 34,
  },
});
