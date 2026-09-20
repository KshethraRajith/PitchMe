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
import { CompletedSessionSummary } from '../types/user';

interface HistoryScreenProps {
  sessions: CompletedSessionSummary[];
  streakDays: number;
  bestScore: number;
  onOpenSession: (session: CompletedSessionSummary) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  sessions,
  streakDays,
  bestScore,
  onOpenSession,
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>RECORDINGS & EVALUATIONS</Text>
        <Text style={styles.headerTitle}>Practice History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Summary Banner */}
        <View style={styles.statsRow}>
          <View style={styles.statTile}>
            <Text style={styles.statNumber}>{streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak 🔥</Text>
          </View>
          <View style={styles.statTile}>
            <Text style={[styles.statNumber, { color: '#34D399' }]}>{bestScore}</Text>
            <Text style={styles.statLabel}>Personal Best</Text>
          </View>
          <View style={styles.statTile}>
            <Text style={[styles.statNumber, { color: '#C4B5FD' }]}>
              {sessions.length}
            </Text>
            <Text style={styles.statLabel}>Saved Sessions</Text>
          </View>
        </View>

        <Text style={styles.subHeading}>COMPLETED SESSIONS</Text>

        {sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            onPress={() => onOpenSession(session)}
            style={styles.sessionCard}
            activeOpacity={0.75}
          >
            <View style={styles.dotIconBox}>
              <Text style={{ fontSize: 16 }}>✦</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.sessionTitle} numberOfLines={2}>
                {session.title}
              </Text>
              <Text style={styles.sessionMeta}>
                {session.interviewType} · {session.dateLabel} · {session.attemptsCount} attempts
              </Text>
            </View>

            <View style={styles.scoreCol}>
              <Text style={styles.scoreText}>{session.score}</Text>
              <Text style={styles.scoreOutOf}>/100</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 26,
  },
  statTile: {
    flex: 1,
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#242436',
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: '#8E8EA8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  subHeading: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#242436',
    gap: 14,
  },
  dotIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#231B45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionTitle: {
    color: '#F1F1F5',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  sessionMeta: {
    color: '#7E7E94',
    fontSize: 11,
    marginTop: 4,
  },
  scoreCol: {
    alignItems: 'flex-end',
  },
  scoreText: {
    color: '#C4B5FD',
    fontSize: 18,
    fontWeight: '900',
  },
  scoreOutOf: {
    color: '#65657A',
    fontSize: 10,
    fontWeight: '700',
  },
});
