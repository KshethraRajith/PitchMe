import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ScoreRingProps {
  score: number;
  size?: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score, size = 118 }) => {
  const getScoreColor = () => {
    if (score >= 85) return '#10B981'; // emerald
    if (score >= 75) return '#8B5CF6'; // violet
    if (score >= 60) return '#F59E0B'; // amber
    return '#F43F5E'; // rose
  };

  const ringColor = getScoreColor();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: ringColor,
        },
      ]}
    >
      <Text style={styles.scoreText}>{score}</Text>
      <Text style={styles.maxText}>/100</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161426',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  maxText: {
    color: '#8E8EA8',
    fontSize: 11,
    fontWeight: '700',
    marginTop: -2,
  },
});
