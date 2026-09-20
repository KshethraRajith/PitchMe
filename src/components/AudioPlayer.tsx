import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AudioService } from '../services/audioService';

interface AudioPlayerProps {
  audioUri: string | null;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!audioUri) return null;

  const handleTogglePlayback = async () => {
    if (isPlaying) {
      await AudioService.stopSound();
      setIsPlaying(false);
      return;
    }

    setErrorMsg(null);
    setIsPlaying(true);

    const { sound, error } = await AudioService.playSound(audioUri, (status) => {
      if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false);
      }
    });

    if (error || !sound) {
      setIsPlaying(false);
      setErrorMsg(error || 'Failed to play recorded answer.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleTogglePlayback}
        style={[styles.button, isPlaying && styles.buttonActive]}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? '⏸  Pause playback' : '▶  Replay your answer'}
        </Text>
      </TouchableOpacity>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#1C192E',
    borderWidth: 1,
    borderColor: '#3D3558',
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#261F42',
  },
  buttonText: {
    color: '#DDD6FE',
    fontSize: 14,
    fontWeight: '700',
  },
  error: {
    color: '#FDA4AF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});
