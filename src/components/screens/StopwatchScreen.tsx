import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { usePlayerStore } from '@/stores/usePlayerStore';

/**
 * Stopwatch controlled by the click wheel:
 * - Play/Pause button = start/stop
 * - Center button = lap / reset (when stopped)
 */
export function StopwatchScreen() {
  const { theme } = useTheme();
  const isPlayingMusic = usePlayerStore((s) => s.isPlaying);
  const [elapsed, setElapsed] = useState(0); // ms
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  // Expose toggle/lap methods via global for IPodApp to call
  // We use a ref-based approach stored on the component
  useEffect(() => {
    (globalThis as any).__stopwatch = {
      toggle: () => setRunning((r) => !r),
      lapOrReset: () => {
        if (running) {
          setLaps((prev) => [elapsed, ...prev]);
        } else {
          setElapsed(0);
          setLaps([]);
        }
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

  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <IPodStatusBar title="Stopwatch" isPlaying={isPlayingMusic} />
      <View style={styles.divider} />
      <View style={styles.content}>
        <Ionicons
          name={running ? 'pause-circle-outline' : 'play-circle-outline'}
          size={20}
          color={theme.screen.text + '40'}
        />
        <Text style={[styles.time, { color: theme.screen.text }]}>
          {formatMs(elapsed)}
        </Text>
        <Text style={[styles.hint, { color: theme.screen.text }]}>
          {running ? 'Play/Pause: stop  |  Select: lap' : elapsed > 0 ? 'Play/Pause: start  |  Select: reset' : 'Play/Pause: start'}
        </Text>

        {laps.length > 0 && (
          <View style={styles.laps}>
            {laps.slice(0, 4).map((lap, i) => (
              <View key={i} style={styles.lapRow}>
                <Text style={[styles.lapLabel, { color: theme.screen.text }]}>
                  Lap {laps.length - i}
                </Text>
                <Text style={[styles.lapTime, { color: theme.screen.text }]}>
                  {formatMs(lap)}
                </Text>
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
