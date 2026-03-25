import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IPodStatusBar } from '@/components/ui/StatusBar';
import { useTheme } from '@/theme/ThemeContext';
import { usePlayerStore } from '@/stores/usePlayerStore';

const GRID = 10;
const CELL = 12;

type Pos = { x: number; y: number };
type Dir = 'up' | 'down' | 'left' | 'right';

function randomPos(exclude: Pos[]): Pos {
  let pos: Pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (exclude.some((p) => p.x === pos.x && p.y === pos.y));
  return pos;
}

/**
 * Simple snake game controlled by click wheel:
 * - Scroll up/down = change direction
 * - Forward/Back = change direction
 * - Play/Pause = pause/resume
 * - Select = restart when game over
 *
 * Direction mapping exposed via globalThis.__snake
 */
export function GamesScreen() {
  const { theme } = useTheme();
  const isPlayingMusic = usePlayerStore((s) => s.isPlaying);
  const [snake, setSnake] = useState<Pos[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Pos>({ x: 3, y: 3 });
  const [dir, setDir] = useState<Dir>('right');
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);

  const restart = useCallback(() => {
    setSnake([{ x: 5, y: 5 }]);
    setFood(randomPos([{ x: 5, y: 5 }]));
    setDir('right');
    setGameOver(false);
    setPaused(false);
    setScore(0);
  }, []);

  // Expose controls
  useEffect(() => {
    (globalThis as any).__snake = {
      up: () => setDir((d) => d !== 'down' ? 'up' : d),
      down: () => setDir((d) => d !== 'up' ? 'down' : d),
      left: () => setDir((d) => d !== 'right' ? 'left' : d),
      right: () => setDir((d) => d !== 'left' ? 'right' : d),
      togglePause: () => setPaused((p) => !p),
      restart,
    };
    return () => { delete (globalThis as any).__snake; };
  }, [restart]);

  // Game loop
  useEffect(() => {
    if (gameOver || paused) return;
    const timer = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const next: Pos = {
          x: dir === 'left' ? head.x - 1 : dir === 'right' ? head.x + 1 : head.x,
          y: dir === 'up' ? head.y - 1 : dir === 'down' ? head.y + 1 : head.y,
        };

        // Wall collision
        if (next.x < 0 || next.x >= GRID || next.y < 0 || next.y >= GRID) {
          setGameOver(true);
          return prev;
        }
        // Self collision
        if (prev.some((p) => p.x === next.x && p.y === next.y)) {
          setGameOver(true);
          return prev;
        }

        const ate = next.x === food.x && next.y === food.y;
        const newSnake = [next, ...prev];
        if (!ate) {
          newSnake.pop();
        } else {
          setScore((s) => s + 1);
          setFood(randomPos(newSnake));
        }
        return newSnake;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [dir, gameOver, paused, food]);

  return (
    <View style={[styles.container, { backgroundColor: theme.screen.background }]}>
      <IPodStatusBar title={`Snake  Score: ${score}`} isPlaying={isPlayingMusic} />
      <View style={styles.divider} />
      <View style={styles.content}>
        <View style={[styles.grid, { width: GRID * CELL, height: GRID * CELL, borderColor: theme.screen.text + '20' }]}>
          {/* Food */}
          <View
            style={[
              styles.cell,
              {
                left: food.x * CELL,
                top: food.y * CELL,
                width: CELL - 1,
                height: CELL - 1,
                backgroundColor: theme.screen.highlight,
                borderRadius: CELL / 2,
              },
            ]}
          />
          {/* Snake */}
          {snake.map((seg, i) => (
            <View
              key={i}
              style={[
                styles.cell,
                {
                  left: seg.x * CELL,
                  top: seg.y * CELL,
                  width: CELL - 1,
                  height: CELL - 1,
                  backgroundColor: theme.screen.text,
                  borderRadius: i === 0 ? 3 : 1,
                  opacity: i === 0 ? 1 : 0.7,
                },
              ]}
            />
          ))}
        </View>
        {gameOver && (
          <Text style={[styles.overlay, { color: theme.screen.text }]}>
            Game Over! Select to restart
          </Text>
        )}
        {paused && !gameOver && (
          <Text style={[styles.overlay, { color: theme.screen.text }]}>
            Paused
          </Text>
        )}
        <Text style={[styles.hint, { color: theme.screen.text }]}>
          Scroll/Fwd/Back: direction  |  Play: pause
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.2)' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  grid: { borderWidth: 1, position: 'relative' },
  cell: { position: 'absolute' },
  overlay: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  hint: { fontSize: 7, opacity: 0.3, textAlign: 'center' },
});
