import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';

interface VolumeBarProps {
  volume: number;
}

export function VolumeBar({ volume }: VolumeBarProps) {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const animVolume = useRef(new Animated.Value(volume)).current;

  useEffect(() => {
    Animated.spring(animVolume, {
      toValue: volume,
      useNativeDriver: false,
      damping: 15,
      stiffness: 200,
    }).start();
  }, [volume, animVolume]);

  const fillWidth = animVolume.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  const isModern = uiStyle === 'modern';
  const m = theme.modern;
  const barColor = isModern ? m.accent : theme.screen.text;
  const barBg = isModern ? m.separator : theme.screen.text + '30';
  const iconColor = isModern ? m.secondaryText : theme.screen.text;

  return (
    <View style={styles.container}>
      <Ionicons name="volume-low" size={isModern ? 12 : 10} color={iconColor} />
      <View style={[styles.barBackground, { backgroundColor: barBg }, isModern && { height: 4, borderRadius: 2 }]}>
        <Animated.View style={[styles.barFill, { backgroundColor: barColor, width: fillWidth }, isModern && { borderRadius: 2 }]} />
      </View>
      <Ionicons name="volume-high" size={isModern ? 12 : 10} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, gap: 4 },
  barBackground: { flex: 1, height: 3, borderRadius: 1.5 },
  barFill: { height: '100%', borderRadius: 1.5 },
});
