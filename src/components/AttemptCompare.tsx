import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AttemptAnalysis, Metrics } from '../types/analysis';

interface AttemptCompareProps {
  firstAttempt: AttemptAnalysis;
  latestAttempt: AttemptAnalysis;
  allAttempts?: AttemptAnalysis[];
}

export const AttemptCompare: React.FC<AttemptCompareProps> = ({
  firstAttempt,
  latestAttempt,
  allAttempts = [firstAttempt, latestAttempt],
}) => {
  const scoreDelta = latestAttempt.overallScore - firstAttempt.overallScore;
  const isPersonalBest = scoreDelta > 0;

  const metricKeys: (keyof Metrics)[] = [
    'relevance',
    'clarity',
    'structure',
    'conciseness',
    'delivery',
  ];

  return (
    <View style={styles.container}>
      {/* Celebration Banner */}
      {isPersonalBest && (
        <View style={styles.celebrationBanner}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.celebrationTitle}>New personal best!</Text>
            <Text style={styles.celebrationSub}>
              You improved your answer by +{scoreDelta} points.
            </Text>
          </View>
        </View>
      )}

      {/* Trajectory Score Flow */}
      <View style={styles.trajectoryCard}>
        <Text style={styles.sectionLabel}>YOUR IMPROVEMENT</Text>
        <View style={styles.scoreFlowRow}>
          {allAttempts.map((att, idx) => (
            <React.Fragment key={att.id}>
              <View style={styles.scorePill}>
                <Text style={styles.attemptPillLabel}>Attempt {att.attemptNumber}</Text>
                <Text
                  style={[
                    styles.attemptScoreText,
                    idx === allAttempts.length - 1 && styles.latestScoreText,
                  ]}
                >
                  {att.overallScore}
                </Text>
              </View>
              {idx < allAttempts.length - 1 && (
                <Text style={styles.flowArrow}>→</Text>
              )}
            </React.Fragment>
          ))}
          {scoreDelta > 0 && (
            <View style={styles.deltaBadge}>
              <Text style={styles.deltaBadgeText}>+{scoreDelta} pts</Text>
            </View>
          )}
        </View>
      </View>

      {/* Comparison Table */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnMetric}>METRIC</Text>
          <Text style={styles.columnValue}>FIRST</Text>
          <Text style={[styles.columnValue, styles.latestColumnHeader]}>NOW</Text>
          <Text style={[styles.columnValue, { width: 44 }]}>GAIN</Text>
        </View>

        {metricKeys.map((key) => {
          const firstVal = firstAttempt.metrics[key];
          const latestVal = latestAttempt.metrics[key];
          const gain = latestVal - firstVal;
          const label = key.charAt(0).toUpperCase() + key.slice(1);

          return (
            <View key={key} style={styles.tableRow}>
              <Text style={styles.columnMetric}>{label}</Text>
              <Text style={styles.columnValue}>{firstVal}</Text>
              <Text style={[styles.columnValue, styles.latestValue]}>{latestVal}</Text>
              <Text
                style={[
                  styles.columnValue,
                  { width: 44 },
                  gain >= 0 ? styles.gainPositive : styles.gainNegative,
                ]}
              >
                {gain >= 0 ? `+${gain}` : gain}
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
    marginVertical: 8,
  },
  celebrationBanner: {
    backgroundColor: '#1E1938',
    borderColor: '#7C3AED',
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  celebrationEmoji: {
    fontSize: 28,
  },
  celebrationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  celebrationSub: {
    color: '#C4B5FD',
    fontSize: 12,
    marginTop: 2,
  },
  trajectoryCard: {
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#252535',
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#8E8EA8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  scoreFlowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  scorePill: {
    alignItems: 'center',
  },
  attemptPillLabel: {
    color: '#777789',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  attemptScoreText: {
    color: '#9494A8',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
  },
  latestScoreText: {
    color: '#FFFFFF',
  },
  flowArrow: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: '900',
  },
  deltaBadge: {
    marginLeft: 'auto',
    backgroundColor: '#2A1F4D',
    borderColor: '#8B5CF6',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  deltaBadgeText: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '800',
  },
  tableCard: {
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#252535',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#28283A',
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2E',
  },
  columnMetric: {
    flex: 2,
    color: '#CBCBD8',
    fontSize: 13,
    fontWeight: '600',
  },
  columnValue: {
    width: 48,
    textAlign: 'center',
    color: '#8A8A9B',
    fontSize: 13,
    fontWeight: '700',
  },
  latestColumnHeader: {
    color: '#C4B5FD',
  },
  latestValue: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  gainPositive: {
    color: '#34D399',
    fontWeight: '800',
  },
  gainNegative: {
    color: '#F87171',
    fontWeight: '800',
  },
});
