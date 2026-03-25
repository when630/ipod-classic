import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CoverFlowItemProps {
  title: string;
  artistName: string;
  index: number;
  size: number;
}

// Generate a deterministic color from album title
function albumColor(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 45%, 40%)`;
}

export function CoverFlowItem({ title, artistName, index, size }: CoverFlowItemProps) {
  const bgColor = albumColor(title + index);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.cover, { backgroundColor: bgColor }]}>
        <Ionicons name="musical-notes" size={size * 0.3} color="rgba(255,255,255,0.3)" />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artistName}
        </Text>
      </View>
      {/* Reflection */}
      <View style={[styles.reflection, { backgroundColor: bgColor, height: size * 0.3 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  artist: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 7,
    textAlign: 'center',
    marginTop: 1,
  },
  reflection: {
    width: '100%',
    opacity: 0.15,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    transform: [{ scaleY: -1 }],
    marginTop: -1,
  },
});
