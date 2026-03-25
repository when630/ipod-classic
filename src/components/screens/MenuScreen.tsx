import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { MenuItem } from '@/components/ui/MenuItem';
import { ScrollableList } from '@/components/ui/ScrollableList';
import { useTheme } from '@/theme/ThemeContext';
import { dimensions } from '@/theme/dimensions';
import { usePlayerStore } from '@/stores/usePlayerStore';
import type { WheelTapZone } from '@/types';

export interface MenuItemData {
  id: string;
  label: string;
  value?: string;
  hasChildren?: boolean;
}

interface MenuScreenProps {
  title: string;
  items: MenuItemData[];
  selectedIndex: number;
  onSelect?: (item: MenuItemData) => void;
}

const ITEM_HEIGHT = 26;

export function MenuScreen({ title, items, selectedIndex, onSelect }: MenuScreenProps) {
  const { theme } = useTheme();
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <IPodStatusBar title={title} isPlaying={isPlaying} />
      <View style={styles.divider} />
      <ScrollableList
        selectedIndex={selectedIndex}
        itemHeight={ITEM_HEIGHT}
        visibleItems={Math.floor((dimensions.lcd.height - 19) / ITEM_HEIGHT)}
      >
        {items.map((item, index) => (
          <MenuItem
            key={item.id}
            label={item.label}
            value={item.value}
            isSelected={index === selectedIndex}
            hasChildren={item.hasChildren ?? true}
          />
        ))}
      </ScrollableList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

// Default main menu items for Phase 1
export const MAIN_MENU_ITEMS: MenuItemData[] = [
  { id: 'music', label: 'Music' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'extras', label: 'Extras' },
  { id: 'settings', label: 'Settings' },
  { id: 'shuffle', label: 'Shuffle Songs', hasChildren: false },
  { id: 'now_playing', label: 'Now Playing' },
];
