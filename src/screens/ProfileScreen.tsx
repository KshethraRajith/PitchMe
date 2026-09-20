import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserProfile } from '../types/user';

interface ProfileScreenProps {
  user: UserProfile;
  onOpenPaywall: () => void;
  onClearHistory: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onOpenPaywall,
  onClearHistory,
}) => {
  const handleClearConfirm = () => {
    onClearHistory();
    alert('Your voice recordings, transcripts, and session history have been deleted.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>ACCOUNT & SETTINGS</Text>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Avatar Card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>{user.avatarLetter}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          <View style={styles.statStrip}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{user.totalSessionsCompleted}</Text>
              <Text style={styles.statLbl}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: '#34D399' }]}>
                {user.bestOverallScore}
              </Text>
              <Text style={styles.statLbl}>Best Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: '#C4B5FD' }]}>
                {user.averageScore}
              </Text>
              <Text style={styles.statLbl}>Average</Text>
            </View>
          </View>
        </View>

        {/* Pro Subscription CTA */}
        <TouchableOpacity
          onPress={onOpenPaywall}
          style={styles.proBanner}
          activeOpacity={0.8}
        >
          <View style={styles.proCrownBox}>
            <Text style={{ fontSize: 20 }}>👑</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.proTitle}>PitchMe Pro</Text>
            <Text style={styles.proSubtitle}>
              Unlock unlimited sessions, technical & viva modes
            </Text>
          </View>
          <View style={styles.viewProBadge}>
            <Text style={styles.viewProText}>Upgrade</Text>
          </View>
        </TouchableOpacity>

        {/* Practice Reminders (OneSignal Integration Preview) */}
        <Text style={styles.sectionHeader}>NOTIFICATIONS & STREAKS</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingIcon}>🔔</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Smart Practice Reminders</Text>
            <Text style={styles.settingDesc}>
              Daily notifications to maintain your {user.streakDays}-day streak
            </Text>
          </View>
          <Text style={styles.activePill}>ACTIVE</Text>
        </View>

        {/* Privacy Section */}
        <Text style={styles.sectionHeader}>PRIVACY & VOICE DATA</Text>
        <View style={styles.privacyCard}>
          <Text style={styles.privacyHeading}>🔒  Your voice is yours</Text>
          <Text style={styles.privacyText}>
            Audio is processed locally for coaching and never shared or sold to third parties.
            You have complete control over your recordings.
          </Text>

          <TouchableOpacity
            onPress={handleClearConfirm}
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>
              ⌫  Delete audio recordings & practice history
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.versionText}>PitchMe v0.1.0 · Shipaton 2026 Edition</Text>
          <Text style={styles.mottoText}>Practice your answer. Ace the conversation.</Text>
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
  avatarCard: {
    backgroundColor: '#141420',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#242436',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#271E47',
    borderWidth: 2,
    borderColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarLetter: {
    color: '#C4B5FD',
    fontSize: 28,
    fontWeight: '900',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  userEmail: {
    color: '#828296',
    fontSize: 13,
    marginTop: 3,
  },
  statStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#202030',
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  statLbl: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  proBanner: {
    backgroundColor: '#1C1734',
    borderColor: '#7C3AED',
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  proCrownBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#2E2257',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  proSubtitle: {
    color: '#A78BFA',
    fontSize: 11,
    marginTop: 3,
  },
  viewProBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  viewProText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionHeader: {
    color: '#71718A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#242436',
    gap: 14,
    marginBottom: 24,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  settingDesc: {
    color: '#828296',
    fontSize: 11,
    marginTop: 3,
  },
  activePill: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: '#0F261E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#065F46',
  },
  privacyCard: {
    backgroundColor: '#141420',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#242436',
    marginBottom: 24,
  },
  privacyHeading: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  privacyText: {
    color: '#8E8EA8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  deleteButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7F1D1D',
    backgroundColor: '#261217',
    borderRadius: 12,
  },
  deleteButtonText: {
    color: '#FDA4AF',
    fontSize: 12,
    fontWeight: '700',
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 8,
  },
  versionText: {
    color: '#55556E',
    fontSize: 11,
    fontWeight: '600',
  },
  mottoText: {
    color: '#71718A',
    fontSize: 11,
    marginTop: 4,
  },
});
