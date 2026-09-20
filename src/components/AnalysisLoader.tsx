import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AnalysisLoaderProps {
  onComplete: () => void;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Transcribing audio',
    'Understanding your response',
    'Evaluating communication metrics',
    'Preparing personalized feedback',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 600);
    const timer2 = setTimeout(() => setStepIndex(2), 1200);
    const timer3 = setTimeout(() => setStepIndex(3), 1800);
    const timer4 = setTimeout(() => onComplete(), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.iconOrb}>
        <Text style={styles.sparkle}>✦</Text>
      </View>
      <Text style={styles.title}>Analyzing your answer...</Text>
      <Text style={styles.subtitle}>PitchMe AI is reviewing your tone, structure, and delivery</Text>

      <View style={styles.stepsBox}>
        {steps.map((label, index) => {
          const isDone = stepIndex > index;
          const isCurrent = stepIndex === index;

          return (
            <View key={label} style={styles.stepRow}>
              <Text
                style={[
                  styles.stepIcon,
                  isDone && styles.stepDoneIcon,
                  isCurrent && styles.stepCurrentIcon,
                ]}
              >
                {isDone ? '✓' : isCurrent ? '◌' : '○'}
              </Text>
              <Text
                style={[
                  styles.stepText,
                  isDone && styles.stepDoneText,
                  isCurrent && styles.stepCurrentText,
                ]}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B14',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  iconOrb: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#231B45',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 6,
  },
  sparkle: {
    color: '#C4B5FD',
    fontSize: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    color: '#8E8EA8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
    lineHeight: 19,
  },
  stepsBox: {
    marginTop: 36,
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#141422',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#252538',
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepIcon: {
    fontSize: 18,
    color: '#55556B',
    width: 22,
    textAlign: 'center',
  },
  stepDoneIcon: {
    color: '#10B981', // emerald check
    fontWeight: '800',
  },
  stepCurrentIcon: {
    color: '#A78BFA', // violet in progress
    fontWeight: '800',
  },
  stepText: {
    color: '#55556B',
    fontSize: 14,
    fontWeight: '600',
  },
  stepDoneText: {
    color: '#E2E8F0',
    fontWeight: '600',
  },
  stepCurrentText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
