import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

export function ClockScreen() {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const [now, setNow] = useState(new Date());
  const isModern = uiStyle === 'modern';
  const m = theme.modern;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const bg = isModern ? m.background : theme.screen.background;
  const textColor = isModern ? m.text : theme.screen.text;
  const subColor = isModern ? m.secondaryText : theme.screen.text;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <IPodStatusBar title="Clock" isPlaying={isPlaying} />
      {!isModern && <View style={styles.divider} />}
      <View style={styles.content}>
        <Ionicons name="time-outline" size={isModern ? 24 : 28} color={isModern ? m.accent + '40' : textColor + '30'} />
        <View style={styles.timeRow}>
          <Text style={[styles.time, { color: textColor }, isModern && { fontWeight: '200', fontSize: 40 }]}>
            {h12}:{minutes.toString().padStart(2, '0')}
          </Text>
          <View style={styles.secCol}>
            <Text style={[styles.seconds, { color: subColor }]}>:{seconds.toString().padStart(2, '0')}</Text>
            <Text style={[styles.ampm, { color: subColor }]}>{ampm}</Text>
          </View>
        </View>
        <Text style={[styles.date, { color: subColor }]}>{dateStr}</Text>
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
