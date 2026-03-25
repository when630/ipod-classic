import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { typography } from '@/theme/typography';

interface MenuItemProps {
  label: string;
  value?: string;
  isSelected: boolean;
  hasChildren?: boolean;
}

export function MenuItem({ label, value, isSelected, hasChildren = true }: MenuItemProps) {
  const { theme } = useTheme();
  const bgAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: isSelected ? 1 : 0,
      duration: 120,
      useNativeDriver: false,
    }).start();
  }, [isSelected, bgAnim]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', theme.screen.highlight],
  });

  const textColor = isSelected ? theme.screen.highlightText : theme.screen.text;

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text
        style={[
          isSelected ? typography.menuItemSelected : typography.menuItem,
          { color: textColor },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Animated.View style={styles.right}>
        {value && (
          <Text
            style={[typography.menuItem, styles.value, { color: textColor }]}
            numberOfLines={1}
          >
            {value}
          </Text>
        )}
        {hasChildren && (
          <Ionicons name="chevron-forward" size={12} color={textColor} style={{ opacity: 0.6 }} />
        )}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 5,
    minHeight: 26,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    opacity: 0.7,
    fontSize: 12,
  },
});
