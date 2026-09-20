import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface WaveformProps {
  isRecording: boolean;
  barColor?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  isRecording,
  barColor = '#A78BFA',
}) => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 10);
    }, 120);
    return () => clearInterval(interval);
  }, [isRecording]);

  const baseHeights = [18, 38, 54, 82, 46, 96, 62, 40, 78, 52, 90, 56, 32, 68, 44];

  return (
    <View style={styles.container}>
      {baseHeights.map((base, idx) => {
        const offset = Math.sin((pulseIndex + idx) * 0.7) * 22;
        const dynamicHeight = isRecording
          ? Math.max(12, Math.min(100, base + offset))
          : 8;

        return (
          <View
            key={idx}
            style={[
              styles.bar,
              {
                height: dynamicHeight,
                backgroundColor: barColor,
                opacity: isRecording ? 0.65 + ((idx + pulseIndex) % 4) * 0.1 : 0.25,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  bar: {
    width: 4,
    borderRadius: 4,
  },
});
