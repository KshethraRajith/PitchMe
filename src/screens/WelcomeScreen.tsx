import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../../assets/logo.jpg')}
          style={styles.logoImage}
          resizeMode="cover"
        />

        <Text style={styles.brandTitle}>PITCHME</Text>
        <Text style={styles.tagline}>
          Practice your answer.{'\n'}Improve your pitch.{'\n'}Ace the conversation.
        </Text>

        <Text style={styles.description}>
          The personal AI voice coach that listens to your speech, analyzes your communication,
          and helps you beat your answer through measurable progress.
        </Text>

        <View style={styles.footer}>
          <PrimaryButton label="Start Practicing  →" onPress={onStart} />
          <View style={styles.privacyNote}>
            <Text style={styles.privacyText}>
              🔒  Your voice, your data. Recordings are private and controlled by you.
            </Text>
          </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 22,
    marginBottom: 20,
  },
  brandTitle: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 3,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 42,
    marginTop: 14,
  },
  description: {
    color: '#9494A8',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
    maxWidth: 320,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 30,
    gap: 16,
  },
  privacyNote: {
    paddingHorizontal: 12,
  },
  privacyText: {
    color: '#71718A',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});
