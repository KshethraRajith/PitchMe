import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { UserProfile } from '../types/user';

interface AuthScreenProps {
  initialMode?: 'login' | 'signup';
  onAuthSuccess: (profile: Partial<UserProfile>, isNewUser: boolean) => void;
  onBackToWelcome: () => void;
}

const CAREER_TRACKS = [
  'Software Engineer',
  'Product Manager',
  'Consulting & Strategy',
  'Data & AI',
  'Leadership & Exec',
  'General Behavioral',
];

const MOCK_GOOGLE_ACCOUNTS = [
  {
    name: 'Kshethra Rajith',
    email: 'kshethra@gmail.com',
    avatar: 'K',
    role: 'Product Engineer',
  },
  {
    name: 'Alex Johnson',
    email: 'alex.johnson@work.io',
    avatar: 'A',
    role: 'Senior Software Engineer',
  },
];

// Clean Google G Icon
const GoogleIcon = () => (
  <View style={styles.googleIconContainer}>
    <View style={styles.googleCircle}>
      <Text style={styles.googleGLetter}>G</Text>
    </View>
  </View>
);

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onAuthSuccess,
  onBackToWelcome,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('Software Engineer');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Handle standard email/pass sign-in
  const handleEmailSignIn = () => {
    setErrorMessage('');
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Please enter your password (minimum 4 characters).');
      return;
    }

    const fallbackName = email.split('@')[0];
    const formattedName =
      fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);

    onAuthSuccess(
      {
        name: formattedName,
        email: email.trim().toLowerCase(),
        avatarLetter: formattedName.charAt(0).toUpperCase(),
      },
      false
    );
  };

  // Handle sign up
  const handleEmailSignUp = () => {
    setErrorMessage('');
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    onAuthSuccess(
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        avatarLetter: name.trim().charAt(0).toUpperCase(),
      },
      true
    );
  };

  // Handle Google account selection
  const handleSelectGoogleAccount = (acc: typeof MOCK_GOOGLE_ACCOUNTS[0]) => {
    setShowGoogleModal(false);
    onAuthSuccess(
      {
        name: acc.name,
        email: acc.email,
        avatarLetter: acc.avatar,
      },
      mode === 'signup'
    );
  };

  const handleCustomGoogleSubmit = () => {
    if (!customGoogleEmail || !customGoogleEmail.includes('@')) {
      Alert.alert('Invalid Email', 'Please provide a valid Google email address.');
      return;
    }
    const cleanEmail = customGoogleEmail.trim().toLowerCase();
    const derivedName = cleanEmail.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = derivedName
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    setShowGoogleModal(false);
    onAuthSuccess(
      {
        name: formattedName,
        email: cleanEmail,
        avatarLetter: formattedName.charAt(0),
      },
      mode === 'signup'
    );
  };

  // Demo auto-fill
  const handleDemoFill = () => {
    setEmail('kshethra@pitchme.ai');
    setPassword('PitchMe2026!');
    setName('Kshethra Rajith');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header Brand */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBackToWelcome} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <View style={styles.logoRow}>
              <Image
                source={require('../../assets/logo.jpg')}
                style={styles.logoImage}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.brandTitle}>PITCHME</Text>
                <Text style={styles.brandSubtitle}>AI Voice Interview Coach</Text>
              </View>
            </View>
          </View>

          {/* Mode Switcher Tabs */}
          <View style={styles.modeTabs}>
            <TouchableOpacity
              onPress={() => {
                setMode('login');
                setErrorMessage('');
              }}
              style={[styles.tabButton, mode === 'login' && styles.tabButtonActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              style={[styles.tabButton, mode === 'signup' && styles.tabButtonActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title and Intro */}
          <View style={styles.introBox}>
            <Text style={styles.introTitle}>
              {mode === 'login' ? 'Welcome back' : 'Level up your voice'}
            </Text>
            <Text style={styles.introSubtitle}>
              {mode === 'login'
                ? 'Sign in to access your practice history and streaks'
                : 'Join thousands mastering interviews with real-time AI feedback'}
            </Text>
          </View>

          {/* Google Sign In Button */}
          <TouchableOpacity
            onPress={() => setShowGoogleModal(true)}
            style={styles.googleButton}
            activeOpacity={0.85}
          >
            <GoogleIcon />
            <Text style={styles.googleButtonText}>
              {mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
            </Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with email</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Error Banner */}
          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️  {errorMessage}</Text>
            </View>
          ) : null}

          {/* Sign Up Fields */}
          {mode === 'signup' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>FULL NAME</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Alex Morgan"
                  placeholderTextColor="#64748B"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PRIMARY INTERVIEW TRACK</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trackScroll}>
                  {CAREER_TRACKS.map((track) => (
                    <TouchableOpacity
                      key={track}
                      onPress={() => setSelectedTrack(track)}
                      style={[
                        styles.trackChip,
                        selectedTrack === track && styles.trackChipSelected,
                      ]}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.trackChipText,
                          selectedTrack === track && styles.trackChipTextSelected,
                        ]}
                      >
                        {track}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <TextInput
              style={styles.textInput}
              placeholder="name@example.com"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              {mode === 'login' && (
                <TouchableOpacity
                  onPress={() =>
                    alert('Password reset instructions will be sent to your registered email.')
                  }
                >
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.textInput, { paddingRight: 50 }]}
                placeholder={mode === 'login' ? 'Enter password' : 'Create a secure password'}
                placeholderTextColor="#64748B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeToggle}
              >
                <Text style={{ fontSize: 16 }}>{showPassword ? '👁️' : '🔒'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password in Sign Up */}
          {mode === 'signup' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Re-enter password"
                placeholderTextColor="#64748B"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>
          )}

          {/* Submit CTA */}
          <View style={{ marginTop: 24 }}>
            <PrimaryButton
              label={mode === 'login' ? 'Sign In  →' : 'Create Account  →'}
              onPress={mode === 'login' ? handleEmailSignIn : handleEmailSignUp}
            />
          </View>

          {/* Quick Demo Helper */}
          {mode === 'login' && (
            <TouchableOpacity onPress={handleDemoFill} style={styles.demoFillBtn}>
              <Text style={styles.demoFillText}>⚡ Quick Auto-Fill Demo Credentials</Text>
            </TouchableOpacity>
          )}

          {/* Guest Bypass */}
          <TouchableOpacity
            onPress={() =>
              onAuthSuccess(
                {
                  name: 'Guest Explorer',
                  email: 'guest@pitchme.ai',
                  avatarLetter: 'G',
                },
                false
              )
            }
            style={styles.guestLink}
          >
            <Text style={styles.guestLinkText}>Continue as Guest without saving history →</Text>
          </TouchableOpacity>

          {/* Privacy Note */}
          <Text style={styles.termsNote}>
            By continuing, you agree to PitchMe's Terms of Service and Privacy Policy. Voice recordings are processed securely.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Google Sign-In Selector Modal */}
      <Modal
        visible={showGoogleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGoogleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.googleModalCard}>
            <View style={styles.googleModalHeader}>
              <View style={styles.googleModalLogoRow}>
                <GoogleIcon />
                <Text style={styles.googleModalTitle}>Sign in with Google</Text>
              </View>
              <Text style={styles.googleModalSub}>
                Choose an account to continue to <Text style={{ fontWeight: '700' }}>PitchMe</Text>
              </Text>
            </View>

            <View style={styles.accountList}>
              {MOCK_GOOGLE_ACCOUNTS.map((acc, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.accountOption}
                  onPress={() => handleSelectGoogleAccount(acc)}
                  activeOpacity={0.7}
                >
                  <View style={styles.googleAvatarCircle}>
                    <Text style={styles.googleAvatarText}>{acc.avatar}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.accountOptionName}>{acc.name}</Text>
                    <Text style={styles.accountOptionEmail}>{acc.email}</Text>
                  </View>
                  <Text style={styles.accountChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Manual Google Email Input Option */}
            <View style={styles.customEmailBlock}>
              <Text style={styles.customEmailLabel}>Or enter another Google account:</Text>
              <View style={styles.customEmailRow}>
                <TextInput
                  style={styles.customEmailInput}
                  placeholder="user@gmail.com"
                  placeholderTextColor="#94A3B8"
                  value={customGoogleEmail}
                  onChangeText={setCustomGoogleEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={handleCustomGoogleSubmit}
                  style={styles.customEmailSubmit}
                >
                  <Text style={styles.customEmailSubmitText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setShowGoogleModal(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B0B14',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backButtonText: {
    color: '#9494A8',
    fontSize: 14,
    fontWeight: '600',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoImage: {
    width: 48,
    height: 48,
    borderRadius: 14,
  },
  brandTitle: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 3,
  },
  brandSubtitle: {
    color: '#9494A8',
    fontSize: 13,
    marginTop: 2,
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#161626',
    borderRadius: 14,
    padding: 4,
    marginVertical: 18,
    borderWidth: 1,
    borderColor: '#26263E',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  tabText: {
    color: '#9494A8',
    fontSize: 14,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  introBox: {
    marginBottom: 20,
  },
  introTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  introSubtitle: {
    color: '#9494A8',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  googleIconContainer: {
    marginRight: 12,
  },
  googleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleGLetter: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  googleButtonText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#232338',
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#A5A5C0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#161626',
    borderWidth: 1,
    borderColor: '#26263E',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeToggle: {
    position: 'absolute',
    right: 14,
    padding: 6,
  },
  trackScroll: {
    gap: 8,
    paddingVertical: 4,
  },
  trackChip: {
    backgroundColor: '#161626',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#26263E',
  },
  trackChipSelected: {
    backgroundColor: '#3B2A66',
    borderColor: '#8B5CF6',
  },
  trackChipText: {
    color: '#9494A8',
    fontSize: 13,
    fontWeight: '600',
  },
  trackChipTextSelected: {
    color: '#E0E7FF',
    fontWeight: '700',
  },
  demoFillBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  demoFillText: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '700',
  },
  guestLink: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 6,
  },
  guestLinkText: {
    color: '#71718A',
    fontSize: 13,
    fontWeight: '600',
  },
  termsNote: {
    color: '#55556E',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  // Google Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  googleModalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  googleModalHeader: {
    marginBottom: 20,
  },
  googleModalLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  googleModalTitle: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  googleModalSub: {
    color: '#4B5563',
    fontSize: 13,
    marginTop: 2,
  },
  accountList: {
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  googleAvatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  googleAvatarText: {
    color: '#4338CA',
    fontSize: 16,
    fontWeight: '800',
  },
  accountOptionName: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  accountOptionEmail: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  accountChevron: {
    fontSize: 22,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  customEmailBlock: {
    marginTop: 16,
  },
  customEmailLabel: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  customEmailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  customEmailInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#1F2937',
  },
  customEmailSubmit: {
    backgroundColor: '#1E40AF',
    borderRadius: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customEmailSubmitText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
});
