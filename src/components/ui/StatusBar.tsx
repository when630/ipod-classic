import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { typography } from '@/theme/typography';

interface StatusBarProps {
  title: string;
  isPlaying?: boolean;
  batteryLevel?: number;
}

export function IPodStatusBar({ title, isPlaying = false, batteryLevel = 100 }: StatusBarProps) {
  const { theme } = useTheme();

  const batteryIcon =
    batteryLevel > 75 ? 'battery-full' :
    batteryLevel > 50 ? 'battery-three-quarters' as 'battery-full' :
    batteryLevel > 25 ? 'battery-half' :
    'battery-dead';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.screen.statusBar },
      ]}
    >
      <View style={styles.left}>
        {isPlaying && (
          <Ionicons name="play" size={8} color={theme.screen.statusBarText} />
        )}
      </View>
      <Text
        style={[styles.title, { color: theme.screen.statusBarText }]}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View style={styles.right}>
        <Ionicons name={batteryIcon} size={14} color={theme.screen.statusBarText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    height: 18,
  },
  left: {
    width: 14,
    alignItems: 'flex-start',
  },
  title: {
    ...typography.statusBar,
    flex: 1,
    textAlign: 'center',
  },
  right: {
    width: 20,
    alignItems: 'flex-end',
  },
});
