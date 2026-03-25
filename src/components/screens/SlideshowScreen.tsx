import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

const SLIDES = [
  { color: 'hsl(200, 50%, 50%)', label: 'Ocean Sunset' },
  { color: 'hsl(120, 45%, 45%)', label: 'Forest Trail' },
  { color: 'hsl(340, 55%, 50%)', label: 'Cherry Blossoms' },
  { color: 'hsl(45, 60%, 50%)', label: 'Golden Hour' },
  { color: 'hsl(270, 45%, 50%)', label: 'Lavender Field' },
  { color: 'hsl(15, 55%, 50%)', label: 'Autumn Leaves' },
];

export function SlideshowScreen() {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const [index, setIndex] = useState(0);
  const fadeAnim = useState(() => new Animated.Value(1))[0];
  const isModern = uiStyle === 'modern';
  const m = theme.modern;

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      ]).start();
      setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), 500);
    }, 3000);
    return () => clearInterval(timer);
  }, [fadeAnim]);

  const slide = SLIDES[index];
  const bgColor = isModern ? m.background : '#1A1A1A';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <IPodStatusBar title="Slideshow" isPlaying={isPlaying} />
      <Animated.View style={[styles.slide, { backgroundColor: slide.color, opacity: fadeAnim }, isModern && { borderRadius: 10, margin: 6 }]}>
        <Ionicons name="image" size={40} color="rgba(255,255,255,0.25)" />
        <Text style={styles.label}>{slide.label}</Text>
      </Animated.View>
      <Text style={[styles.counter, { color: isModern ? m.secondaryText : 'rgba(255,255,255,0.4)' }]}>
        {index + 1} / {SLIDES.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', margin: 4, borderRadius: 3 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 6, fontWeight: '500' },
  counter: { fontSize: 9, textAlign: 'center', paddingBottom: 4 },
});
