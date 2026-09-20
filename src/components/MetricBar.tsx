import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MetricBarProps {
  label: string;
  value: number;
  previousValue?: number;
  highlightColor?: string;
}

export const MetricBar: React.FC<MetricBarProps> = ({
  label,
  value,
  previousValue,
  highlightColor = '#8B5CF6',
}) => {
  const delta = previousValue !== undefined ? value - previousValue : null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          {delta !== null && delta !== 0 && (
            <Text style={[styles.delta, delta > 0 ? styles.deltaPositive : styles.deltaNegative]}>
              {delta > 0 ? `  +${delta}` : `  ${delta}`}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.min(100, Math.max(0, value))}%`,
              backgroundColor: highlightColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  label: {
    color: '#CBCBD8',
    fontSize: 13,
    fontWeight: '600',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  delta: {
    fontSize: 12,
    fontWeight: '800',
  },
  deltaPositive: {
    color: '#34D399',
  },
  deltaNegative: {
    color: '#F87171',
  },
  track: {
    height: 7,
    backgroundColor: '#201E30',
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
});
