import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { formatTime } from '@/utils/formatTime';

interface ProgressBarProps {
  position: number;
  duration: number;
}

export function ProgressBar({ position, duration }: ProgressBarProps) {
  const { theme } = useTheme();
  const progress = duration > 0 ? Math.min(position / duration, 1) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.barRow}>
        <View style={[styles.barBackground, { backgroundColor: theme.screen.text + '30' }]}>
          <View
            style={[
              styles.barFill,
              {
                backgroundColor: theme.screen.text,
                width: `${progress * 100}%`,
              },
            ]}
          />
          {/* Diamond scrubber */}
          <View
            style={[
              styles.scrubber,
              {
                left: `${progress * 100}%`,
                backgroundColor: theme.screen.text,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.timeRow}>
        <Text style={[styles.time, { color: theme.screen.text }]}>
          {formatTime(position)}
        </Text>
        <Text style={[styles.time, { color: theme.screen.text }]}>
          -{formatTime(Math.max(0, duration - position))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  barRow: {
    height: 12,
    justifyContent: 'center',
  },
  barBackground: {
    height: 3,
    borderRadius: 1.5,
    overflow: 'visible',
  },
  barFill: {
    height: '100%',
    borderRadius: 1.5,
  },
  scrubber: {
    position: 'absolute',
    top: -3,
    marginLeft: -4,
    width: 7,
    height: 7,
    transform: [{ rotate: '45deg' }],
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  time: {
    fontSize: 9,
  },
});
