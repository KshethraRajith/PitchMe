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
import { LinearGradient } from 'expo-linear-gradient';
import { UserProfile, CompletedSessionSummary } from '../types/user';

interface HomeScreenProps {
  user: UserProfile;
  recentSessions: CompletedSessionSummary[];
  onStartPractice: () => void;
  onOpenSession: (session: CompletedSessionSummary) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  recentSessions,
  onStartPractice,
  onOpenSession,
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Greeting */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening, {user.name.split(' ')[0]} 👋</Text>
            <Text style={styles.subGreeting}>Ready for your next practice?</Text>
          </View>
          <View style={styles.avatarPill}>
            <Text style={styles.avatarText}>{user.avatarLetter}</Text>
          </View>
        </View>

        {/* Hero Card with Start CTA */}
        <LinearGradient
          colors={['#7C3AED', '#4F46E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroEyebrow}>VOICE COACHING</Text>
          <Text style={styles.heroTitle}>
            Step into the hot seat.{'\n'}Speak with confidence.
          </Text>
          <TouchableOpacity
            onPress={onStartPractice}
            style={styles.heroButton}
            activeOpacity={0.85}
          >
            <Text style={styles.heroButtonText}>🎤  Start Practice</Text>
          </TouchableOpacity>
          <Text style={styles.heroSparkle}>✦</Text>
        </LinearGradient>

        {/* Streak & Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.streakHeader}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View>
              <Text style={styles.streakTitle}>{user.streakDays} DAY STREAK</Text>
              <Text style={styles.streakSub}>
                You've completed {user.totalSessionsCompleted} sessions.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Best Score</Text>
              <Text style={styles.statValueEmerald}>{user.bestOverallScore}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Average Score</Text>
              <Text style={styles.statValueViolet}>{user.averageScore}</Text>
            </View>
          </View>
        </View>

        {/* Daily Mini Challenge */}
        <View style={styles.challengeBox}>
          <Text style={styles.challengeEmoji}>⚡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.challengeTitle}>Today's Focus: Conciseness</Text>
            <Text style={styles.challengeText}>
              Keep your answer between 60–75 seconds without rushing.
            </Text>
          </View>
        </View>

        {/* Recent Practice Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT PRACTICE</Text>
        </View>

        {recentSessions.slice(0, 3).map((session) => (
          <TouchableOpacity
            key={session.id}
            onPress={() => onOpenSession(session)}
            style={styles.recentCard}
            activeOpacity={0.7}
          >
            <View style={styles.recentIconBox}>
              <Text style={{ fontSize: 18 }}>🎙️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recentQuestion} numberOfLines={1}>
                {session.title}
              </Text>
              <Text style={styles.recentMeta}>
                {session.interviewType} · {session.dateLabel}
              </Text>
            </View>
            <View style={styles.recentScoreBadge}>
              <Text style={styles.recentScore}>{session.score}</Text>
              <Text style={styles.recentOutOf}>/100</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Bottom Quick Action */}
        <TouchableOpacity
          onPress={onStartPractice}
          style={styles.quickStartButton}
          activeOpacity={0.8}
        >
          <Text style={styles.quickStartText}>🎤  Start New Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B0B14',
  },
  content: {
    padding: 22,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subGreeting: {
    color: '#9494A8',
    fontSize: 13,
    marginTop: 4,
  },
  avatarPill: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#261F42',
    borderWidth: 1,
    borderColor: '#4E3E75',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#C4B5FD',
    fontSize: 16,
    fontWeight: '800',
  },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#6366F1',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 6,
  },
  heroEyebrow: {
    color: '#E0E7FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginTop: 10,
    letterSpacing: -0.5,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 18,
    marginTop: 20,
  },
  heroButtonText: {
    color: '#4338CA',
    fontSize: 14,
    fontWeight: '800',
  },
  heroSparkle: {
    position: 'absolute',
    right: 22,
    top: 22,
    color: '#E0E7FF',
    fontSize: 42,
    opacity: 0.7,
  },
  progressCard: {
    backgroundColor: '#141420',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#242436',
    marginTop: 18,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakEmoji: {
    fontSize: 26,
  },
  streakTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  streakSub: {
    color: '#8E8EA8',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#222234',
    marginVertical: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    color: '#8E8EA8',
    fontSize: 11,
    fontWeight: '600',
  },
  statValueEmerald: {
    color: '#34D399',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  statValueViolet: {
    color: '#C4B5FD',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  challengeBox: {
    backgroundColor: '#181628',
    borderRadius: 18,
    padding: 15,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#2F264C',
  },
  challengeEmoji: {
    fontSize: 22,
  },
  challengeTitle: {
    color: '#EDE9FE',
    fontSize: 13,
    fontWeight: '700',
  },
  challengeText: {
    color: '#A78BFA',
    fontSize: 11,
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222234',
    gap: 14,
  },
  recentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#201A36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentQuestion: {
    color: '#F1F1F5',
    fontSize: 14,
    fontWeight: '700',
  },
  recentMeta: {
    color: '#828296',
    fontSize: 11,
    marginTop: 3,
  },
  recentScoreBadge: {
    alignItems: 'flex-end',
  },
  recentScore: {
    color: '#C4B5FD',
    fontSize: 16,
    fontWeight: '800',
  },
  recentOutOf: {
    color: '#65657A',
    fontSize: 10,
    fontWeight: '600',
  },
  quickStartButton: {
    backgroundColor: '#1C1734',
    borderWidth: 1.5,
    borderColor: '#4A3B78',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  quickStartText: {
    color: '#DDD6FE',
    fontSize: 15,
    fontWeight: '800',
  },
});
