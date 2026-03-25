import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  const textColor = isSelected ? theme.screen.highlightText : theme.screen.text;

  return (
    <View
      style={[
        styles.container,
        isSelected && { backgroundColor: theme.screen.highlight },
      ]}
    >
      <Text
        style={[
          isSelected ? typography.menuItemSelected : typography.menuItem,
          { color: textColor },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <View style={styles.right}>
        {value && (
          <Text
            style={[
              typography.menuItem,
              styles.value,
              { color: textColor },
            ]}
            numberOfLines={1}
          >
            {value}
          </Text>
        )}
        {hasChildren && (
          <Ionicons
            name="chevron-forward"
            size={12}
            color={textColor}
            style={{ opacity: 0.6 }}
          />
        )}
      </View>
    </View>
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
