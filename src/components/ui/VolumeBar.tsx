import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';

interface VolumeBarProps {
  volume: number; // 0-1
}

export function VolumeBar({ volume }: VolumeBarProps) {
  const { theme } = useTheme();
  const animVolume = useRef(new Animated.Value(volume)).current;

  useEffect(() => {
    Animated.spring(animVolume, {
      toValue: volume,
      useNativeDriver: false,
      damping: 15,
      stiffness: 200,
    }).start();
  }, [volume, animVolume]);

  const fillWidth = animVolume.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Ionicons name="volume-low" size={10} color={theme.screen.text} />
      <View style={[styles.barBackground, { backgroundColor: theme.screen.text + '30' }]}>
        <Animated.View
          style={[styles.barFill, { backgroundColor: theme.screen.text, width: fillWidth }]}
        />
      </View>
      <Ionicons name="volume-high" size={10} color={theme.screen.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, gap: 4 },
  barBackground: { flex: 1, height: 3, borderRadius: 1.5 },
  barFill: { height: '100%', borderRadius: 1.5 },
});
