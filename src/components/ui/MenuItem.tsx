import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { typography } from '@/theme/typography';

interface MenuItemProps {
  label: string;
  value?: string;
  isSelected: boolean;
  hasChildren?: boolean;
}

export function MenuItem({ label, value, isSelected, hasChildren = true }: MenuItemProps) {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const bgAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: isSelected ? 1 : 0,
      duration: 120,
      useNativeDriver: false,
    }).start();
  }, [isSelected, bgAnim]);

  if (uiStyle === 'modern') {
    const m = theme.modern;
    return (
      <View style={[styles.modernContainer, isSelected && { backgroundColor: m.accent + '18' }]}>
        <View style={styles.modernLeft}>
          <Text
            style={[
              styles.modernLabel,
              { color: isSelected ? m.accent : m.text },
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
        <View style={styles.modernRight}>
          {value && (
            <Text style={[styles.modernValue, { color: m.secondaryText }]} numberOfLines={1}>
              {value}
            </Text>
          )}
          {hasChildren && (
            <Ionicons name="chevron-forward" size={14} color={m.secondaryText} />
          )}
        </View>
      </View>
    );
  }

  // Classic style
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
          <Text style={[typography.menuItem, styles.value, { color: textColor }]} numberOfLines={1}>
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
  // Classic
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
  // Modern
  modernContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 34,
    borderRadius: 8,
    marginHorizontal: 6,
    marginVertical: 1,
  },
  modernLeft: {
    flex: 1,
    marginRight: 8,
  },
  modernLabel: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  modernRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modernValue: {
    fontSize: 13,
  },
});
