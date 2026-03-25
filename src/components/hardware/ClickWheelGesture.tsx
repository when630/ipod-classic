import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { dimensions, wheelGesture } from '@/theme/dimensions';
import { getAngle, getDistance, angleDelta, getTapZone, degToRad } from '@/utils/angle';
import { tickHaptic, selectHaptic } from '@/utils/haptics';
import type { WheelTapZone } from '@/types';

interface ClickWheelGestureProps {
  onScroll?: (direction: 'up' | 'down') => void;
  onTap?: (zone: WheelTapZone) => void;
  onHold?: (zone: WheelTapZone) => void;
}

export function ClickWheelGesture({ onScroll, onTap, onHold }: ClickWheelGestureProps) {
  const { wheel, ipod } = dimensions;
  const canvasSize = wheel.diameter + 20;
  const cx = canvasSize / 2;
  const cy = canvasSize / 2;

  const tickThreshold = degToRad(wheelGesture.tickThresholdDegrees);

  const previousAngle = useSharedValue(0);
  const accumulatedAngle = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  // Track whether any scroll ticks fired during this gesture
  const didScroll = useSharedValue(false);

  const emitScrollUp = useCallback(() => {
    tickHaptic();
    onScroll?.('up');
  }, [onScroll]);

  const emitScrollDown = useCallback(() => {
    tickHaptic();
    onScroll?.('down');
  }, [onScroll]);

  const emitTap = useCallback((zone: WheelTapZone) => {
    selectHaptic();
    onTap?.(zone);
  }, [onTap]);

  const emitHold = useCallback((zone: WheelTapZone) => {
    selectHaptic();
    onHold?.(zone);
  }, [onHold]);

  // Pan gesture for circular scrolling
  const panGesture = Gesture.Pan()
    .minDistance(3)
    .onStart((e) => {
      const dist = getDistance(e.x, e.y, cx, cy);

      if (dist < wheel.centerRadius || dist > wheel.radius) {
        isScrolling.value = false;
        return;
      }

      isScrolling.value = true;
      didScroll.value = false;
      previousAngle.value = getAngle(e.x, e.y, cx, cy);
      accumulatedAngle.value = 0;
    })
    .onUpdate((e) => {
      if (!isScrolling.value) return;

      const currentAngle = getAngle(e.x, e.y, cx, cy);
      const delta = angleDelta(currentAngle, previousAngle.value);

      accumulatedAngle.value += delta;

      while (accumulatedAngle.value >= tickThreshold) {
        accumulatedAngle.value -= tickThreshold;
        didScroll.value = true;
        runOnJS(emitScrollDown)();
      }
      while (accumulatedAngle.value <= -tickThreshold) {
        accumulatedAngle.value += tickThreshold;
        didScroll.value = true;
        runOnJS(emitScrollUp)();
      }

      previousAngle.value = currentAngle;
    })
    .onEnd(() => {
      isScrolling.value = false;
    });

  // Tap gesture — only fires if we didn't scroll
  const tapGesture = Gesture.Tap()
    .maxDuration(300)
    .onBegin(() => {
      didScroll.value = false;
    })
    .onEnd((e) => {
      // If a scroll happened during this touch, suppress the tap
      if (didScroll.value) return;

      const dist = getDistance(e.x, e.y, cx, cy);

      if (dist <= wheel.centerRadius) {
        runOnJS(emitTap)('select');
      } else if (dist <= wheel.radius) {
        const angle = getAngle(e.x, e.y, cx, cy);
        const zone = getTapZone(angle);
        runOnJS(emitTap)(zone);
      }
    });

  // Long press gesture — also suppressed if scrolling
  const longPressGesture = Gesture.LongPress()
    .minDuration(wheelGesture.longPressMs)
    .onBegin(() => {
      didScroll.value = false;
    })
    .onEnd((e) => {
      if (didScroll.value) return;

      const dist = getDistance(e.x, e.y, cx, cy);

      if (dist <= wheel.centerRadius) {
        runOnJS(emitHold)('select');
      } else if (dist <= wheel.radius) {
        const angle = getAngle(e.x, e.y, cx, cy);
        const zone = getTapZone(angle);
        runOnJS(emitHold)(zone);
      }
    });

  // Race: long press vs (pan + tap simultaneously)
  // Pan and tap run together, but tap checks didScroll flag
  const composed = Gesture.Race(
    longPressGesture,
    Gesture.Simultaneous(panGesture, tapGesture)
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          styles.gestureArea,
          {
            width: canvasSize,
            height: canvasSize,
            top: wheel.top,
            left: (ipod.width - canvasSize) / 2,
          },
        ]}
      />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  gestureArea: {
    position: 'absolute',
  },
});
