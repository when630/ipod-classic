import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

export function StopwatchScreen() {
  const { theme } = useTheme();
  const uiStyle = useUIStore((s) => s.uiStyle);
  const isPlayingMusic = usePlayerStore((s) => s.isPlaying);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const isModern = uiStyle === 'modern';
  const m = theme.modern;

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => setElapsed(Date.now() - startTimeRef.current), 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  useEffect(() => {
    (globalThis as any).__stopwatch = {
      toggle: () => setRunning((r) => !r),
      lapOrReset: () => {
        if (running) setLaps((prev) => [elapsed, ...prev]);
        else { setElapsed(0); setLaps([]); }
      },
    };
    return () => { delete (globalThis as any).__stopwatch; };
  }, [running, elapsed]);

  const formatMs = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const cents = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${cents.toString().padStart(2, '0')}`;
  };

  const bg = isModern ? m.background : theme.screen.background;
  const textColor = isModern ? m.text : theme.screen.text;
  const subColor = isModern ? m.secondaryText : theme.screen.text;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <IPodStatusBar title="Stopwatch" isPlaying={isPlayingMusic} />
      {!isModern && <View style={styles.divider} />}
      <View style={styles.content}>
        <Ionicons
          name={running ? 'pause-circle-outline' : 'play-circle-outline'}
          size={20}
          color={isModern ? m.accent + '60' : textColor + '40'}
        />
        <Text style={[styles.time, { color: textColor }, isModern && { fontWeight: '200', fontSize: 32 }]}>
          {formatMs(elapsed)}
        </Text>
        <Text style={[styles.hint, { color: subColor }]}>
          {running ? 'Play/Pause: stop  |  Select: lap' : elapsed > 0 ? 'Play/Pause: start  |  Select: reset' : 'Play/Pause: start'}
        </Text>
        {laps.length > 0 && (
          <View style={styles.laps}>
            {laps.slice(0, 4).map((lap, i) => (
              <View key={i} style={[styles.lapRow, isModern && { backgroundColor: m.groupedBackground, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }]}>
                <Text style={[styles.lapLabel, { color: subColor }]}>Lap {laps.length - i}</Text>
                <Text style={[styles.lapTime, { color: textColor }]}>{formatMs(lap)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  time: { fontSize: 28, fontWeight: '300', fontVariant: ['tabular-nums'] },
  hint: { fontSize: 8, opacity: 0.4, textAlign: 'center' },
  laps: { width: '100%', paddingHorizontal: 12, marginTop: 4, gap: 2 },
  lapRow: { flexDirection: 'row', justifyContent: 'space-between' },
  lapLabel: { fontSize: 10, opacity: 0.6 },
  lapTime: { fontSize: 10, fontVariant: ['tabular-nums'] },
});
