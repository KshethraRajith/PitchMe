import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ProgressSummary } from '../types/user';

interface ProgressScreenProps {
  progress: ProgressSummary;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ progress }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>ANALYTICS</Text>
        <Text style={styles.headerTitle}>Your Progress</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heroPrompt}>
          "Am I actually getting better?"
        </Text>
        <Text style={styles.heroAnswer}>
          Yes. Your communication is measurably clearer and tighter week over week.
        </Text>

        {/* 4-Week Average Score Trend */}
        <View style={styles.trendCard}>
          <Text style={styles.cardEyebrow}>AVERAGE SCORE TRAJECTORY</Text>
          <Text style={styles.cardMainStat}>
            {progress.weeklyTrend[progress.weeklyTrend.length - 1].score}
            <Text style={styles.cardMainOutOf}> /100 current avg</Text>
          </Text>

          <View style={styles.chartBarsWrap}>
            {progress.weeklyTrend.map((item, idx) => {
              const maxScore = 100;
              const barHeightPct = (item.score / maxScore) * 100;
              const isCurrent = idx === progress.weeklyTrend.length - 1;

              return (
                <View key={item.weekLabel} style={styles.chartBarCol}>
                  <Text style={[styles.barScoreLabel, isCurrent && styles.barScoreLabelCurrent]}>
                    {item.score}
                  </Text>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { height: `${barHeightPct}%` },
                        isCurrent && styles.barFillCurrent,
                      ]}
                    />
                  </View>
                  <Text style={[styles.barWeekLabel, isCurrent && styles.barWeekLabelCurrent]}>
                    {item.weekLabel}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Highlight Stat Banner */}
        <View style={styles.highlightBanner}>
          <Text style={styles.highlightEmoji}>📈</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.highlightTitle}>MONTHLY MILESTONE</Text>
            <Text style={styles.highlightText}>{progress.highlightStat}</Text>
          </View>
        </View>

        {/* Strengths & Focus Area Cards */}
        <View style={styles.twoColumnRow}>
          <View style={[styles.metricTile, styles.strengthTile]}>
            <Text style={styles.tileEyebrow}>TOP STRENGTH</Text>
            <Text style={styles.tileName}>{progress.topStrength.name}</Text>
            <Text style={styles.tileScoreGreen}>{progress.topStrength.score}</Text>
            <Text style={styles.tileDesc}>Clear narrative flow & key results</Text>
          </View>

          <View style={[styles.metricTile, styles.focusTile]}>
            <Text style={styles.tileEyebrow}>FOCUS AREA</Text>
            <Text style={styles.tileName}>{progress.focusArea.name}</Text>
            <Text style={styles.tileScoreAmber}>{progress.focusArea.score}</Text>
            <Text style={styles.tileDesc}>Trim background story by ~15s</Text>
          </View>
        </View>

        {/* Category Performance Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.cardEyebrow}>PERFORMANCE BY DOMAIN</Text>

          {[
            { name: 'Job Interview', score: 87, count: '4 sessions' },
            { name: 'Technical', score: 84, count: '2 sessions' },
            { name: 'Campus Placement', score: 79, count: '2 sessions' },
          ].map((cat) => (
            <View key={cat.name} style={styles.catRow}>
              <View>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catCount}>{cat.count}</Text>
              </View>
              <View style={styles.catScoreBadge}>
                <Text style={styles.catScore}>{cat.score}</Text>
              </View>
            </View>
          ))}
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
    padding: 22,
    paddingBottom: 40,
  },
  heroPrompt: {
    color: '#DDD6FE',
    fontSize: 18,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  heroAnswer: {
    color: '#8E8EA8',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 20,
  },
  trendCard: {
    backgroundColor: '#141420',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#242436',
    marginBottom: 16,
  },
  cardEyebrow: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cardMainStat: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 6,
  },
  cardMainOutOf: {
    color: '#8E8EA8',
    fontSize: 13,
    fontWeight: '600',
  },
  chartBarsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    marginTop: 20,
    paddingTop: 10,
  },
  chartBarCol: {
    alignItems: 'center',
    flex: 1,
  },
  barScoreLabel: {
    color: '#71718A',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  barScoreLabelCurrent: {
    color: '#34D399',
    fontWeight: '800',
  },
  barTrack: {
    width: 24,
    height: 90,
    backgroundColor: '#1E1E2E',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
  },
  barFillCurrent: {
    backgroundColor: '#10B981',
  },
  barWeekLabel: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 8,
  },
  barWeekLabelCurrent: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  highlightBanner: {
    backgroundColor: '#1D1836',
    borderColor: '#6D28D9',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  highlightEmoji: {
    fontSize: 26,
  },
  highlightTitle: {
    color: '#A78BFA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  highlightText: {
    color: '#EDE9FE',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginTop: 3,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricTile: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  strengthTile: {
    backgroundColor: '#0F1E19',
    borderColor: '#065F46',
  },
  focusTile: {
    backgroundColor: '#201A18',
    borderColor: '#78350F',
  },
  tileEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#8E8EA8',
  },
  tileName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
  },
  tileScoreGreen: {
    color: '#34D399',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  tileScoreAmber: {
    color: '#FBBF24',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  tileDesc: {
    color: '#8E8EA8',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },
  breakdownCard: {
    backgroundColor: '#141420',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#242436',
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#202030',
  },
  catName: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '700',
  },
  catCount: {
    color: '#71718A',
    fontSize: 11,
    marginTop: 3,
  },
  catScoreBadge: {
    backgroundColor: '#221C3A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A3B75',
  },
  catScore: {
    color: '#C4B5FD',
    fontSize: 15,
    fontWeight: '800',
  },
});
