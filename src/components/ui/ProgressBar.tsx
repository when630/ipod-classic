import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { formatTime } from '@/utils/formatTime';

interface ProgressBarProps {
  position: number;
  duration: number;
}

export function ProgressBar({ position, duration }: ProgressBarProps) {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const progress = duration > 0 ? Math.min(position / duration, 1) : 0;
  const animProgress = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animProgress, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [progress, animProgress]);

  const fillWidth = animProgress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const scrubberLeft = animProgress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  const isModern = uiStyle === 'modern';
  const m = theme.modern;
  const barColor = isModern ? m.accent : theme.screen.text;
  const barBg = isModern ? m.separator : theme.screen.text + '30';
  const textColor = isModern ? m.secondaryText : theme.screen.text;

  return (
    <View style={styles.container}>
      <View style={[styles.barRow, isModern && { height: 16 }]}>
        <View style={[styles.barBackground, { backgroundColor: barBg }, isModern && { height: 4, borderRadius: 2 }]}>
          <Animated.View
            style={[styles.barFill, { backgroundColor: barColor, width: fillWidth }, isModern && { borderRadius: 2 }]}
          />
          {!isModern && (
            <Animated.View style={[styles.scrubber, { left: scrubberLeft, backgroundColor: barColor }]} />
          )}
          {isModern && (
            <Animated.View
              style={[styles.modernScrubber, { left: scrubberLeft, backgroundColor: barColor }]}
            />
          )}
        </View>
      </View>
      <View style={styles.timeRow}>
        <Text style={[styles.time, { color: textColor }, isModern && { fontSize: 10 }]}>
          {formatTime(position)}
        </Text>
        <Text style={[styles.time, { color: textColor }, isModern && { fontSize: 10 }]}>
          -{formatTime(Math.max(0, duration - position))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 10 },
  barRow: { height: 12, justifyContent: 'center' },
  barBackground: { height: 3, borderRadius: 1.5, overflow: 'visible' },
  barFill: { height: '100%', borderRadius: 1.5 },
  scrubber: {
    position: 'absolute', top: -3, marginLeft: -4,
    width: 7, height: 7, transform: [{ rotate: '45deg' }],
  },
  modernScrubber: {
    position: 'absolute', top: -3, marginLeft: -5,
    width: 10, height: 10, borderRadius: 5,
  },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 },
  time: { fontSize: 9 },
});
