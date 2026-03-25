import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { usePlayerStore } from '@/stores/usePlayerStore';

export function ClockScreen() {
  const { theme } = useTheme();
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <IPodStatusBar title="Clock" isPlaying={isPlaying} />
      <View style={styles.divider} />
      <View style={styles.content}>
        <Ionicons name="time-outline" size={28} color={theme.screen.text + '30'} />
        <View style={styles.timeRow}>
          <Text style={[styles.time, { color: theme.screen.text }]}>
            {h12}:{minutes.toString().padStart(2, '0')}
          </Text>
          <View style={styles.secCol}>
            <Text style={[styles.seconds, { color: theme.screen.text }]}>
              :{seconds.toString().padStart(2, '0')}
            </Text>
            <Text style={[styles.ampm, { color: theme.screen.text }]}>{ampm}</Text>
          </View>
        </View>
        <Text style={[styles.date, { color: theme.screen.text }]}>{dateStr}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  timeRow: { flexDirection: 'row', alignItems: 'flex-end' },
  time: { fontSize: 36, fontWeight: '300', letterSpacing: -1 },
  secCol: { marginBottom: 4, marginLeft: 1 },
  seconds: { fontSize: 14, fontWeight: '300' },
  ampm: { fontSize: 9, fontWeight: '600', textAlign: 'center' },
  date: { fontSize: 11, opacity: 0.6 },
});
