import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CoverFlowItem } from '@/components/coverflow/CoverFlowItem';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { useTheme } from '@/theme/ThemeContext';
import { dimensions } from '@/theme/dimensions';

interface CoverFlowScreenProps {
  selectedIndex: number;
}

const COVER_SIZE = 80;
const SIDE_COVER_SIZE = 55;
const SIDE_OFFSET = 68;
const FAR_OFFSET = 108;
const ROTATE_Y = 60;

export function CoverFlowScreen({ selectedIndex }: CoverFlowScreenProps) {
  const { theme } = useTheme();
  const albums = useLibraryStore((s) => s.albums);
  const centerAlbum = albums[selectedIndex];

  if (albums.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: '#1A1A1A' }]}>
        <Text style={styles.emptyText}>No albums</Text>
      </View>
    );
  }

  // Show up to 2 albums on each side + center
  const indices = [];
  for (let i = selectedIndex - 2; i <= selectedIndex + 2; i++) {
    if (i >= 0 && i < albums.length) {
      indices.push(i);
    }
  }

  const centerX = dimensions.lcd.width / 2;
  const centerY = dimensions.lcd.height * 0.35;

  return (
    <View style={[styles.container, { backgroundColor: '#1A1A1A' }]}>
      {/* Album covers */}
      <View style={styles.carousel}>
        {indices.map((i) => {
          const offset = i - selectedIndex;
          const isCenter = offset === 0;
          const isFar = Math.abs(offset) === 2;
          const size = isCenter ? COVER_SIZE : SIDE_COVER_SIZE;

          let translateX = 0;
          let rotateY = '0deg';
          let zIndex = 0;
          let opacity = 1;

          if (offset === 0) {
            zIndex = 10;
          } else if (offset === -1) {
            translateX = -SIDE_OFFSET;
            rotateY = `${ROTATE_Y}deg`;
            zIndex = 5;
          } else if (offset === 1) {
            translateX = SIDE_OFFSET;
            rotateY = `-${ROTATE_Y}deg`;
            zIndex = 5;
          } else if (offset === -2) {
            translateX = -FAR_OFFSET;
            rotateY = `${ROTATE_Y}deg`;
            zIndex = 1;
            opacity = 0.5;
          } else if (offset === 2) {
            translateX = FAR_OFFSET;
            rotateY = `-${ROTATE_Y}deg`;
            zIndex = 1;
            opacity = 0.5;
          }

          return (
            <View
              key={albums[i].id}
              style={[
                styles.coverWrapper,
                {
                  zIndex,
                  opacity,
                  transform: [
                    { translateX },
                    { perspective: 300 },
                    { rotateY },
                  ],
                  left: centerX - size / 2,
                  top: centerY - size / 2,
                },
              ]}
            >
              <CoverFlowItem
                title={albums[i].title}
                artistName={albums[i].artistName}
                index={i}
                size={size}
              />
            </View>
          );
        })}
      </View>

      {/* Album info at bottom */}
      {centerAlbum && (
        <View style={styles.info}>
          <Text style={styles.albumTitle} numberOfLines={1}>
            {centerAlbum.title}
          </Text>
          <Text style={styles.albumArtist} numberOfLines={1}>
            {centerAlbum.artistName}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    flex: 1,
    position: 'relative',
  },
  coverWrapper: {
    position: 'absolute',
  },
  info: {
    alignItems: 'center',
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  albumTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  albumArtist: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 1,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 40,
  },
});
