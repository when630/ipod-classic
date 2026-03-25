import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { MenuItem } from '@/components/ui/MenuItem';
import { ScrollableList } from '@/components/ui/ScrollableList';
import { useTheme } from '@/theme/ThemeContext';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { dimensions } from '@/theme/dimensions';

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  type: 'movie' | 'music_video' | 'tv_show';
}

export const MOCK_MOVIES: VideoItem[] = [
  { id: 'v1', title: 'The iPod Story', duration: '1:32:00', type: 'movie' },
  { id: 'v2', title: 'Silicon Dreams', duration: '2:01:00', type: 'movie' },
  { id: 'v3', title: 'Byte by Byte', duration: '1:48:00', type: 'movie' },
  { id: 'v4', title: 'Digital Revolution', duration: '1:55:00', type: 'movie' },
];

export const MOCK_MUSIC_VIDEOS: VideoItem[] = [
  { id: 'mv1', title: 'Bohemian Rhapsody - Queen', duration: '5:55', type: 'music_video' },
  { id: 'mv2', title: 'Stairway to Heaven - Led Zeppelin', duration: '8:02', type: 'music_video' },
  { id: 'mv3', title: 'Smells Like Teen Spirit - Nirvana', duration: '5:01', type: 'music_video' },
  { id: 'mv4', title: 'Get Lucky - Daft Punk', duration: '6:09', type: 'music_video' },
  { id: 'mv5', title: 'Do I Wanna Know? - Arctic Monkeys', duration: '4:32', type: 'music_video' },
];

export const MOCK_TV_SHOWS: VideoItem[] = [
  { id: 'tv1', title: 'Tech Talks S01E01', duration: '42:00', type: 'tv_show' },
  { id: 'tv2', title: 'Tech Talks S01E02', duration: '45:00', type: 'tv_show' },
  { id: 'tv3', title: 'Design Lab S01E01', duration: '38:00', type: 'tv_show' },
  { id: 'tv4', title: 'Design Lab S01E02', duration: '41:00', type: 'tv_show' },
  { id: 'tv5', title: 'Code Stories S01E01', duration: '50:00', type: 'tv_show' },
];

const ITEM_HEIGHT = 26;

interface VideoListScreenProps {
  title: string;
  videos: VideoItem[];
  selectedIndex: number;
}

export function VideoListScreen({ title, videos, selectedIndex }: VideoListScreenProps) {
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
        {videos.map((video, index) => (
          <MenuItem
            key={video.id}
            label={video.title}
            value={video.duration}
            isSelected={index === selectedIndex}
            hasChildren={false}
          />
        ))}
      </ScrollableList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
});
