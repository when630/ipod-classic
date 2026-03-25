import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { MenuItem } from '@/components/ui/MenuItem';
import { ScrollableList } from '@/components/ui/ScrollableList';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { dimensions } from '@/theme/dimensions';
import { usePlayerStore } from '@/stores/usePlayerStore';

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

const CLASSIC_ITEM_HEIGHT = 26;
const MODERN_ITEM_HEIGHT = 36;

export function MenuScreen({ title, items, selectedIndex, onSelect }: MenuScreenProps) {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  const isModern = uiStyle === 'modern';
  const itemHeight = isModern ? MODERN_ITEM_HEIGHT : CLASSIC_ITEM_HEIGHT;
  const statusBarHeight = isModern ? 22 : 18;
  const bg = isModern ? theme.modern.background : theme.screen.background;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <IPodStatusBar title={title} isPlaying={isPlaying} />
      {!isModern && <View style={styles.divider} />}
      {isModern && <View style={{ height: 2 }} />}
      <ScrollableList
        selectedIndex={selectedIndex}
        itemHeight={itemHeight}
        visibleItems={Math.floor((dimensions.lcd.height - statusBarHeight - 2) / itemHeight)}
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

export const MAIN_MENU_ITEMS: MenuItemData[] = [
  { id: 'music', label: 'Music' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'extras', label: 'Extras' },
  { id: 'settings', label: 'Settings' },
  { id: 'shuffle', label: 'Shuffle Songs', hasChildren: false },
  { id: 'now_playing', label: 'Now Playing' },
];
