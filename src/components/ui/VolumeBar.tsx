import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';

interface VolumeBarProps {
  volume: number; // 0-1
}

export function VolumeBar({ volume }: VolumeBarProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="volume-low" size={10} color={theme.screen.text} />
      <View style={[styles.barBackground, { backgroundColor: theme.screen.text + '30' }]}>
        <View
          style={[
            styles.barFill,
            {
              backgroundColor: theme.screen.text,
              width: `${volume * 100}%`,
            },
          ]}
        />
      </View>
      <Ionicons name="volume-high" size={10} color={theme.screen.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 4,
  },
  barBackground: {
    flex: 1,
    height: 3,
    borderRadius: 1.5,
  },
  barFill: {
    height: '100%',
    borderRadius: 1.5,
  },
});
