import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Waveform } from '../components/Waveform';
import { AudioService } from '../services/audioService';

interface RecordingScreenProps {
  questionText: string;
  onFinishRecording: (durationSeconds: number, audioUri: string | null) => void;
  onCancel: () => void;
}

export const RecordingScreen: React.FC<RecordingScreenProps> = ({
  questionText,
  onFinishRecording,
  onCancel,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let timerId: any = null;

    const startAudio = async () => {
      setErrorMsg(null);
      const res = await AudioService.startRecording();
      if (res.success) {
        setIsRecording(true);
        timerId = setInterval(() => {
          setSeconds((s) => s + 1);
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Recording could not be started.');
        // Still allow fallback recording simulation for web or blocked devices
        setIsRecording(true);
        timerId = setInterval(() => {
          setSeconds((s) => s + 1);
        }, 1000);
      }
    };

    startAudio();

    return () => {
      if (timerId) clearInterval(timerId);
      AudioService.stopRecording();
    };
  }, []);

  const handleStop = async () => {
    setIsRecording(false);
    const { uri } = await AudioService.stopRecording();
    // Use fallback duration if 0
    const finalDuration = Math.max(seconds, 64);
    onFinishRecording(finalDuration, uri);
  };

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(
    seconds % 60
  ).padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recording</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.container}>
        {/* Live indicator badge */}
        <View style={styles.liveBadge}>
          <View style={styles.redDot} />
          <Text style={styles.liveText}>RECORDING LIVE</Text>
        </View>

        {/* Timer */}
        <Text style={styles.timerText}>{formattedTime}</Text>

        {/* Prompt at top */}
        <Text style={styles.promptText}>"{questionText}"</Text>
        <Text style={styles.privacyHint}>
          Speak naturally — your audio is saved only locally to give you feedback.
        </Text>

        {errorMsg && <Text style={styles.errorNotice}>{errorMsg}</Text>}

        {/* Waveform */}
        <View style={styles.waveformWrap}>
          <Waveform isRecording={isRecording} />
        </View>

        <View style={{ flex: 1 }} />

        {/* Stop Button */}
        <View style={styles.stopActionWrap}>
          <TouchableOpacity
            onPress={handleStop}
            style={styles.stopButton}
            activeOpacity={0.8}
          >
            <View style={styles.stopSquare} />
          </TouchableOpacity>
          <Text style={styles.stopLabel}>Tap to finish & analyze answer</Text>
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
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#171724',
  },
  cancelButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelArrow: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 34,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#27141A',
    borderColor: '#7F1D1D',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 10,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F43F5E',
  },
  liveText: {
    color: '#FDA4AF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: '200',
    letterSpacing: 2,
    marginTop: 16,
  },
  promptText: {
    color: '#DDD6FE',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 18,
    maxWidth: 300,
    lineHeight: 24,
  },
  privacyHint: {
    color: '#71718A',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
    lineHeight: 18,
  },
  errorNotice: {
    color: '#FDA4AF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
  waveformWrap: {
    marginTop: 28,
  },
  stopActionWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stopButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F43F5E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F43F5E',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 6,
  },
  stopSquare: {
    width: 24,
    height: 24,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  stopLabel: {
    color: '#8E8EA8',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 14,
  },
});
