import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CoverFlowItem } from '@/components/coverflow/CoverFlowItem';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { dimensions } from '@/theme/dimensions';

interface CoverFlowScreenProps {
  selectedIndex: number;
}

const COVER_SIZE = 80;
const SIDE_COVER_SIZE = 55;
const SIDE_OFFSET = 68;
const FAR_OFFSET = 108;
const ROTATE_Y = 60;
const VISIBLE_RANGE = 2;

const centerX = dimensions.lcd.width / 2;
const centerY = dimensions.lcd.height * 0.35;

export function CoverFlowScreen({ selectedIndex }: CoverFlowScreenProps) {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const albums = useLibraryStore((s) => s.albums);
  const isModern = uiStyle === 'modern';
  const m = theme.modern;
  const animValue = useRef(new Animated.Value(selectedIndex)).current;

  useEffect(() => {
    Animated.spring(animValue, {
      toValue: selectedIndex,
      useNativeDriver: true,
      damping: 18,
      stiffness: 180,
      mass: 0.6,
    }).start();
  }, [selectedIndex, animValue]);

  if (albums.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: isModern ? m.background : '#1A1A1A' }]}>
        <Text style={[styles.emptyText, { color: isModern ? m.secondaryText : '#FFF' }]}>No albums</Text>
      </View>
    );
  }

  // Render a wider range so items animate in/out
  const indices: number[] = [];
  for (let i = selectedIndex - VISIBLE_RANGE - 1; i <= selectedIndex + VISIBLE_RANGE + 1; i++) {
    if (i >= 0 && i < albums.length) indices.push(i);
  }

  const centerAlbum = albums[selectedIndex];

  return (
    <View style={[styles.container, { backgroundColor: isModern ? m.background : '#1A1A1A' }]}>
      <View style={styles.carousel}>
        {indices.map((i) => {
          // offset relative to animated center
          const offset = Animated.subtract(i, animValue);

          const translateX = offset.interpolate({
            inputRange: [-2, -1, 0, 1, 2],
            outputRange: [-FAR_OFFSET, -SIDE_OFFSET, 0, SIDE_OFFSET, FAR_OFFSET],
            extrapolate: 'clamp',
          });

          const rotateY = offset.interpolate({
            inputRange: [-2, -1, 0, 1, 2],
            outputRange: [`${ROTATE_Y}deg`, `${ROTATE_Y}deg`, '0deg', `-${ROTATE_Y}deg`, `-${ROTATE_Y}deg`],
            extrapolate: 'clamp',
          });

          const scale = offset.interpolate({
            inputRange: [-2, -1, 0, 1, 2],
            outputRange: [0.6, 0.75, 1, 0.75, 0.6],
            extrapolate: 'clamp',
          });

          const opacity = offset.interpolate({
            inputRange: [-3, -2, -1, 0, 1, 2, 3],
            outputRange: [0, 0.5, 0.9, 1, 0.9, 0.5, 0],
            extrapolate: 'clamp',
          });

          // z-ordering via translateZ doesn't work on RN, use static zIndex
          const staticOffset = i - selectedIndex;
          const zIndex = 10 - Math.abs(staticOffset);

          return (
            <Animated.View
              key={albums[i].id}
              style={[
                styles.coverWrapper,
                {
                  zIndex,
                  opacity,
                  transform: [
                    { translateX },
                    { perspective: 400 },
                    { rotateY },
                    { scale },
                  ],
                  left: centerX - COVER_SIZE / 2,
                  top: centerY - COVER_SIZE / 2,
                },
              ]}
            >
              <CoverFlowItem
                title={albums[i].title}
                artistName={albums[i].artistName}
                index={i}
                size={COVER_SIZE}
              />
            </Animated.View>
          );
        })}
      </View>

      {centerAlbum && (
        <View style={styles.info}>
          <Text style={[styles.albumTitle, { color: isModern ? m.text : '#FFF' }]} numberOfLines={1}>
            {centerAlbum.title}
          </Text>
          <Text style={[styles.albumArtist, { color: isModern ? m.secondaryText : 'rgba(255,255,255,0.6)' }]} numberOfLines={1}>
            {centerAlbum.artistName}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  carousel: { flex: 1, position: 'relative' },
  coverWrapper: { position: 'absolute' },
  info: { alignItems: 'center', paddingBottom: 8, paddingHorizontal: 10 },
  albumTitle: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  albumArtist: { fontSize: 10, textAlign: 'center', marginTop: 1 },
  emptyText: { fontSize: 12, textAlign: 'center', marginTop: 40, opacity: 0.4 },
});
